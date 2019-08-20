"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const empresa_1 = require("./empresa");
function mapToInput(validacion) {
    return Object.assign({}, validacion, { capitas: validacion.capitas === null ? 99 : validacion.capitas, superr: validacion.super, datosEmpresa: empresa_1.mapToInput(validacion.datosEmpresa) });
}
exports.mapToInput = mapToInput;
function mapToOutput(validacion) {
    return Object.assign({}, validacion, { capitas: validacion.capitas === 99 ? null : validacion.capitas, super: validacion.superr, datosEmpresa: empresa_1.mapToOutput(validacion.datosEmpresa) });
}
exports.mapToOutput = mapToOutput;
