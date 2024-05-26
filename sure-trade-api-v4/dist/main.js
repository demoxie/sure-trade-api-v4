"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const HttpExceptionFilter_1 = require("./exception/HttpExceptionFilter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get("PORT");
    const gameStarExchange = configService.get("RABBITMQ_URL");
    const basePath = "/api/v2";
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter_1.HttpExceptionFilter());
    app.setGlobalPrefix("/api/v2");
    app.enableCors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        allowedHeaders: ["Content-Type, Accept", "Bearer"],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 200,
    });
    const url = `${gameStarExchange}}`;
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Sure Trade API")
        .setDescription("The Sure Trade API Description")
        .setVersion("3.0")
        .setContact("Shadrach Adamu", url, "shadrachadamuul@gmail.com")
        .addBearerAuth({
        type: "http",
        description: "Default",
        in: "header",
        scheme: "bearer",
        bearerFormat: "JWT",
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup(basePath + "/swagger-ui.html", app, document);
    await app.listen(port);
    console.log("Hello " + gameStarExchange);
    return port;
}
bootstrap()
    .then((res) => {
    console.log("Application starting on port ", res);
})
    .catch((err) => {
    console.log("Application failed with error ::: {}", err);
});
//# sourceMappingURL=main.js.map