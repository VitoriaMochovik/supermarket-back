import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class CreateDtoProducts {
  @IsNumber()
  @Min(1)
  @Expose()
  id: number;

  @IsNumber()
  @Min(1)
  @Expose()
  qty: number;
}

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @IsDate()
  @Type(() => Date)
  @Expose()
  dtDelivery: Date;

  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreateDtoProducts)
  @Expose()
  products: CreateDtoProducts[];
}
