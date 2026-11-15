import { useState } from 'react'

function tanggalHariIni() {
  const hariIni = new Date()
  const tahun = hariIni.getFullYear()
  const bulan = String(hariIni.getMonth() + 1).padStart(2, '0')
  const tanggal = String(hariIni.getDate()).padStart(2, '0')
  return `${tahun}-${bulan}-${tanggal}`
}

const kategoriTransaksi = [
  'Makanan',
  'Transportasi',
  'Pendidikan',
  'Tagihan',
  'Belanja',
  'Hiburan',
  'Uang Saku',
  'Gaji',
  'Lainnya',
]

function TransactionForm({
  onAddTransaction,
  editingTransaction,
  onUpdateTransaction,
  onCancelEdit,
}) {
  const [type, setType] = useState(editingTransaction?.type ?? 'pengeluaran')
  const [category, setCategory] = useState(editingTransaction?.category ?? 'Makanan')
  const [amount, setAmount] = useState(String(editingTransaction?.amount ?? ''))
  const [date, setDate] = useState(editingTransaction?.date ?? tanggalHariIni())
  const [description, setDescription] = useState(editingTransaction?.description ?? '')
  const [message, setMessage] = useState('')

  function resetForm() {
    setType('pengeluaran')
    setCategory('Makanan')
    setAmount('')
    setDate(tanggalHariIni())
    setDescription('')
    setMessage('')
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!description.trim() || !amount || Number(amount) <= 0 || !date) {
      setMessage('Lengkapi semua kolom dan masukkan nominal lebih dari nol.')
      return
    }

    try {
      const dataTransaksi = {
        type,
        category,
        amount: Number(amount),
        date,
        description: description.trim(),
      }

      if (editingTransaction) {
        await onUpdateTransaction(editingTransaction.id, dataTransaksi)
      } else {
        await onAddTransaction(dataTransaksi)
      }

      resetForm()
    } catch (error) {
      setMessage(error.message || 'Transaksi gagal diproses.')
    }
  }

  function handleCancelEdit() {
    resetForm()
    onCancelEdit()
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="transaction-type">Jenis Transaksi</label>
        <select
          id="transaction-type"
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          <option value="pengeluaran">Pengeluaran</option>
          <option value="pemasukan">Pemasukan</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="transaction-category">Kategori</label>
        <select
          id="transaction-category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {kategoriTransaksi.map((kategori) => (
            <option value={kategori} key={kategori}>
              {kategori}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="transaction-amount">Nominal (Rp)</label>
        <input
          id="transaction-amount"
          type="number"
          min="1"
          step="1"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="Contoh: 25000"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="transaction-date">Tanggal Transaksi</label>
        <input
          id="transaction-date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />
      </div>

      <div className="form-field form-field-full">
        <label htmlFor="transaction-description">Keterangan</label>
        <input
          id="transaction-description"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Contoh: Makan siang"
          maxLength={100}
          required
        />
      </div>

      {message && (
        <p className="form-message" role="alert">
          {message}
        </p>
      )}

      <div className="form-actions form-field-full">
        <button className="button button-primary" type="submit">
          {editingTransaction ? 'Simpan Perubahan' : 'Tambah Transaksi'}
        </button>

        {editingTransaction ? (
          <button
            className="button button-secondary"
            type="button"
            onClick={handleCancelEdit}
          >
            Batal Edit
          </button>
        ) : (
          <button
            className="button button-secondary"
            type="button"
            onClick={resetForm}
          >
            Kosongkan
          </button>
        )}
      </div>
    </form>
  )
}

export default TransactionForm
