import { useState } from 'react';

export default function FeedbackForm({ onSubmit }) {
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ overall_rating: rating, teaching_rating: rating, punctuality_rating: rating, responsiveness_rating: rating, comments });
      setSubmitted(true);
    } catch { /* silent fail for demo */ } finally {
      setLoading(false);
    }
  };

  if (submitted) return (
    <div className="card" style={{ textAlign: 'center', padding: 40 }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
      <strong>Feedback Submitted!</strong>
      <p style={{ color: '#6b7280', marginTop: 8 }}>Thank you for helping us improve teaching quality.</p>
    </div>
  );

  return (
    <div className="card">
      <h3>Rate Your Faculty</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
        <div>
          <label style={{ fontSize: 14, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Overall Rating</label>
          <div style={{ display: 'flex', gap: 6 }}>
            {[1,2,3,4,5].map(s => (
              <button type="button" key={s} onClick={() => setRating(s)}
                style={{ fontSize: 24, background: 'none', border: 'none', cursor: 'pointer', color: rating >= s ? '#f59e0b' : '#d1d5db' }}>
                ★
              </button>
            ))}
          </div>
        </div>
        <div>
          <label style={{ fontSize: 14, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Comments (Anonymous)</label>
          <textarea
            value={comments}
            onChange={e => setComments(e.target.value)}
            placeholder="How was the teaching style? Was the faculty punctual?"
            style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e5e7eb', minHeight: 80, fontFamily: 'inherit', fontSize: 14, resize: 'vertical' }}
            required
          />
        </div>
        <button type="submit" disabled={loading}
          style={{ padding: '12px', background: '#1e293b', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
}
