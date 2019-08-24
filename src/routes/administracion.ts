
import { administracionServer } from '@servers';
import { createRequestHandler } from '@shared';

// Init shared

const { router, emit, receive } = createRequestHandler(administracionServer);

/* ADMINISTRACION */
receive.get({
    ruta: '/administracionVenta/ventasIncompletas',
    emit: emit.get({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.get({
    ruta: '/administracionVenta/ventasPresentables',
    emit: emit.get({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.get({
    ruta: '/administracionVenta/ventasPresentadas',
    emit: emit.get({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.get({
    ruta: '/administracionVenta/ventasRechazables',
    emit: emit.get({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/administracionVenta/completarVenta',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/administracionVenta/presentarVentas',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/administracionVenta/analizarPresentacion',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/administracionVenta/rechazar',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});

export default router;
