import { IEmpresaIn, IEmpresaOut, mapToInput as mapEmpresaInput, mapToOutput as mapEmpresaOutput } from './empresa';
export interface IValidacionIn {
    capitas: number;
    idVenta: number;
    codem: string;
    afip: string;
    superr: string;
    userId: number;
    observacion: string;
    datosEmpresa: IEmpresaIn;
}

export interface IValidacionOut {
    capitas: number | null;
    idVenta: number;
    codem: string;
    afip: string;
    super: string;
    userId: number;
    observacion: string;
    datosEmpresa: IEmpresaOut;
}

export function mapToInput(validacion: IValidacionOut): IValidacionIn {
    return {
        ...validacion,
        capitas: validacion.capitas === null ? 99 : validacion.capitas,
        superr: validacion.super,
        datosEmpresa: mapEmpresaInput(validacion.datosEmpresa),
    };
}

export function mapToOutput(validacion: IValidacionIn): IValidacionOut {
    return {
        ...validacion,
        capitas: validacion.capitas === 99 ? null : validacion.capitas,
        super: validacion.superr,
        datosEmpresa: mapEmpresaOutput(validacion.datosEmpresa),
    };
}
