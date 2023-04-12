import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        function recursive(validationErrors: ValidationError[] = []) {
          const { constraints, children } = validationErrors[0];

          if (
            (!constraints || !Object.keys(constraints).length) &&
            children?.length
          ) {
            return recursive(children);
          }

          const keys = Object.keys(constraints);
          return new BadRequestException(constraints[keys[0]]);
        }

        return recursive(validationErrors);
      },
      transformOptions: {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      },
      transform: true,
    }),
  );

  await app.listen(process.env.API_PORT);
}

bootstrap();
