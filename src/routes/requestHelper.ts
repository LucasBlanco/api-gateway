
import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK, REQUESTED_RANGE_NOT_SATISFIABLE } from 'http-status-codes';
import { paramMissingError } from '@shared';
import { IServer } from './serverRoutes';
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

interface RequestParams {
    body: any;
    routeParams?: any;
}

export function createRequestHandler(server: IServer) {

    const router = Router();

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

    function createPromise() {

        const generatePromise = (
            reqMappable: IMappableReq,
            reqParams: RequestParams,
            method: 'PUT' | 'GET' | 'POST' | 'DELETE',
        ) => {
            let { ruta, mapRequest = (r: any) => r, mapResponse = (r: any) => r } = reqMappable;
            if (reqParams.routeParams) {
                ruta = replaceRouteParamWithValue(ruta, reqParams.routeParams)
            }
            const options = { ...generateOptions(ruta, mapRequest(reqParams.body)), method };
            console.log('Hago ' + method + ' a ' + ruta, reqParams.body);
            return request(options).then(mapResponse).catch((e) => e);
        };

        const get2 = (reqMappable: IMappableReq) =>
            (reqParams: RequestParams): Promise<any> => generatePromise(reqMappable, reqParams, 'GET');

        const post2 = (reqMappable: IMappableReq) =>
            (reqParams: RequestParams): Promise<any> => generatePromise(reqMappable, reqParams, 'POST');

        const put2 = (reqMappable: IMappableReq) =>
            (reqParams: RequestParams): Promise<any> => generatePromise(reqMappable, reqParams, 'PUT');

        const delete2 = (reqMappable: IMappableReq) =>
            (reqParams: RequestParams): Promise<any> => generatePromise(reqMappable, reqParams, 'DELETE');

        return { get: get2, post: post2, put: put2, delete: delete2 };
    }

    function get({ ruta, mapRequest = (r: any) => r, mapResponse = (r: any) => r, emit }: IMappableReq & IEmitter) {
        router.get(ruta, async (req: Request, res: Response) => {
            console.log('recibo get de ' + ruta, req.body);
            try {
                const { body, routeParams } = getRequestParams(ruta, req);
                emit({ body: mapRequest(body), routeParams }).then((response) => {
                    console.log('Exito', response);
                    return res.status(OK).json(mapResponse(response));
                }).catch((e) => res.status(e.statusCode).json({ error: e.message }));
            } catch (err) {
                logger.error(err.message, err);
                return res.status(BAD_REQUEST).json({
                    error: err.message,
                });
            }
        });
    }

    function post({ ruta, mapRequest = (r: any) => r, mapResponse = (r: any) => r, emit }: IMappableReq & IEmitter) {
        router.post(ruta, async (req: Request, res: Response) => {
            console.log('recibo post de ' + ruta, req.body);
            try {
                const { body, routeParams } = getRequestParams(ruta, req);
                emit({ body: mapRequest(body), routeParams }).then((response) => {
                    return res.status(OK).json(mapResponse(response));
                    // tslint:disable-next-line: no-console
                }).catch((e) => {
                    const response = res.status(e.statusCode).json({ error: e.message });
                    return response;
                },
                );
            } catch (err) {

                logger.error(err.message, err);
                return res.status(BAD_REQUEST).json({
                    error: err.message,
                });
            }
        });
    }

    function put({ ruta, mapRequest = (r: any) => r, mapResponse = (r: any) => r, emit }: IMappableReq & IEmitter) {

        router.put(ruta, async (req: Request, res: Response) => {
            console.log('recibo put de ' + ruta, req.body);
            try {
                const { body, routeParams } = getRequestParams(ruta, req);
                emit({ body: mapRequest(body), routeParams }).then((response) => {

                    return res.status(OK).json(mapResponse(response));
                    // tslint:disable-next-line: no-console
                }).catch((e) => res.status(e.statusCode).json({ error: e.message }));
            } catch (err) {
                logger.error(err.message, err);
                return res.status(BAD_REQUEST).json({
                    error: err.message,
                });
            }
        });
    }

    function borrar({ ruta, mapRequest = (r: any) => r, mapResponse = (r: any) => r, emit }: IMappableReq & IEmitter) {
        router.delete(ruta, async (req: Request, res: Response) => {
            console.log('recibo delete de ' + ruta, req.body);
            try {
                const { body, routeParams } = getRequestParams(ruta, req);
                emit({ body: mapRequest(body), routeParams }).then((response) => {

                    return res.status(OK).json(mapResponse(response));
                    // tslint:disable-next-line: no-console
                }).catch((e) => res.status(e.statusCode).json({ error: e.message }));
            } catch (err) {
                logger.error(err.message, err);
                return res.status(BAD_REQUEST).json({
                    error: err.message,
                });
            }
        });
    }

    function getRequestParams(ruta: string, req: Request): RequestParams {
        const [_, paramIdentifier] = ruta.split('/:');
        if (paramIdentifier) {
            return { body: req.body, routeParams: req.params[paramIdentifier] };
        }
        return { body: req.body };
    }

    function replaceRouteParamWithValue(ruta: string, value: string): string {
        const [route, paramIdentifier] = ruta.split('/:');
        if (paramIdentifier) {
            return route + '/' + value;
        }
        return ruta;
    }

    return { receive: { get, post, put, delete: borrar }, router, emit: createPromise() };

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
        ).catch((e) => e);
    };
};
