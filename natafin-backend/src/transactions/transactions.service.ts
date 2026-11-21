import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.js'
import { CreateTransactionDto } from './dto/create-transaction.dto.js'
import { UpdateTransactionDto } from './dto/update-transaction.dto.js'
import {
  Transaction,
  TransactionCategory,
} from './entities/transaction.entity.js'

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  // Mengubah tanggal dari DTO menjadi Date untuk PostgreSQL.
  private toDatabaseDate(date: string): Date {
    return new Date(`${date.slice(0, 10)}T00:00:00.000Z`)
  }

  // Menyesuaikan hasil Prisma dengan format API NataFin.
  private toTransaction(data: {
    id: string
    description: string
    amount: number
    category: string
    category_name: string
    transaction_date: Date
  }): Transaction {
    return {
      id: data.id,
      description: data.description,
      amount: data.amount,
      category: data.category as TransactionCategory,
      category_name: data.category_name,
      transaction_date: data.transaction_date.toISOString().slice(0, 10),
    }
  }

  // Memeriksa ID dan mencari transaksi.
  private async getTransactionOrThrow(id: string) {
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        id,
      )

    if (!isUuid) {
      throw new NotFoundException(
        `Transaksi dengan ID ${id} tidak ditemukan`,
      )
    }

    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    })

    if (!transaction) {
      throw new NotFoundException(
        `Transaksi dengan ID ${id} tidak ditemukan`,
      )
    }

    return transaction
  }

  // CREATE
  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const transactionDate = this.toDatabaseDate(
      createTransactionDto.transaction_date,
    )

    const duplicate = await this.prisma.transaction.findFirst({
      where: {
        description: {
          equals: createTransactionDto.description,
          mode: 'insensitive',
        },
        amount: createTransactionDto.amount,
        category: createTransactionDto.category,
        category_name: createTransactionDto.category_name,
        transaction_date: transactionDate,
      },
    })

    if (duplicate) {
      throw new ConflictException(
        'Transaksi dengan data yang sama sudah tersedia',
      )
    }

    const transaction = await this.prisma.transaction.create({
      data: {
        description: createTransactionDto.description,
        amount: createTransactionDto.amount,
        category: createTransactionDto.category,
        category_name: createTransactionDto.category_name,
        transaction_date: transactionDate,
      },
    })

    return this.toTransaction(transaction)
  }

  // READ ALL
  async findAll(): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany()

    return transactions.map((transaction) =>
      this.toTransaction(transaction),
    )
  }

  // READ ONE
  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.getTransactionOrThrow(id)

    return this.toTransaction(transaction)
  }

  // UPDATE
  async update(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    await this.getTransactionOrThrow(id)

    const { transaction_date, ...otherFields } = updateTransactionDto

    const transaction = await this.prisma.transaction.update({
      where: { id },
      data: {
        ...otherFields,
        ...(transaction_date !== undefined && {
          transaction_date: this.toDatabaseDate(transaction_date),
        }),
      },
    })

    return this.toTransaction(transaction)
  }

  // DELETE
  async remove(id: string): Promise<Transaction> {
    await this.getTransactionOrThrow(id)

    const transaction = await this.prisma.transaction.delete({
      where: { id },
    })

    return this.toTransaction(transaction)
  }
}
