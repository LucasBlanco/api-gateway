
import { liquidacionServer } from './serverRoutes';
import { createRequestHandler } from './requestHelper';

// Init shared

const { router, emit, receive } = createRequestHandler(liquidacionServer);

/* LIQUIDACION  */
receive.get({
    ruta: '/liquidacion/user',
    emit: emit.get({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/liquidacionAdmin/liquidar',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.get({
    ruta: '/liquidacionAdmin/completa',
    emit: emit.get({
        ruta: '', // TODO: Completar ruta
    }),
});

export default router;
