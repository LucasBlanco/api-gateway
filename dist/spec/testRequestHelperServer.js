"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _shared_1 = require("@shared");
const server = {
    url: 'http://localhost:3000',
};
const { router, emit, receive } = _shared_1.createRequestHandler(server);
receive.get({
    ruta: '/testApiGateway1',
    emit: emit.get({
        ruta: '/testApiGateway11',
    }),
});
receive.get({
    ruta: '/testApiGateway2',
    emit: emit.get({
        ruta: '/testApiGateway22',
    }),
});
receive.get({
    ruta: '/testApiGatewayConId/:id',
    emit: emit.get({
        ruta: '/testApiGatewayConId1/:id',
    }),
});
receive.get({
    ruta: '/testApiGatewayConDosId/:id/:id2',
    emit: emit.get({
        ruta: '/testApiGatewayConDosId1/:id/:id2',
    }),
});
const combinedEmitter = _shared_1.createCombinedEmitter({
    emitters: [
        emit.get({ ruta: '/testApiGateway2' }),
        emit.get({ ruta: '/testApiGateway1' }),
    ],
});
receive.get({
    ruta: '/testCombinedEmitter',
    emit: combinedEmitter,
});
router.get('/testApiGateway11', (req, res) => {
    res.send('GET');
});
router.get('/testApiGateway22', (req, res) => {
    res.send('GET');
});
router.get('/testApiGatewayConId1/:id', (req, res) => {
    res.send({ id: req.params.id });
});
router.get('/testApiGatewayConDosId1/:id/:id2', (req, res) => {
    res.send({ id: req.params.id, id2: req.params.id2 });
});
exports.default = router;
