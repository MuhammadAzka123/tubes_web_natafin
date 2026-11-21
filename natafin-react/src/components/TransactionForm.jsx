import { useState } from 'react'
import ConfirmDialog from './ConfirmDialog.jsx'

function tanggalHariIni() {
  const hariIni = new Date()
  const tahun = hariIni.getFullYear()
  const bulan = String(hariIni.getMonth() + 1).padStart(2, '0')
  const tanggal = String(hariIni.getDate()).padStart(2, '0')

  return `${tahun}-${bulan}-${tanggal}`
}

function formatRupiah(nominal) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(nominal)
}

function formatTanggalKonfirmasi(tanggal) {
  const [tahun, bulan, hari] = tanggal.split('-').map(Number)

  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(tahun, bulan - 1, hari))
}

function buatRingkasan(dataTransaksi) {
  return [
    `Keterangan: ${dataTransaksi.description}`,
    `Nominal: ${formatRupiah(dataTransaksi.amount)}`,
    `Tanggal: ${formatTanggalKonfirmasi(dataTransaksi.date)}`,
  ].join('\n')
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
  const [type, setType] = useState(
    editingTransaction?.type ?? 'pengeluaran',
  )

  const [category, setCategory] = useState(
    editingTransaction?.category ?? 'Makanan',
  )

  const [amount, setAmount] = useState(
    String(editingTransaction?.amount ?? ''),
  )

  const [date, setDate] = useState(
    editingTransaction?.date ?? tanggalHariIni(),
  )

  const [description, setDescription] = useState(
    editingTransaction?.description ?? '',
  )

  const [message, setMessage] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [pendingTransaction, setPendingTransaction] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function resetForm() {
    setType('pengeluaran')
    setCategory('Makanan')
    setAmount('')
    setDate(tanggalHariIni())
    setDescription('')
    setMessage('')
  }

  function tutupKonfirmasi() {
    setConfirmOpen(false)
    setPendingTransaction(null)
  }

  async function konfirmasiTransaksi() {
    if (!pendingTransaction || isSubmitting) return

    setIsSubmitting(true)

    let editBerhasil = false

    try {
      if (editingTransaction) {
        await onUpdateTransaction(
          editingTransaction.id,
          pendingTransaction,
        )

        editBerhasil = true
      } else {
        await onAddTransaction(pendingTransaction)
        resetForm()
      }

      setConfirmOpen(false)
      setPendingTransaction(null)
    } catch (error) {
      setMessage(error.message || 'Transaksi gagal diproses.')

      setConfirmOpen(false)
      setPendingTransaction(null)
    } finally {
      setIsSubmitting(false)
    }

    if (editBerhasil) {
      onCancelEdit()
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (
      !description.trim() ||
      !amount ||
      Number(amount) <= 0 ||
      !date
    ) {
      setMessage(
        'Lengkapi semua kolom dan masukkan nominal lebih dari nol.',
      )
      return
    }

    const dataTransaksi = {
      type,
      category,
      amount: Number(amount),
      date,
      description: description.trim(),
    }

    setMessage('')
    setPendingTransaction(dataTransaksi)
    setConfirmOpen(true)
  }

  function handleCancelEdit() {
    resetForm()
    onCancelEdit()
  }

  const dialogTitle = editingTransaction
    ? 'Simpan perubahan transaksi ini?'
    : 'Tambahkan transaksi ini?'

  return (
    <>
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
          <button
            className="button button-primary"
            type="submit"
            disabled={isSubmitting}
          >
            {editingTransaction
              ? 'Simpan Perubahan'
              : 'Tambah Transaksi'}
          </button>

          {editingTransaction ? (
            <button
              className="button button-secondary"
              type="button"
              onClick={handleCancelEdit}
              disabled={isSubmitting}
            >
              Batal Edit
            </button>
          ) : (
            <button
              className="button button-secondary"
              type="button"
              onClick={resetForm}
              disabled={isSubmitting}
            >
              Kosongkan
            </button>
          )}
        </div>
      </form>

      <ConfirmDialog
        open={confirmOpen}
        title={dialogTitle}
        message={
          pendingTransaction
            ? buatRingkasan(pendingTransaction)
            : ''
        }
        confirmLabel={
          editingTransaction ? 'Ya, Simpan' : 'Ya, Tambahkan'
        }
        onConfirm={konfirmasiTransaksi}
        onCancel={tutupKonfirmasi}
      />
    </>
  )
}

export default TransactionForm
