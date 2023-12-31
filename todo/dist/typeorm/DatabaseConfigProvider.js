"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfigProvider = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
let DatabaseConfigProvider = class DatabaseConfigProvider {
    constructor(configService) {
        this.configService = configService;
    }
    async createDatabaseConfig() {
        const dbHost = await this.configService.get('DATABASE_HOST');
        const dbPort = await this.configService.get('DATABASE_PORT');
        const dbUrl = await this.configService.get('DATABASE_URL');
        const dbName = await this.configService.get('DATABASE_NAME');
        const username = await this.configService.get('DATABASE_USERNAME');
        const password = await this.configService.get('DATABASE_PASSWORD');
        return {
            dbHost,
            dbPort,
            dbUrl,
            dbName,
            username,
            password,
        };
    }
};
exports.DatabaseConfigProvider = DatabaseConfigProvider;
exports.DatabaseConfigProvider = DatabaseConfigProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DatabaseConfigProvider);
//# sourceMappingURL=DatabaseConfigProvider.js.map