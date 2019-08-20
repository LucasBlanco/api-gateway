import { IEmpresaIn, IEmpresaOut, mapToInput as mapEmpresaInput, mapToOutput as mapEmpresaOutput } from './empresa';
export interface IAuditoriaIn {
    capitas: number;
    idVenta: number;
    adherentes: number;
    estado: string;
    codem: string;
    afip: string;
    superr: string;
    recuperable: boolean;
    cantidadAudios: number;
    observacion: string;
    datosEmpresa: IEmpresaIn;
}

export interface IAuditoriaOut {
    capitas: number | null;
    idVenta: number;
    adherentes: number;
    estado: string;
    codem: string;
    afip: string;
    superr: string;
    recuperable: boolean;
    cantidadAudios: number;
    observacion: string;
    datosEmpresa: IEmpresaOut;
}

export function mapToInput(auditoria: IAuditoriaOut): IAuditoriaIn {
    return {
        ...auditoria,
        capitas: auditoria.capitas === null ? 99 : auditoria.capitas,
        datosEmpresa: mapEmpresaInput(auditoria.datosEmpresa),
    };
}

export function mapToOutput(auditoria: IAuditoriaIn): IAuditoriaOut {
    return {
        ...auditoria,
        capitas: auditoria.capitas === 99 ? null : auditoria.capitas,
        datosEmpresa: mapEmpresaOutput(auditoria.datosEmpresa),
    };
}
