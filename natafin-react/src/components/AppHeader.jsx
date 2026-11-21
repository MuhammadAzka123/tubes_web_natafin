function AppHeader({ title }) {
  return (
    <header className="app-header">
      <div className="header-inner">
        <p className="brand-name">{title}</p>

        <nav className="app-nav" aria-label="Navigasi utama">
          <a href="#dashboard">Dashboard</a>
          <a href="#transaksi">Transaksi</a>
        </nav>
      </div>
    </header>
  )
}

export default AppHeader
