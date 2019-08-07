
import { UserDao } from '@daos';
import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK, REQUESTED_RANGE_NOT_SATISFIABLE } from 'http-status-codes';
import { paramMissingError } from '@shared';
import { IServer } from './serverRoutes';
import request, { RequestPromise } from 'request-promise-native';

export function createRequestHandler(server: IServer) {

    const router = Router();

    function generateOptions(route: string) {
        return {
            uri: `${server.url}:${server.port}/${route}`,
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
            ruta: string,
            mapper: (value: any) => any,
            method: 'PUT' | 'GET' | 'POST' | 'DELETE'
        ) => {
            const options = { ...generateOptions(ruta), method };
            return request(options).then(mapper).catch((e) => console.log(e));
        };

        const get2 = (ruta: string, mapper = (r: any) => r) => generatePromise(ruta, mapper, 'GET');

        const post2 = (ruta: string, mapper = (r: any) => r) => generatePromise(ruta, mapper, 'POST');

        const put2 = (ruta: string, mapper = (r: any) => r) => generatePromise(ruta, mapper, 'PUT');

        const delete2 = (ruta: string, mapper = (r: any) => r) => generatePromise(ruta, mapper, 'DELETE');

        return { get: get2, post: post2, put: put2, delete: delete2 };
    }

    function combinePromises(promises: Array<Promise<any>>, mapper = (r: any) => r) {
        return Promise.all(promises).then(mapper).catch((e) => console.log(e));
    }

    function get(rutaOrigen: string, promise: Promise<any>, mapper = (r: any) => r) {
        router.get(rutaOrigen, async (req: Request, res: Response) => {
            try {
                promise.then((body) => {
                    res.status(OK).json(mapper(body));
                }).catch((e) => console.log(e));

            } catch (err) {
                logger.error(err.message, err);
                return res.status(BAD_REQUEST).json({
                    error: err.message,
                });
            }
        });
    }

    function post(ruta: string, mapper: Function) {
        router.post(ruta, async (req: Request, res: Response) => {
            try {
                return res.status(OK).json(mapper(req.body));
            } catch (err) {
                logger.error(err.message, err);
                return res.status(BAD_REQUEST).json({
                    error: err.message,
                });
            }
        });
    }

    function put(ruta: string, mapper: Function) {
        router.put(ruta, async (req: Request, res: Response) => {
            try {
                return res.status(OK).json(mapper(req.body));
            } catch (err) {
                logger.error(err.message, err);
                return res.status(BAD_REQUEST).json({
                    error: err.message,
                });
            }
        });
    }

    function borrar(ruta: string, mapper: Function) {
        router.delete(ruta, async (req: Request, res: Response) => {
            try {
                return res.status(OK).json(mapper(req.body));
            } catch (err) {
                logger.error(err.message, err);
                return res.status(BAD_REQUEST).json({
                    error: err.message,
                });
            }
        });
    }

    return { get, post, put, delete: borrar, router, createPromise, combinePromises };

}

export const map = (funcion: ((value: any) => any)) => (array: any[]) => {
    return array.map(funcion);
};
