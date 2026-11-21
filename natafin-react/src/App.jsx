import { useEffect, useState } from 'react'
import AppHeader from './components/AppHeader.jsx'
import PageIntro from './components/PageIntro.jsx'
import SummaryCards from './components/SummaryCards.jsx'
import TransactionForm from './components/TransactionForm.jsx'
import TransactionList from './components/TransactionList.jsx'
import AppFooter from './components/AppFooter.jsx'
import MockApiPanel from './components/MockApiPanel.jsx'
import ConfirmDialog from './components/ConfirmDialog.jsx'
import './App.css'

const API_URL = 'http://localhost:3000/transactions'

function formatTransaksi(data) {
  return {
    id: data.id,
    date: data.transaction_date,
    description: data.description,
    category: data.category_name,
    type: data.category === 'income' ? 'pemasukan' : 'pengeluaran',
    amount: data.amount,
  }
}

function App() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [apiMessage, setApiMessage] = useState('')
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function ambilTransaksi() {
      try {
        const response = await fetch(API_URL, {
          signal: controller.signal,
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error('Gagal mengambil data transaksi')
        }

        setTransactions(data.map(formatTransaksi))
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadError(error.message || 'Gagal memuat transaksi')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    ambilTransaksi()

    return () => controller.abort()
  }, [])

  async function tambahTransaksi(dataTransaksi) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: dataTransaksi.description,
        amount: dataTransaksi.amount,
        category:
          dataTransaksi.type === 'pemasukan'
            ? 'income'
            : 'expense',
        category_name: dataTransaksi.category,
        transaction_date: dataTransaksi.date,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      const pesan = Array.isArray(data.message)
        ? data.message.join(', ')
        : data.message

      throw new Error(pesan || 'Gagal menambahkan transaksi')
    }

    setTransactions((current) => [
      formatTransaksi(data),
      ...current,
    ])
  }

  async function ubahTransaksi(idTransaksi, dataTransaksi) {
    const response = await fetch(`${API_URL}/${idTransaksi}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: dataTransaksi.description,
        amount: dataTransaksi.amount,
        category:
          dataTransaksi.type === 'pemasukan'
            ? 'income'
            : 'expense',
        category_name: dataTransaksi.category,
        transaction_date: dataTransaksi.date,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      const pesan = Array.isArray(data.message)
        ? data.message.join(', ')
        : data.message

      throw new Error(pesan || 'Gagal mengubah transaksi')
    }

    setTransactions((current) =>
      current.map((transaction) =>
        transaction.id === idTransaksi
          ? formatTransaksi(data)
          : transaction,
      ),
    )

    setApiMessage('')
  }

  function mulaiHapusTransaksi(idTransaksi) {
    const transaksi = transactions.find(
      (item) => item.id === idTransaksi,
    )

    if (transaksi) {
      setDeleteTarget(transaksi)
      setApiMessage('')
    }
  }

  async function konfirmasiHapusTransaksi() {
    if (!deleteTarget) return

    try {
      const response = await fetch(
        `${API_URL}/${deleteTarget.id}`,
        {
          method: 'DELETE',
        },
      )

      const data = await response.json()

      if (!response.ok) {
        const pesan = Array.isArray(data.message)
          ? data.message.join(', ')
          : data.message

        throw new Error(pesan || 'Gagal menghapus transaksi')
      }

      setTransactions((current) =>
        current.filter(
          (transaction) => transaction.id !== deleteTarget.id,
        ),
      )

      if (editingTransaction?.id === deleteTarget.id) {
        setEditingTransaction(null)
      }

      setApiMessage('')
    } catch (error) {
      setApiMessage(error.message || 'Gagal menghapus transaksi')
    } finally {
      setDeleteTarget(null)
    }
  }

  function mulaiEditTransaksi(transaction) {
    setEditingTransaction(transaction)
    setApiMessage('')
  }

  function batalkanEditTransaksi() {
    setEditingTransaction(null)
  }

  return (
    <div className="app-shell">
      <AppHeader title="NataFin" />

      <main id="dashboard" className="main-container">
        <PageIntro title="Dashboard" />

        <SummaryCards transactions={transactions} />

        <MockApiPanel />

        <div id="transaksi" className="workspace-grid">
          <section
            className="panel form-panel"
            aria-labelledby="form-heading"
          >
            <div className="panel-heading">
              <h2 id="form-heading">
                {editingTransaction
                  ? 'Edit Transaksi'
                  : 'Tambah Transaksi'}
              </h2>
            </div>

            <TransactionForm
              key={editingTransaction?.id ?? 'new'}
              onAddTransaction={tambahTransaksi}
              editingTransaction={editingTransaction}
              onUpdateTransaction={ubahTransaksi}
              onCancelEdit={batalkanEditTransaksi}
            />
          </section>

          <section
            className="panel transactions-panel"
            aria-labelledby="list-heading"
          >
            <div className="panel-heading list-heading">
              <div>
                <h2 id="list-heading">Daftar Transaksi</h2>
              </div>

              <span className="count-pill">
                {transactions.length} transaksi
              </span>
            </div>

            {apiMessage && (
              <p role="alert">{apiMessage}</p>
            )}

            {loading ? (
              <p>Memuat daftar transaksi...</p>
            ) : loadError ? (
              <p role="alert">{loadError}</p>
            ) : (
              <TransactionList
                transactions={transactions}
                onDeleteTransaction={mulaiHapusTransaksi}
                onEditTransaction={mulaiEditTransaksi}
              />
            )}
          </section>
        </div>
      </main>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Hapus transaksi ini?"
        message={
          deleteTarget
            ? `Keterangan: ${deleteTarget.description}\n\nPeringatan: Data yang dihapus tidak bisa dikembalikan.`
            : ''
        }
        confirmLabel="Ya, Hapus"
        onConfirm={konfirmasiHapusTransaksi}
        onCancel={() => setDeleteTarget(null)}
      />

      <AppFooter year={2026} />
    </div>
  )
}

export default App
