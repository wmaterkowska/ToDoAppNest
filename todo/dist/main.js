"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const helmet_1 = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    const port = config.get('PORT');
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: "http://localhost:4321/*",
        methods: "GET, PATCH, POST, DELETE",
        allowedHeaders: ['Content-Type', 'Authorization']
    });
    await app.listen(port);
    console.log("App is running at port: " + port);
}
bootstrap();
//# sourceMappingURL=main.js.map