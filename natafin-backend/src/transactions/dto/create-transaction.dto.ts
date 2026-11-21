import {
  IsDateString,
  IsIn,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator'

export class CreateTransactionDto {
  @IsString({
    message: 'Keterangan harus berupa teks.',
  })
  @MinLength(3, {
    message: 'Keterangan minimal 3 karakter.',
  })
  description!: string

  @IsNumber(
    {},
    {
      message: 'Nominal transaksi harus berupa angka.',
    },
  )
  @Min(1, {
    message: 'Nominal transaksi minimal Rp1.',
  })
  amount!: number

  @IsIn(['income', 'expense'], {
    message: 'Jenis transaksi harus pemasukan atau pengeluaran.',
  })
  category!: 'income' | 'expense'

  @IsString({
    message: 'Kategori harus berupa teks.',
  })
  @MinLength(3, {
    message: 'Kategori minimal 3 karakter.',
  })
  category_name!: string

  @IsDateString(
    {},
    {
      message: 'Format tanggal transaksi tidak valid.',
    },
  )
  transaction_date!: string
}
