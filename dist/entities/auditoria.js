"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const empresa_1 = require("./empresa");
function mapToInput(auditoria) {
    return Object.assign({}, auditoria, { capitas: auditoria.capitas === null ? 99 : auditoria.capitas, datosEmpresa: empresa_1.mapToInput(auditoria.datosEmpresa) });
}
exports.mapToInput = mapToInput;
function mapToOutput(auditoria) {
    return Object.assign({}, auditoria, { capitas: auditoria.capitas === 99 ? null : auditoria.capitas, datosEmpresa: empresa_1.mapToOutput(auditoria.datosEmpresa) });
}
exports.mapToOutput = mapToOutput;
