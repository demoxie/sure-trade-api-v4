"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectMinio = void 0;
const common_1 = require("@nestjs/common");
const nest_minio_connection_providers_1 = require("./nest-minio.connection.providers");
function InjectMinio() {
    return (0, common_1.Inject)(nest_minio_connection_providers_1.MINIO_CONNECTION);
}
exports.InjectMinio = InjectMinio;
