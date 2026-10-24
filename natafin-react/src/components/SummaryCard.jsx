function SummaryCard({ label, value, tone }) {
  return (
    <article className={`summary-card summary-${tone}`}>
      <div className="summary-topline">
        <span className="summary-label">{label}</span>
      </div>
      <p className="summary-value">{value}</p>
    </article>
  )
}

export default SummaryCard
