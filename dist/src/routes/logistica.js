"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _servers_1 = require("@servers");
const _shared_1 = require("@shared");
const { router, emit, receive } = _shared_1.createRequestHandler(_servers_1.logisticaServer);
receive.post({
    ruta: '/logistica/confirmarVisita',
    emit: emit.post({
        ruta: '',
    }),
});
receive.post({
    ruta: '/logistica/repactarVisita',
    emit: emit.post({
        ruta: '',
    }),
});
receive.post({
    ruta: '/logistica/rechazar',
    emit: emit.post({
        ruta: '',
    }),
});
receive.get({
    ruta: '/logistica/:id',
    emit: emit.get({
        ruta: '',
    }),
});
receive.get({
    ruta: '/logistica/ventasATrabajar',
    emit: emit.get({
        ruta: '',
    }),
});
receive.get({
    ruta: '/logistica/all',
    emit: emit.get({
        ruta: '',
    }),
});
receive.post({
    ruta: '/logistica/asignarUsuario',
    emit: emit.post({
        ruta: '',
    }),
});
receive.post({
    ruta: '/logistica/enviarAlCall',
    emit: emit.post({
        ruta: '',
    }),
});
receive.post({
    ruta: '/logisticaOper/generarVisita',
    emit: emit.post({
        ruta: '',
    }),
});
receive.get({
    ruta: '/logisticaOper/ventasSinVisita',
    emit: emit.get({
        ruta: '',
    }),
});
exports.default = router;
