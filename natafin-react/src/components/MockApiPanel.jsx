import { useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material'

const API_URL = 'http://localhost:3001/transactions'

const formatRupiah = (amount) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0)

const formatTanggal = (date) => {
  if (!date) return '-'

  const parsedDate = new Date(`${date}T00:00:00`)

  if (Number.isNaN(parsedDate.getTime())) return '-'

  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsedDate)
}

function MockApiPanel() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function ambilDataTransaksi() {
      setLoading(true)
      setError('')

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const response = await fetch(API_URL, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
          throw new Error('Format data tidak valid')
        }

        setTransactions(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Gagal memuat transaksi. Silakan coba lagi.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    ambilDataTransaksi()

    return () => controller.abort()
  }, [retryCount])

  return (
    <Paper
      component="section"
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        mb: 3,
        border: '1px solid #D7DEE7',
        borderRadius: 3,
        backgroundColor: '#FFFFFF',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#102A43',
          fontWeight: 700,
          mb: 2,
        }}
      >
        Contoh Transaksi
      </Typography>

      {loading && (
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          justifyContent="center"
          sx={{ py: 4 }}
          role="status"
          aria-live="polite"
        >
          <CircularProgress
            size={22}
            sx={{ color: '#D4AF37' }}
          />

          <Typography>Memuat data...</Typography>
        </Stack>
      )}

      {!loading && error && (
        <Stack spacing={2} alignItems="flex-start">
          <Alert severity="error">
            {error}
          </Alert>

          <Button
            variant="contained"
            color="error"
            onClick={() => setRetryCount((count) => count + 1)}
            sx={{
              backgroundColor: '#C8372D !important',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#A92B24 !important',
              },
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Coba Lagi
          </Button>
        </Stack>
      )}

      {!loading && !error && transactions.length === 0 && (
        <Typography color="text.secondary">
          Belum ada data transaksi.
        </Typography>
      )}

      {!loading && !error && transactions.length > 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
            },
            gap: 2,
          }}
        >
          {transactions.map((transaction) => {
            const isIncome = transaction.category === 'income'

            return (
              <Card
                key={transaction.id}
                variant="outlined"
                sx={{
                  p: 2,
                  borderColor: '#D7DEE7',
                  borderRadius: 2,
                  minWidth: 0,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={1}
                  sx={{ mb: 2 }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                  >
                    Transaksi #{transaction.id}
                  </Typography>

                  <Chip
                    size="small"
                    label={
                      isIncome ? 'Pemasukan' : 'Pengeluaran'
                    }
                    sx={{
                      backgroundColor: isIncome
                        ? '#E8F5E9'
                        : '#FDECEC',
                      color: isIncome
                        ? '#218344'
                        : '#C62828',
                      fontWeight: 600,
                    }}
                  />
                </Stack>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {formatTanggal(transaction.transaction_date)}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    mt: 1,
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    color: isIncome ? '#218344' : '#C62828',
                  }}
                >
                  {isIncome ? '+' : '-'}
                  {formatRupiah(transaction.amount)}
                </Typography>
              </Card>
            )
          })}
        </Box>
      )}
    </Paper>
  )
}

export default MockApiPanel
