import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./exception/HttpExceptionFilter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get("PORT");
  const gameStarExchange = configService.get("RABBITMQ_URL");
  const basePath = "/api/v2";
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
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
  const config = new DocumentBuilder()
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
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(basePath + "/swagger-ui.html", app, document);
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
