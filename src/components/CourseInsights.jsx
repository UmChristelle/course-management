import StatusPill from './StatusPill';

export default function CourseInsights({ summary }) {
  return (
    <section className="insights-card">
      <div className="section-heading">
        <div>
          <p className="section-heading__eyebrow">Course overview</p>
          <h2>Summary</h2>
        </div>
        <StatusPill tone="success">API connected</StatusPill>
      </div>

      <div className="insights-grid">
        <div>
          <span className="insights-grid__label">Updated recently</span>
          <strong>{summary.recentlyUpdated}</strong>
          <p>Courses changed in the last 72 hours.</p>
        </div>
        <div>
          <span className="insights-grid__label">With supervisor ID</span>
          <strong>{summary.ownedBySupervisor}</strong>
          <p>Records currently linked to a supervisor account.</p>
        </div>
        <div>
          <span className="insights-grid__label">Average description</span>
          <strong>{summary.averageDescriptionLength} chars</strong>
          <p>A quick check on how detailed the course summaries are.</p>
        </div>
      </div>
    </section>
  );
}
