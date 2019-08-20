"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serverRoutes_1 = require("./serverRoutes");
const requestHelper_1 = require("./requestHelper");
const _entities_1 = require("@entities");
const { router, createEmitter, receive } = requestHelper_1.createRequestHandler(serverRoutes_1.controlesServer);
receive.post('/auditoria/auditar', createEmitter.post('/auditorias', _entities_1.mapAuditoriaOut));
receive.post('/validacion/validar', createEmitter.get('/validaciones', (e) => ({ chau: e.hola })), (e) => ({ carlos: e.joquin }));
router.get('/validaciones', (req, res) => {
    console.log('holis');
    res.send({ joquin: req.body.chau });
});
exports.default = router;
//# sourceMappingURL=controles.js.map