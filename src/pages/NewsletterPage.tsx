import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import styles from './NewsletterPage.module.css';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setJoined(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Monthly Signal</span>
        <h1 className={styles.title}>Get<br />The List</h1>
        <p className={styles.desc}>
          New picks, monthly. No noise. Everything I add gets a personal note on why it made the cut.
          No affiliate links. No sponsored placements. Just the stuff that earned its place.
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
            You're in. First issue drops next month.
          </div>
        )}

        <div className={styles.promises}>
          <div className={styles.promise}>
            <span className={styles.promiseNum}>01</span>
            <span className={styles.promiseText}>Monthly cadence. Never more.</span>
          </div>
          <div className={styles.promise}>
            <span className={styles.promiseNum}>02</span>
            <span className={styles.promiseText}>Zero affiliate links. Ever.</span>
          </div>
          <div className={styles.promise}>
            <span className={styles.promiseNum}>03</span>
            <span className={styles.promiseText}>One-click unsubscribe. No friction.</span>
          </div>
          <div className={styles.promise}>
            <span className={styles.promiseNum}>04</span>
            <span className={styles.promiseText}>Personal voice. Not a newsletter. A text from a friend who did the research.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
