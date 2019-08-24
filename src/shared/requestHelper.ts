
import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK, REQUESTED_RANGE_NOT_SATISFIABLE } from 'http-status-codes';
import { paramMissingError } from '@shared';
import { IServer } from '../routes/serverRoutes';
import request, { RequestPromise } from 'request-promise-native';

interface IMappableReq {
    ruta: string;
    mapRequest?: (r: any) => any;
    mapResponse?: (r: any) => any;
}

type EmitFunction = (body: any) => Promise<any>;

interface IEmitter {
    emit: EmitFunction;
}

interface IRequestParams {
    body: any;
    routeParams?: any;
}

export function createRequestHandler(server: IServer = { url: '' }) {

    const router = Router();

    function get({ ruta, mapRequest = (r: any) => r, mapResponse = (r: any) => r, emit }: IMappableReq & IEmitter) {
        router.get(ruta, async (req: Request, res: Response) => {
            logger.debug('recibo get de ' + ruta, req.body);
            emitRequest(emit, mapRequest, mapResponse, ruta, req, res);
        });
    }

    function post({ ruta, mapRequest = (r: any) => r, mapResponse = (r: any) => r, emit }: IMappableReq & IEmitter) {
        router.post(ruta, async (req: Request, res: Response) => {
            logger.debug('recibo post de ' + ruta, req.body);
            emitRequest(emit, mapRequest, mapResponse, ruta, req, res);
        });
    }

    function put({ ruta, mapRequest = (r: any) => r, mapResponse = (r: any) => r, emit }: IMappableReq & IEmitter) {

        router.put(ruta, async (req: Request, res: Response) => {
            logger.debug('recibo put de ' + ruta, req.body);
            emitRequest(emit, mapRequest, mapResponse, ruta, req, res);
        });
    }

    function borrar({ ruta, mapRequest = (r: any) => r, mapResponse = (r: any) => r, emit }: IMappableReq & IEmitter) {
        router.delete(ruta, async (req: Request, res: Response) => {
            logger.debug('recibo delete de ' + ruta, req.body);
            emitRequest(emit, mapRequest, mapResponse, ruta, req, res);
        });
    }

    function getRequestParams(ruta: string, req: Request): IRequestParams {
        const routeParams = ruta.split('/')
            .filter((x) => x.includes(':'))
            .map((x) => x.replace(':', ''))
            .reduce((obj, x) => {
                (obj as any)[x] = req.params[x];
                return obj;
            }, {});

        if (routeParams) {
            return { body: req.body, routeParams };
        }
        return { body: req.body };
    }

    function emitRequest(emit: any, mapRequest: any, mapResponse: any, ruta: any, req: any, res: any) {
        try {
            const { body, routeParams } = getRequestParams(ruta, req);
            emit({ body: mapRequest(body), routeParams })
                .then((response: any) => {
                    return res.status(OK).json(mapResponse(response));
                })
                .catch((e: any) => {
                    res.status(e.statusCode || 500).json({ error: e.message });
                });
        } catch (err) {
            logger.error(err.message, err);
            return res.status(BAD_REQUEST).json({
                error: err.message,
            });
        }
    }

    return { receive: { get, post, put, delete: borrar }, router, emit: createPromise(server) };
}

function createPromise(server: IServer) {

    const generatePromise = (
        reqMappable: IMappableReq,
        reqParams: IRequestParams,
        method: 'PUT' | 'GET' | 'POST' | 'DELETE',
    ) => {
        let { ruta } = reqMappable;
        const { mapRequest = (r: any) => r, mapResponse = (r: any) => r } = reqMappable;
        if (reqParams.routeParams) {
            ruta = replaceRouteParamWithValue(ruta, reqParams.routeParams);
        }
        const options = { ...generateOptions(ruta, mapRequest(reqParams.body)), method };
        logger.debug('Hago ' + method + ' a ' + ruta, reqParams.body);
        return request(options).then(mapResponse);
    };

    function generateOptions(route: string, body?: any) {

        return {
            body,
            uri: server.url + route,
            qs: {
                access_token: 'xxxxx xxxxx', // -> uri + '?access_token=xxxxx%20xxxxx'
            },
            headers: {
                'User-Agent': 'Request-Promise',
            },
            json: true, // Automatically parses the JSON string in the response
        };
    }

    function replaceRouteParamWithValue(ruta: string, value: Array<{ [key: string]: string }>): string {
        /* Se encarga de reemplazar los query params por el valor correspondiente*/
        /* Ejemplo: /validaciones/:id, por /validaciones/1 */
        // TODO: Hacer que permita N parametros y no solo uno al final
        const finalRoute = ruta.split('/')
            .map((x) => {
                if (x.includes(':')) {
                    const key = x.replace(':', '');
                    return value[key as any];
                }
                return x;
            })
            .join('/');
        return finalRoute as string;
    }

    const get = (reqMappable: IMappableReq) =>
        (reqParams: IRequestParams): Promise<any> =>
            generatePromise(reqMappable, reqParams, 'GET');

    const post = (reqMappable: IMappableReq) =>
        (reqParams: IRequestParams): Promise<any> =>
            generatePromise(reqMappable, reqParams, 'POST');

    const put = (reqMappable: IMappableReq) =>
        (reqParams: IRequestParams): Promise<any> =>
            generatePromise(reqMappable, reqParams, 'PUT');

    const borrar = (reqMappable: IMappableReq) =>
        (reqParams: IRequestParams): Promise<any> =>
            generatePromise(reqMappable, reqParams, 'DELETE');

    return { get, post, put, delete: borrar };
}

export const map = (funcion: ((value: any) => any)) => (array: any[]) => {
    return array.map(funcion);
};

export const createCombinedEmitter = ({
    emitters,
    mapRequest = (r: any) => r,
    mapResponse = (r: any) => r,
}: ({ emitters: EmitFunction[] }) & {
    mapRequest?: (r: any) => any;
    mapResponse?: (r: any) => any;
}): EmitFunction => {
    return (body: any) => {
        return Promise.all(
            emitters.map((e) => e(mapRequest(body))),
        ).then(
            mapResponse,
        );
    };
};

export const createParalellEmitter = ({
    emitters,
    mapRequest = (r: any) => r,
    mapResponse = (r: any) => r,
}: ({ emitters: EmitFunction[] }) & {
    mapRequest?: (r: any) => any;
    mapResponse?: (r: any) => any;
}): EmitFunction => {
    return (body: any) => {

        return Promise.all(
            emitters.map((e) => e(mapRequest(body))).map(settleRequest),
        ).then((results) => {
            const result = results.find((r) => r.status === 'fulfilled');
            if (result) {
                return result.value;
            } else {
                throw new Error(results[0].value);
            }
        },
        );
    };
};

const settleRequest = (promise: Promise<any>) => {
    return promise
        .then((e) => ({ status: 'fulfilled', value: e }))
        .catch((e) => ({ status: 'rejected', value: e }));
};
