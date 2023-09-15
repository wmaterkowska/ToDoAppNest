import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import helmet from 'helmet';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: ConfigService = app.get(ConfigService);
  const port: number | string = config.get('PORT');

  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.use(helmet());
  app.enableCors({
    origin: "http://localhost:4321/*",
    methods: "GET, PATCH, POST, DELETE",
    allowedHeaders: ['Content-Type', 'Authorization']
  });
  await app.listen(port);
  console.log("App is running at port: " + port)
}
bootstrap();
