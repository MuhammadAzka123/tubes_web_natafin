export type TransactionCategory = 'income' | 'expense'

export class Transaction {
  id: string
  description: string
  amount: number
  category: TransactionCategory
  category_name: string
  transaction_date: string
}
