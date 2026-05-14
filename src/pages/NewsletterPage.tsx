import { useState } from 'react';
import { Mail, CheckCircle, ArrowRight, Lock } from 'lucide-react';
import styles from './NewsletterPage.module.css';

const PAST_ISSUES = [
  {
    id: '1',
    issue: '#005',
    date: 'Oct 2024',
    title: 'The Reading Stack',
    preview: 'The Kindle that got me reading again, the books in my queue, and why physical books are a different experience than I thought.',
  },
  {
    id: '2',
    issue: '#004',
    date: 'Jul 2024',
    title: 'The Glass Issue',
    preview: 'JMM Glass, the maker economy, and why handcrafted still wins in a world of infinite print-on-demand.',
  },
  {
    id: '3',
    issue: '#003',
    date: 'Jun 2024',
    title: 'AI in Your Pocket',
    preview: "The Rabbit R1 three months later, what Large Action Models actually mean, and the gadgets I'm watching.",
  },
  {
    id: '4',
    issue: '#002',
    date: 'Apr 2024',
    title: 'The Scent Edit',
    preview: 'Jazz Club vs. Tobacco Mandarin, why fragrance is the most underrated personal brand tool, and my full rotation.',
  },
  {
    id: '5',
    issue: '#001',
    date: 'Feb 2024',
    title: 'The First List',
    preview: "The 10 things I'd recommend to anyone, anywhere, right now. Where Walito's Way started.",
  },
];

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setJoined(true);
  };

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.iconWrap}>
          <Mail size={24} />
        </div>
        <h1 className={styles.title}>Get The List</h1>
        <p className={styles.subtitle}>
          New picks, monthly. No noise. The things I actually found this month — gear,
          music, places, tools — written the way I'd text them to a friend.
        </p>

        {!joined ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
            <button type="submit" className={styles.btn}>
              Join The List
              <ArrowRight size={14} />
            </button>
          </form>
        ) : (
          <div className={styles.success}>
            <CheckCircle size={18} />
            <span>You're in. First issue drops next month.</span>
          </div>
        )}

        <p className={styles.legal}>
          <Lock size={10} />
          No spam. Unsubscribe anytime. No affiliate links — ever.
        </p>
      </div>

      {/* What you get */}
      <div className={styles.features}>
        <h2 className={styles.featuresTitle}>What you get</h2>
        <div className={styles.featuresGrid}>
          {[
            {
              num: '01',
              title: 'Real picks only.',
              body: "Everything in the newsletter I've personally used, visited, or tested. Not a digest of links I found interesting.",
            },
            {
              num: '02',
              title: 'Monthly, not daily.',
              body: 'One email a month. Enough time to actually have something worth saying.',
            },
            {
              num: '03',
              title: 'Specific, not vague.',
              body: "Not 'great coffee shop in Tokyo'. The exact counter, the exact order, the exact reason it made the list.",
            },
            {
              num: '04',
              title: 'No financial interest.',
              body: 'Zero affiliate links. Zero sponsored content. If I recommend it, the only reason is that I think you should know.',
            },
          ].map((f) => (
            <div key={f.num} className={styles.feature}>
              <span className={styles.featureNum}>{f.num}</span>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureBody}>{f.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Past issues */}
      <div className={styles.issues}>
        <h2 className={styles.issuesTitle}>Past Issues</h2>
        <div className={styles.issuesList}>
          {PAST_ISSUES.map((issue) => (
            <div key={issue.id} className={styles.issueRow}>
              <div className={styles.issueMeta}>
                <span className={styles.issueNum}>{issue.issue}</span>
                <span className={styles.issueDate}>{issue.date}</span>
              </div>
              <div className={styles.issueContent}>
                <h3 className={styles.issueTitle}>{issue.title}</h3>
                <p className={styles.issuePreview}>{issue.preview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
