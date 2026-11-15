import {
  IsDateString,
  IsIn,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator'

export class CreateTransactionDto {
  @IsString()
  @MinLength(3)
  description!: string

  @IsNumber()
  @Min(1)
  amount!: number

  @IsIn(['income', 'expense'])
  category!: 'income' | 'expense'

  @IsString()
  @MinLength(3)
  category_name!: string

  @IsDateString()
  transaction_date!: string
}
