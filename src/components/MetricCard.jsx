export default function MetricCard({ eyebrow, value, description }) {
  return (
    <article className="metric-card">
      <span className="metric-card__eyebrow">{eyebrow}</span>
      <strong className="metric-card__value">{value}</strong>
      <p className="metric-card__description">{description}</p>
    </article>
  );
}
