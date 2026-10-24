import { useState } from 'react'
import AppHeader from './components/AppHeader.jsx'
import PageIntro from './components/PageIntro.jsx'
import SummaryCards from './components/SummaryCards.jsx'
import TransactionForm from './components/TransactionForm.jsx'
import TransactionList from './components/TransactionList.jsx'
import AppFooter from './components/AppFooter.jsx'
import './App.css'

const TRANSAKSI_AWAL = [
  {
    id: 1,
    date: '2026-10-24',
    description: 'Uang saku bulanan',
    category: 'Uang Saku',
    type: 'pemasukan',
    amount: 1500000,
  },
  {
    id: 2,
    date: '2026-10-24',
    description: 'Makan siang',
    category: 'Makanan',
    type: 'pengeluaran',
    amount: 25000,
  },
  {
    id: 3,
    date: '2026-10-23',
    description: 'Transportasi ke kampus',
    category: 'Transportasi',
    type: 'pengeluaran',
    amount: 18000,
  },
  {
    id: 4,
    date: '2026-10-22',
    description: 'Buku praktikum',
    category: 'Pendidikan',
    type: 'pengeluaran',
    amount: 75000,
  },
]

function App() {
  const [transactions, setTransactions] = useState(TRANSAKSI_AWAL)

  function tambahTransaksi(dataTransaksi) {
    const transaksiBaru = {
      ...dataTransaksi,
      id: Date.now(),
    }

    setTransactions((transaksiSaatIni) => [transaksiBaru, ...transaksiSaatIni])
  }

  function hapusTransaksi(idTransaksi) {
    setTransactions((transaksiSaatIni) =>
      transaksiSaatIni.filter((transaksi) => transaksi.id !== idTransaksi),
    )
  }

  return (
    <div className="app-shell">
      <AppHeader title="NataFin" />

      <main className="main-container">
        <PageIntro title="Dashboard" />

        <SummaryCards transactions={transactions} />

        <div className="workspace-grid">
          <section className="panel form-panel" aria-labelledby="form-heading">
            <div className="panel-heading">
              <h2 id="form-heading">Tambah Transaksi</h2>
            </div>
            <TransactionForm onAddTransaction={tambahTransaksi} />
          </section>

          <section className="panel transactions-panel" aria-labelledby="list-heading">
            <div className="panel-heading list-heading">
              <div>
                <h2 id="list-heading">Daftar Transaksi</h2>
              </div>
              <span className="count-pill">{transactions.length} transaksi</span>
            </div>
            <TransactionList
              transactions={transactions}
              onDeleteTransaction={hapusTransaksi}
            />
          </section>
        </div>
      </main>

      <AppFooter year={2026} />
    </div>
  )
}

export default App
