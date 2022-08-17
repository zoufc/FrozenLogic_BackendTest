import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: '*',
    methods: 'POST,GET,PUT,PATCH,DELETE',
  });
  app.setGlobalPrefix('api');
  const port = process.env.PORT;
  await app.listen(port);
  console.log(`The server is running on ${await app.getUrl()}`);
}
bootstrap();
