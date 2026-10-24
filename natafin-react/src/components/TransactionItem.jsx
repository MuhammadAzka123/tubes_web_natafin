function formatRupiah(nominal) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(nominal)
}

function formatTanggal(tanggal) {
  const [tahun, bulan, hari] = tanggal.split('-').map(Number)
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(tahun, bulan - 1, hari))
}

function TransactionItem({ transaction, onDeleteTransaction }) {
  const isIncome = transaction.type === 'pemasukan'

  return (
    <article className="transaction-item">
      <div className="transaction-main">
        <p className="transaction-description">{transaction.description}</p>
        <p className="transaction-meta">
          {transaction.category} <span aria-hidden="true">·</span> {formatTanggal(transaction.date)}
        </p>
      </div>

      <div className="transaction-side">
        <span className={`type-badge ${isIncome ? 'badge-income' : 'badge-expense'}`}>
          {isIncome ? 'Pemasukan' : 'Pengeluaran'}
        </span>
        <p className={`transaction-amount ${isIncome ? 'text-income' : 'text-expense'}`}>
          {isIncome ? '+' : '−'}{formatRupiah(transaction.amount)}
        </p>
      </div>

      <button
        className="delete-button"
        type="button"
        onClick={() => onDeleteTransaction(transaction.id)}
        aria-label={`Hapus transaksi ${transaction.description}`}
      >
        Hapus
      </button>
    </article>
  )
}

export default TransactionItem
