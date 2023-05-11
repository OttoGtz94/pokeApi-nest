import {
  IsBoolean,
  IsDefined,
  IsInt,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';

export class OptionsSeeDto {
  @IsInt({ message: 'La cantidad debe de ser un número entero,' })
  @IsPositive({ message: 'La cantidad debe de ser mayor a 0' })
  @Min(1)
  @IsOptional()
  amount?: number;

  @IsBoolean({ message: 'EL valor debe de ser true/false' })
  @IsOptional()
  clear?: boolean;

  @IsBoolean({ message: 'EL valor debe de ser true/false' })
  @IsOptional()
  drop?: boolean;
}
