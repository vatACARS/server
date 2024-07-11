import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const config = new DocumentBuilder()
    .setTitle('vatACARS Server API')
    .setDescription(
      'The vatACARS Server API is a RESTful API that provides access to the vatACARS server. This API is used by the vatACARS plugin for vatSys, the vatACARS pilot client, and the vatACARS dispatcher center.',
    )
    .setVersion('0.0.2')
    .addTag('vatACARS')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('docs', app, document);

  await app.listen(8002);
}

bootstrap();
