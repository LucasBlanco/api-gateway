export interface IEmpresaIn {
    empresa: string;
    direccion: string;
    localidad: string;
    cantidadEmpleados: number;
    horaEntrada: string;
    horaSalida: string;
}

export interface IEmpresaOut {
    razon_social: string;
    direccion: string;
    localidad: string;
    cantidadEmpleados: number;
    horaEntrada: string;
    horaSalida: string;
}

export function mapToInput(empresa: IEmpresaOut): IEmpresaIn {
   const {razon_social, ...datosEmpresa} = empresa;
   return { empresa: razon_social, ...datosEmpresa}
}

export function mapToOutput(_empresa: IEmpresaIn): IEmpresaOut {
    const {empresa, ...datosEmpresa} = _empresa;
    return {...datosEmpresa, razon_social: empresa}
}
