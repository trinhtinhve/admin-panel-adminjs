import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { PrismaLaunchyService } from './prisma/prisma-launchy.service';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  const prismaServiceLaunchy = app.get(PrismaLaunchyService);
  const configService = app.get(ConfigService);

  await prismaService.enableShutdownHooks(app);
  await prismaServiceLaunchy.enableShutdownHooks(app);

  app.use(cookieParser());
  app.enableCors({
    origin: configService.get('CLIENT_APP_URL'),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
    }),
  );

  await app.listen(configService.get('PORT', 3000));
  console.info(`Server running on port ${configService.get('PORT', 3000)}`);
}
bootstrap();
