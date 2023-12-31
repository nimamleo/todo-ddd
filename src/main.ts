import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { httpConfig } from './controller/http/http.config';

async function bootstrap() {
    const logger = new Logger('Bootstrap');
    const app = await NestFactory.create(AppModule, {
        logger: ['warn', 'debug', 'error', 'log'],
        cors: {
            origin: '*',
            allowedHeaders: '*',
            methods: '*',
            exposedHeaders: ['Content-Disposition'],
        },
    });
    const configService = app.get<ConfigService>(ConfigService);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    const config = new DocumentBuilder()
        .setTitle('todolist')
        .setDescription('The todolist API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(configService.get('HTTP_PORT'));
    logger.log(
        `Application started in http://127.0.0.1:${configService.get(
            'HTTP_PORT',
        )}`,
    );
    logger.log(
        `Swagger URL in http://127.0.0.1:${configService.get(
            'HTTP_PORT',
        )}/api`,
    );
}
bootstrap();
