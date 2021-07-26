import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Environment } from './common/constants/environment';
import { PrismaService } from './modules/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: Environment.frontEndAppUrl,
    credentials: true,
  });

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(Environment.port);
}
bootstrap();
