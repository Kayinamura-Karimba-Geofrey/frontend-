import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function ExamPage() {
  const [exams] = useState([
    { id: 1, title: 'Term 1 Calculus Assessment', course: 'MATH-401', duration: 45, totalMarks: 100, status: 'Scheduled' },
    { id: 2, title: 'Quantum Physics Quiz 2', course: 'PHYS-201', duration: 30, totalMarks: 50, status: 'Completed' },
  ]);

  const [activeExam, setActiveExam] = useState(null);
  const [timeLeft, setTimeLeft] = useState(2700); // 45 mins in seconds
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const sampleQuestions = [
    { id: 1, text: 'What is the derivative of f(x) = x^3 + 4x - 7?', options: ['3x^2 + 4', '3x^2 - 7', 'x^2 + 4', '3x^3 + 4'] },
    { id: 2, text: 'Evaluate the integral ∫ (2x + 5) dx.', options: ['x^2 + 5x + C', '2x^2 + 5x + C', 'x^2 + C', '5x + C'] },
  ];

  useEffect(() => {
    if (!activeExam) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert('Exam time expired! Submitting answers automatically.');
          setActiveExam(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [activeExam]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (activeExam) {
    const q = sampleQuestions[currentQuestion];
    return (
      <div style={{ padding: '2rem', backgroundColor: '#fff', minHeight: '80vh', border: '2px solid #000', borderRadius: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #000', paddingBottom: '1rem', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{activeExam.title} — Distraction-Free Exam Engine</h2>
            <p style={{ color: '#666', fontSize: '0.85rem' }}>Course: {activeExam.course} • Question {currentQuestion + 1} of {sampleQuestions.length}</p>
          </div>
          <div style={{ backgroundColor: '#000', color: '#fff', padding: '0.5rem 1.25rem', borderRadius: '6px', fontWeight: 800, fontSize: '1.1rem' }}>
            Timer: {formatTime(timeLeft)}
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>{q.text}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {q.options.map((opt, idx) => (
              <label
                key={idx}
                style={{
                  padding: '1rem',
                  border: answers[q.id] === opt ? '2px solid #000' : '1px solid #d9d9d9',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: answers[q.id] === opt ? 700 : 500,
                  backgroundColor: answers[q.id] === opt ? '#f5f5f5' : '#fff',
                }}
              >
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  checked={answers[q.id] === opt}
                  onChange={() => setAnswers({ ...answers, [q.id]: opt })}
                  style={{ marginRight: '0.75rem' }}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button variant="outline" disabled={currentQuestion === 0} onClick={() => setCurrentQuestion(currentQuestion - 1)}>
            Previous Question
          </Button>
          {currentQuestion < sampleQuestions.length - 1 ? (
            <Button variant="black" onClick={() => setCurrentQuestion(currentQuestion + 1)}>
              Next Question
            </Button>
          ) : (
            <Button variant="black" onClick={() => { alert('Exam submitted successfully!'); setActiveExam(null); }}>
              Submit Exam Final
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <Card title="Online Examination Portal">
      <div className="table-container">
        <table className="mono-table">
          <thead>
            <tr>
              <th>Exam Title</th>
              <th>Course</th>
              <th>Duration</th>
              <th>Total Marks</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((ex) => (
              <tr key={ex.id}>
                <td style={{ fontWeight: 700 }}>{ex.title}</td>
                <td>{ex.course}</td>
                <td>{ex.duration} Mins</td>
                <td>{ex.totalMarks} Marks</td>
                <td>
                  <Badge variant={ex.status === 'Completed' ? 'black' : 'outline'}>{ex.status}</Badge>
                </td>
                <td>
                  <Button
                    variant="black"
                    disabled={ex.status === 'Completed'}
                    style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                    onClick={() => setActiveExam(ex)}
                  >
                    Start Exam
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
