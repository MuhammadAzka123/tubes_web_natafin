import SummaryCard from './SummaryCard.jsx'

function formatRupiah(nominal) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(nominal)
}

function SummaryCards({ transactions }) {
  const pemasukan = transactions
    .filter((transaksi) => transaksi.type === 'pemasukan')
    .reduce((total, transaksi) => total + transaksi.amount, 0)

  const pengeluaran = transactions
    .filter((transaksi) => transaksi.type === 'pengeluaran')
    .reduce((total, transaksi) => total + transaksi.amount, 0)

  const ringkasan = [
    {
      label: 'Total Pemasukan',
      value: formatRupiah(pemasukan),
      tone: 'income',
    },
    {
      label: 'Total Pengeluaran',
      value: formatRupiah(pengeluaran),
      tone: 'expense',
    },
    {
      label: 'Sisa Saldo',
      value: formatRupiah(pemasukan - pengeluaran),
      tone: 'balance',
    },
    {
      label: 'Jumlah Transaksi',
      value: String(transactions.length),
      tone: 'count',
    },
  ]

  return (
    <section className="summary-grid" aria-label="Ringkasan keuangan">
      {ringkasan.map((item) => (
        <SummaryCard
          key={item.label}
          label={item.label}
          value={item.value}
          tone={item.tone}
        />
      ))}
    </section>
  )
}

export default SummaryCards
