import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const port = process.env.PORT;
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.listen(port || 3000);

    console.log(`Database connection successful. Use port: ${port}`);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}
bootstrap();
