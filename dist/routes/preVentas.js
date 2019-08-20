"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestHelper_1 = require("./requestHelper");
const serverRoutes_1 = require("./serverRoutes");
const _entities_1 = require("@entities");
const { router, createEmitter, receive } = requestHelper_1.createRequestHandler(serverRoutes_1.preVentaServer);
receive.get('ventas/ventasAAuditar', createEmitter.get('auditorias'), requestHelper_1.map(_entities_1.mapVentaIn));
receive.get('ventas/ventasAValidar', createEmitter.get('validaciones'), requestHelper_1.map(_entities_1.mapVentaIn));
exports.default = router;
