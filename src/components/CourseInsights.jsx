import StatusPill from './StatusPill';

export default function CourseInsights({ summary }) {
  return (
    <section className="insights-card">
      <div className="section-heading">
        <div>
          <p className="section-heading__eyebrow">Operational insight</p>
          <h2>Catalog pulse</h2>
        </div>
        <StatusPill tone="success">Supervisor ready</StatusPill>
      </div>

      <div className="insights-grid">
        <div>
          <span className="insights-grid__label">Recently updated</span>
          <strong>{summary.recentlyUpdated}</strong>
          <p>Courses refreshed in the last 72 hours.</p>
        </div>
        <div>
          <span className="insights-grid__label">Managed by supervisor</span>
          <strong>{summary.ownedBySupervisor}</strong>
          <p>Records already linked to a supervisor account.</p>
        </div>
        <div>
          <span className="insights-grid__label">Average description size</span>
          <strong>{summary.averageDescriptionLength} chars</strong>
          <p>Useful for keeping summaries concise and readable.</p>
        </div>
      </div>
    </section>
  );
}
