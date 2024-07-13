import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('vatACARS Server API')
    .setDescription(
      'The vatACARS Server API is a RESTful API that provides access to the vatACARS server. This API is used by the vatACARS plugin for vatSys, the vatACARS pilot client, and the vatACARS dispatcher center.',
    )
    .setVersion('0.0.2')
    .addTag('vatACARS')
    .build();

  const document = SwaggerModule.createDocument(app, config, { operationIdFactory: (controllerKey: string, methodKey: string) => methodKey });

  const theme = new SwaggerTheme();
  const darkStyle = theme.getBuffer(SwaggerThemeNameEnum.DARK_MONOKAI);

  SwaggerModule.setup('docs', app, document, {
    explorer: true,
    customCss: darkStyle
  });

  await app.listen(8002);
}

bootstrap();
