import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: ConfigService = app.get(ConfigService);
  const port: number | string = config.get('PORT');

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  console.log("App is running at port: " + port)
}
bootstrap();
