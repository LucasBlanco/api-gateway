import { createRequestHandler, createCombinedEmitter, createParalellEmitter } from '@shared';

const server = {
    url: 'http://localhost:3000',
};
const { router, emit, receive } = createRequestHandler(server);

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

const combinedEmitter = createCombinedEmitter({
    emitters: [
        emit.get({ ruta: '/testApiGateway2' }),
        emit.get({ ruta: '/testApiGateway1' }),
    ],
});

const parallellSuccessEmitter = createParalellEmitter({
    emitters: [
        emit.get({ ruta: '/testApiGateway2' }),
        emit.get({ ruta: '/testApiGateway1' }),
    ],
});

const parallellParcialErrorEmitter = createParalellEmitter({
    emitters: [
        emit.get({ ruta: '/testApiGateway2' }),
        emit.get({ ruta: '/noExiste' }),
    ],
});
const parallellCompleteErrorEmitter = createParalellEmitter({
    emitters: [
        emit.get({ ruta: '/noExiste' }),
        emit.get({ ruta: '/noExiste' }),
    ],
});

receive.get({
    ruta: '/testCombinedEmitter',
    emit: combinedEmitter,
});

receive.get({
    ruta: '/testParalellSuccessEmitter',
    emit: parallellSuccessEmitter,
});

receive.get({
    ruta: '/testParalellParcialErrorEmitter',
    emit: parallellParcialErrorEmitter,
});

receive.get({
    ruta: '/testParalellCompleteErrorEmitter',
    emit: parallellCompleteErrorEmitter,
});

router.get('/testApiGateway11', (req: any, res: any) => {
    res.send('GET');
});

// POST method route
router.get('/testApiGateway22', (req: any, res: any) => {
    res.send('GET');
});
router.get('/testApiGatewayConId1/:id', (req: any, res: any) => {
    res.send({ id: req.params.id });
});

router.get('/testApiGatewayConDosId1/:id/:id2', (req: any, res: any) => {
    res.send({ id: req.params.id, id2: req.params.id2 });
});
export default router;
