import TransactionItem from './TransactionItem.jsx'

function TransactionList({ transactions, onDeleteTransaction }) {
  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <h3>Belum ada data Transaksi</h3>
      </div>
    )
  }

  return (
    <div className="transaction-list">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onDeleteTransaction={onDeleteTransaction}
        />
      ))}
    </div>
  )
}

export default TransactionList
