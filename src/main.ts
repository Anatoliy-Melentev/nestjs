import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as expressHbs from 'express-handlebars';
import { join } from 'path';
import * as hbs from 'hbs';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'src/public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.engine(
    'hbs',
    expressHbs({
      layoutsDir: join(__dirname, '..', 'src/views/layouts'),
      defaultLayout: 'layout',
      extname: 'hbs',
    }),
  );
  hbs.registerPartials(__dirname + 'src/views/partials');
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
