"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./User"), exports);
var validacion_1 = require("./validacion");
exports.mapValidacionIn = validacion_1.mapToInput;
exports.mapValidacionOut = validacion_1.mapToOutput;
var auditoria_1 = require("./auditoria");
exports.mapAuditoriaIn = auditoria_1.mapToInput;
exports.mapAuditoriaOut = auditoria_1.mapToOutput;
var empresa_1 = require("./empresa");
exports.mapEmpresaIn = empresa_1.mapToInput;
exports.mapEmpresaOut = empresa_1.mapToOutput;
var preVenta_1 = require("./preVenta");
exports.mapVentaIn = preVenta_1.mapToInput;
exports.mapVentaOut = preVenta_1.mapToOutput;
//# sourceMappingURL=index.js.map