"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _shared_1 = require("@shared");
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const request_promise_native_1 = tslib_1.__importDefault(require("request-promise-native"));
function createRequestHandler(server) {
    const router = express_1.Router();
    function get({ ruta, mapRequest = (r) => r, mapResponse = (r) => r, emit }) {
        router.get(ruta, (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            _shared_1.logger.debug('recibo get de ' + ruta, req.body);
            emitRequest(emit, mapRequest, mapResponse, ruta, req, res);
        }));
    }
    function post({ ruta, mapRequest = (r) => r, mapResponse = (r) => r, emit }) {
        router.post(ruta, (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            _shared_1.logger.debug('recibo post de ' + ruta, req.body);
            emitRequest(emit, mapRequest, mapResponse, ruta, req, res);
        }));
    }
    function put({ ruta, mapRequest = (r) => r, mapResponse = (r) => r, emit }) {
        router.put(ruta, (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            _shared_1.logger.debug('recibo put de ' + ruta, req.body);
            emitRequest(emit, mapRequest, mapResponse, ruta, req, res);
        }));
    }
    function borrar({ ruta, mapRequest = (r) => r, mapResponse = (r) => r, emit }) {
        router.delete(ruta, (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            _shared_1.logger.debug('recibo delete de ' + ruta, req.body);
            emitRequest(emit, mapRequest, mapResponse, ruta, req, res);
        }));
    }
    function getRequestParams(ruta, req) {
        const routeParams = ruta.split('/')
            .filter((x) => x.includes(':'))
            .map((x) => x.replace(':', ''))
            .reduce((obj, x) => {
            obj[x] = req.params[x];
            return obj;
        }, {});
        if (routeParams) {
            return { body: req.body, routeParams };
        }
        return { body: req.body };
    }
    function emitRequest(emit, mapRequest, mapResponse, ruta, req, res) {
        try {
            const { body, routeParams } = getRequestParams(ruta, req);
            emit({ body: mapRequest(body), routeParams }).then((response) => {
                return res.status(http_status_codes_1.OK).json(mapResponse(response));
            }).catch((e) => res.status(e.statusCode).json({ error: e.message }));
        }
        catch (err) {
            _shared_1.logger.error(err.message, err);
            return res.status(http_status_codes_1.BAD_REQUEST).json({
                error: err.message,
            });
        }
    }
    return { receive: { get, post, put, delete: borrar }, router, emit: createPromise(server) };
}
exports.createRequestHandler = createRequestHandler;
function createPromise(server) {
    const generatePromise = (reqMappable, reqParams, method) => {
        let { ruta } = reqMappable;
        const { mapRequest = (r) => r, mapResponse = (r) => r } = reqMappable;
        if (reqParams.routeParams) {
            ruta = replaceRouteParamWithValue(ruta, reqParams.routeParams);
        }
        const options = Object.assign({}, generateOptions(ruta, mapRequest(reqParams.body)), { method });
        _shared_1.logger.debug('Hago ' + method + ' a ' + ruta, reqParams.body);
        return request_promise_native_1.default(options).then(mapResponse).catch((e) => e);
    };
    function generateOptions(route, body) {
        return {
            body,
            uri: server.url + route,
            qs: {
                access_token: 'xxxxx xxxxx',
            },
            headers: {
                'User-Agent': 'Request-Promise',
            },
            json: true,
        };
    }
    function replaceRouteParamWithValue(ruta, value) {
        const finalRoute = ruta.split('/')
            .map((x) => {
            if (x.includes(':')) {
                const key = x.replace(':', '');
                return value[key];
            }
            return x;
        })
            .join('/');
        return finalRoute;
    }
    const get = (reqMappable) => (reqParams) => generatePromise(reqMappable, reqParams, 'GET');
    const post = (reqMappable) => (reqParams) => generatePromise(reqMappable, reqParams, 'POST');
    const put = (reqMappable) => (reqParams) => generatePromise(reqMappable, reqParams, 'PUT');
    const borrar = (reqMappable) => (reqParams) => generatePromise(reqMappable, reqParams, 'DELETE');
    return { get, post, put, delete: borrar };
}
exports.map = (funcion) => (array) => {
    return array.map(funcion);
};
exports.createCombinedEmitter = ({ emitters, mapRequest = (r) => r, mapResponse = (r) => r, }) => {
    return (body) => {
        return Promise.all(emitters.map((e) => e(mapRequest(body)))).then(mapResponse).catch((e) => e);
    };
};
