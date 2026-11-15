import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common'
import { randomUUID } from 'node:crypto'
import { CreateTransactionDto } from './dto/create-transaction.dto.js'
import { UpdateTransactionDto } from './dto/update-transaction.dto.js'
import { Transaction } from './entities/transaction.entity.js'

@Injectable()
export class TransactionsService {
  private transactions: Transaction[] = []

  create(createTransactionDto: CreateTransactionDto): Transaction {
    const duplicate = this.transactions.some(
      (item) =>
        item.description.toLowerCase() ===
        createTransactionDto.description.toLowerCase() &&
        item.amount === createTransactionDto.amount &&
        item.category === createTransactionDto.category &&
        item.category_name === createTransactionDto.category_name &&
        item.transaction_date === createTransactionDto.transaction_date,
    )

    if (duplicate) {
      throw new ConflictException(
        'Transaksi dengan data yang sama sudah tersedia',
      )
    }

    const transaction: Transaction = {
      id: randomUUID(),
      description: createTransactionDto.description,
      amount: createTransactionDto.amount,
      category: createTransactionDto.category,
      category_name: createTransactionDto.category_name,
      transaction_date: createTransactionDto.transaction_date,
    }

    this.transactions.push(transaction)
    return transaction
  }

  findAll(): Transaction[] {
    return [...this.transactions]
  }

  findOne(id: string): Transaction {
    const transaction = this.transactions.find((item) => item.id === id)

    if (!transaction) {
      throw new NotFoundException(`Transaksi dengan ID ${id} tidak ditemukan`)
    }

    return transaction
  }

  update(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Transaction {
    const transaction = this.findOne(id)

    Object.assign(transaction, updateTransactionDto)

    return transaction
  }

  remove(id: string): Transaction {
    const index = this.transactions.findIndex((item) => item.id === id)

    if (index === -1) {
      throw new NotFoundException(`Transaksi dengan ID ${id} tidak ditemukan`)
    }

    return this.transactions.splice(index, 1)[0]
  }
}
