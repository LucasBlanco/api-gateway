
import { createRequestHandler, map } from './requestHelper';
import { preVentaServer } from './serverRoutes';
import { mapVentaIn } from '@entities';

const { router, emit, receive } = createRequestHandler(preVentaServer);

/* PREVENTA */
receive.post({
    ruta: '/preventa/validar',
    emit: emit.post({
        ruta: '/preventas/validar/?XDEBUG_SESSION_START=PHPSTORM',
    }),
});

/* VENTA */
receive.post({
    ruta: '/venta/create',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/venta/all',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/venta/editar/:id',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/venta/find/:id',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/venta/existenciaDni',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/venta/allFromSubordinados',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});

/* MODIFICAR */
receive.put({
    ruta: '/modificar/updateVenta/:id',
    emit: emit.put({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/modificar/ventasAModificar',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});

/* BORRAR */
receive.post({
    ruta: '/borrar/borrarVenta',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});

/* RECUPERAR VENTA */

receive.get({
    ruta: '/recuperarVenta/all',
    emit: emit.get({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/recuperarVenta/recuperar',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/recuperarVenta/rechazo',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.get({
    ruta: '/recuperarVenta/ventasParaPoderRecuperar',
    emit: emit.get({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/recuperarVenta/marcarParaRecuperar',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});

/* ESTADISTICAS */

receive.post({
    ruta: '/estadistica/general',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.get({
    ruta: '/estadistica/estados',
    emit: emit.get({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/estadistica/visitas',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/estadistica/archivos',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/estadistica/rechazos',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/estadistica/vendedoras',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/estadistica/promotoras',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/estadistica/promotoras/cantVisitas',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/estadistica/externos',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/estadistica/call',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/estadistica/empresa',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/estadistica/localidadesEmpresa',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.get({
    ruta: '/estadistica/zonas',
    emit: emit.get({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/estadistica/ventasPorLocalidad',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/estadistica/ventasPorZona',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/estadistica/ventasTotalesPorDia',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/estadistica/ventasTotalesPorMes',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/estadistica/ventasTotalesPorSemana',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/estadistica/ventasTotalesPorAnio',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/estadistica/eficienciaCall',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/estadistica/eficienciaVendedora',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/estadistica/eficienciaPromotora',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/estadistica/eficienciaExterno',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.post({
    ruta: '/estadistica/cantidadVentasPorObraSocial',
    emit: emit.post({
        ruta: '', // TODO: Completar ruta
    }),
});
receive.get({
    ruta: '/estadistica/indicadorVentasPresentadasDelMes',
    emit: emit.get({
        ruta: '', // TODO: Completar ruta
    }),
});
export default router;
