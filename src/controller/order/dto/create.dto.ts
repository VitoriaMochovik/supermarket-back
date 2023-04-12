import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDtoProducts {
  @IsNumber()
  @Min(1)
  id: number;

  @IsNumber()
  @Min(1)
  qty: number;
}

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @Type(() => Date)
  dtDelivery: Date;

  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreateDtoProducts)
  products: CreateDtoProducts[];
}
