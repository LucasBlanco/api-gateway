
import { logisticaServer } from '@servers';
import { createRequestHandler } from '@shared';

// Init shared

const { router, emit, receive } = createRequestHandler(logisticaServer);

/* LOGISTICA */

receive.post({
    ruta: '/logistica/confirmarVisita',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/logistica/repactarVisita',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/logistica/rechazar',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.get({
    ruta: '/logistica/:id',
    emit: emit.get({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.get({
    ruta: '/logistica/ventasATrabajar',
    emit: emit.get({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.get({
    ruta: '/logistica/all',
    emit: emit.get({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/logistica/asignarUsuario',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/logistica/enviarAlCall',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});

/* LOGISTICAOPER */

receive.post({
    ruta: '/logisticaOper/generarVisita',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.get({
    ruta: '/logisticaOper/ventasSinVisita',
    emit: emit.get({
        ruta: '', // TODO: Completar ruta
    }),
});

export default router;
