import React, { useState } from 'react';
import { 
  Star, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  User, 
  BookOpen,
  Award,
  ShieldCheck
} from 'lucide-react';
import SmartIcon from '../common/SmartIcon';

const FACULTY_LIST = [
  { name: 'Prof. Priya Sharma (Adjunct Faculty)', course: 'CS301', title: 'Advanced Cloud Computing' },
  { name: 'Prof. Priya Sharma (Adjunct Faculty)', course: 'CS204', title: 'Distributed Systems Practicum' },
  { name: 'Dr. Rajesh Sharma (HOD)', course: 'CS402', title: 'High Performance Computing' },
  { name: 'Dr. Suresh Verma', course: 'CS305', title: 'Database Engineering' },
  { name: 'Prof. Ananya Roy', course: 'MA201', title: 'Discrete Mathematics' },
  { name: 'Dr. Vikram Malhotra', course: 'HU102', title: 'Technical Ethics' }
];

export default function StudentFeedbackTab({ onSubmitFeedback }) {
  const [selectedFaculty, setSelectedFaculty] = useState(FACULTY_LIST[0]);
  const [overallRating, setOverallRating] = useState(5);
  const [clarityRating, setClarityRating] = useState(5);
  const [doubtRating, setDoubtRating] = useState(5);
  const [comments, setComments] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!onSubmitFeedback) return;
    setSubmitting(true);
    await onSubmitFeedback({
      facultyName: selectedFaculty.name,
      courseCode: selectedFaculty.course,
      rating: overallRating,
      clarityRating,
      doubtSupportRating: doubtRating,
      comments: comments || 'Very effective pedagogy and practical exercises.'
    });
    setSubmitting(false);
    setToastMsg(`Feedback for ${selectedFaculty.name} submitted anonymously.`);
    setComments('');
    setTimeout(() => setToastMsg(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-xl bg-slate-900 border border-slate-700 text-white flex items-center gap-3 text-sm font-semibold animate-fade-in">
          <CheckCircle2 className="text-emerald-400" size={18} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 font-bold text-sm flex items-center justify-center">
              <Star size={20} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Faculty & Adjunct Trainer Evaluation
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Anonymous student feedback cell for curriculum enhancement & teaching performance audits
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
          <ShieldCheck size={14} className="text-slate-800" />
          <span>100% Anonymous & Encrypted</span>
        </div>
      </div>

      {/* Main Feedback Form Card */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-2xs max-w-3xl space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Faculty & Course Section
            </label>
            <select
              value={`${selectedFaculty.course}::${selectedFaculty.name}`}
              onChange={(e) => {
                const [code, name] = e.target.value.split('::');
                const match = FACULTY_LIST.find(f => f.course === code && f.name === name);
                if (match) setSelectedFaculty(match);
              }}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold outline-none focus:border-slate-900 cursor-pointer"
            >
              {FACULTY_LIST.map((f, idx) => (
                <option key={idx} value={`${f.course}::${f.name}`}>
                  {f.course}: {f.title} — {f.name}
                </option>
              ))}
            </select>
          </div>

          {/* Star Rating 1: Overall */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-extrabold text-slate-900 block text-xs">Overall Teaching Excellence</span>
              <span className="text-[11px] text-slate-500">Quality of lectures, structure & domain expertise</span>
            </div>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setOverallRating(star)}
                  className="p-1 cursor-pointer transition-transform hover:scale-110"
                >
                  <Star 
                    size={22} 
                    className={star <= overallRating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'} 
                  />
                </button>
              ))}
              <span className="font-black text-slate-900 ml-2 w-8 text-right">{overallRating} / 5</span>
            </div>
          </div>

          {/* Star Rating 2: Clarity */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-extrabold text-slate-900 block text-xs">Conceptual Clarity & Pace</span>
              <span className="text-[11px] text-slate-500">Clear explanations of complex theoretical proofs</span>
            </div>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setClarityRating(star)}
                  className="p-1 cursor-pointer transition-transform hover:scale-110"
                >
                  <Star 
                    size={22} 
                    className={star <= clarityRating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'} 
                  />
                </button>
              ))}
              <span className="font-black text-slate-900 ml-2 w-8 text-right">{clarityRating} / 5</span>
            </div>
          </div>

          {/* Star Rating 3: Lab & Doubt Support */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-extrabold text-slate-900 block text-xs">Practical Guidance & Doubt Resolution</span>
              <span className="text-[11px] text-slate-500">Helpfulness during lab assignments & doubt ticketing</span>
            </div>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setDoubtRating(star)}
                  className="p-1 cursor-pointer transition-transform hover:scale-110"
                >
                  <Star 
                    size={22} 
                    className={star <= doubtRating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'} 
                  />
                </button>
              ))}
              <span className="font-black text-slate-900 ml-2 w-8 text-right">{doubtRating} / 5</span>
            </div>
          </div>

          {/* Qualitative Comments */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Constructive Feedback & Suggestions
            </label>
            <textarea
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="What aspects of the course did you appreciate most? What could be improved in future lectures?"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium outline-none focus:border-slate-900 resize-none leading-relaxed"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send size={14} />
              <span>{submitting ? 'Submitting...' : 'Submit Evaluation'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
