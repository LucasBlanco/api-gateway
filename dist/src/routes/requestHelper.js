"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _shared_1 = require("@shared");
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const request_promise_native_1 = tslib_1.__importDefault(require("request-promise-native"));
function createRequestHandler(server) {
    const router = express_1.Router();
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
    function createPromise() {
        const generatePromise = (ruta, mapper, body, method) => {
            const options = Object.assign({}, generateOptions(ruta, mapper(body)), { method });
            return request_promise_native_1.default(options).then(e => e).catch((e) => console.log(e));
        };
        const get2 = (ruta, mapper = (r) => r) => (body) => generatePromise(ruta, mapper, body, 'GET');
        const post2 = (ruta, mapper = (r) => r) => (body) => generatePromise(ruta, mapper, body, 'POST');
        const put2 = (ruta, mapper = (r) => r) => (body) => generatePromise(ruta, mapper, body, 'PUT');
        const delete2 = (ruta, mapper = (r) => r) => (body) => generatePromise(ruta, mapper, body, 'DELETE');
        return { get: get2, post: post2, put: put2, delete: delete2 };
    }
    function get(rutaOrigen, emitter, mapper = (r) => r) {
        router.get(rutaOrigen, (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                emitter(req.body).then((body) => {
                    return res.status(http_status_codes_1.OK).json(mapper(body));
                }).catch((e) => console.log(e));
            }
            catch (err) {
                _shared_1.logger.error(err.message, err);
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    error: err.message,
                });
            }
        }));
    }
    function post(rutaOrigen, emitter, mapper = (r) => r) {
        router.post(rutaOrigen, (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                emitter(req.body).then((body) => {
                    return res.status(http_status_codes_1.OK).json(mapper(body));
                }).catch((e) => console.log(e));
            }
            catch (err) {
                _shared_1.logger.error(err.message, err);
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    error: err.message,
                });
            }
        }));
    }
    function put(rutaOrigen, emitter, mapper = (r) => r) {
        router.put(rutaOrigen, (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                emitter(req.body).then((body) => {
                    return res.status(http_status_codes_1.OK).json(mapper(body));
                }).catch((e) => console.log(e));
            }
            catch (err) {
                _shared_1.logger.error(err.message, err);
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    error: err.message,
                });
            }
        }));
    }
    function borrar(rutaOrigen, emitter, mapper = (r) => r) {
        router.delete(rutaOrigen, (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                emitter(req.body).then((body) => {
                    return res.status(http_status_codes_1.OK).json(mapper(body));
                }).catch((e) => console.log(e));
            }
            catch (err) {
                _shared_1.logger.error(err.message, err);
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    error: err.message,
                });
            }
        }));
    }
    return { receive: { get, post, put, delete: borrar }, router, createEmitter: createPromise() };
}
exports.createRequestHandler = createRequestHandler;
exports.map = (funcion) => (array) => {
    return array.map(funcion);
};
//# sourceMappingURL=requestHelper.js.map