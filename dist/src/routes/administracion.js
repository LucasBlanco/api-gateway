"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _servers_1 = require("@servers");
const _shared_1 = require("@shared");
const { router, emit, receive } = _shared_1.createRequestHandler(_servers_1.administracionServer);
receive.get({
    ruta: '/administracionVenta/ventasIncompletas',
    emit: emit.get({
        ruta: '',
    }),
});
receive.get({
    ruta: '/administracionVenta/ventasPresentables',
    emit: emit.get({
        ruta: '',
    }),
});
receive.get({
    ruta: '/administracionVenta/ventasPresentadas',
    emit: emit.get({
        ruta: '',
    }),
});
receive.get({
    ruta: '/administracionVenta/ventasRechazables',
    emit: emit.get({
        ruta: '',
    }),
});
receive.post({
    ruta: '/administracionVenta/completarVenta',
    emit: emit.post({
        ruta: '',
    }),
});
receive.post({
    ruta: '/administracionVenta/presentarVentas',
    emit: emit.post({
        ruta: '',
    }),
});
receive.post({
    ruta: '/administracionVenta/analizarPresentacion',
    emit: emit.post({
        ruta: '',
    }),
});
receive.post({
    ruta: '/administracionVenta/rechazar',
    emit: emit.post({
        ruta: '',
    }),
});
exports.default = router;
