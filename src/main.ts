import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({
        // retire tout les champs qui ne sont pas déclaré dans la dto
        whitelist: true,
        // rejette les requêtes qui contiennent des champs non déclaré dans la dto
        forbidNonWhitelisted: true,


    }));

    app.enableCors();

    await app.listen(8080);
}

bootstrap();




