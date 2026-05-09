import { useState } from 'react';
import { Mail, ArrowUpRight, Check, Rss, Lock, Zap } from 'lucide-react';
import styles from '@/pages/NewsletterPage.module.css';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  const perks = [
    {
      icon: <Zap size={16} />,
      title: 'New picks first',
      body: 'Everything that makes the list lands in your inbox before it goes public.',
    },
    {
      icon: <Rss size={16} />,
      title: 'Behind the curation',
      body: 'Occasional deep-dives on why something earned its spot — and what almost made it.',
    },
    {
      icon: <Lock size={16} />,
      title: 'No noise, ever',
      body: 'Monthly at most. No sponsors. No affiliate links. No padding. Just signal.',
    },
  ];

  const pastIssues = [
    { label: 'Dec 2024', subject: 'Kendrick dropped, I added two gear picks, and a note on JMM Glass' },
    { label: 'Oct 2024', subject: 'The Rabbit R1 six months later — still worth it, here\'s why' },
    { label: 'Aug 2024', subject: 'Seoul, UV printing, and why Cursor replaced my IDE' },
    { label: 'May 2024', subject: 'Tokyo for the 4th time: what changed, what didn\'t, what still blew me away' },
    { label: 'Jan 2024', subject: 'Year in review: 12 things that earned permanent spots in my life' },
  ];

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.eyebrow}>
          <Mail size={12} />
          <span>The List — Newsletter</span>
        </div>
        <h1 className={styles.heroTitle}>
          Get the picks in{' '}
          <span className={styles.accent}>your inbox.</span>
        </h1>
        <p className={styles.heroSub}>
          Monthly. No noise. No ads. No affiliate links. Just the new things that earned a spot
          on Walito's list — delivered straight to you.
        </p>
      </section>

      <div className={styles.layout}>
        {/* Form column */}
        <div className={styles.formCol}>
          {!submitted ? (
            <div className={styles.formCard}>
              <div className={styles.formCardHeader}>
                <Mail size={20} className={styles.formCardIcon} />
                <div>
                  <div className={styles.formCardTitle}>Subscribe to The List</div>
                  <div className={styles.formCardSub}>Free. Unsubscribe any time.</div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label} htmlFor="email">Your email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
                <button type="submit" className={styles.submitBtn}>
                  <span>Join The List</span>
                  <ArrowUpRight size={16} />
                </button>
              </form>
              <p className={styles.formNote}>
                New picks, monthly. No noise. I respect your inbox.
              </p>
            </div>
          ) : (
            <div className={styles.successCard}>
              <div className={styles.successIcon}>
                <Check size={28} />
              </div>
              <h3 className={styles.successTitle}>You're on the list.</h3>
              <p className={styles.successBody}>
                Welcome in. You'll get the next issue when something genuinely worth sharing lands on the list.
                That might be a week from now or a month. Quality over cadence.
              </p>
            </div>
          )}

          {/* Perks */}
          <div className={styles.perks}>
            {perks.map((p, i) => (
              <div key={i} className={styles.perk}>
                <div className={styles.perkIcon}>{p.icon}</div>
                <div>
                  <div className={styles.perkTitle}>{p.title}</div>
                  <div className={styles.perkBody}>{p.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past issues column */}
        <div className={styles.issuesCol}>
          <div className={styles.issuesHeader}>
            <Rss size={14} className={styles.issuesIcon} />
            <span className={styles.issuesTitle}>Past issues</span>
          </div>
          <div className={styles.issuesList}>
            {pastIssues.map((issue, i) => (
              <div key={i} className={styles.issue}>
                <div className={styles.issueLabel}>{issue.label}</div>
                <div className={styles.issueSubject}>{issue.subject}</div>
              </div>
            ))}
          </div>
          <div className={styles.issuesCta}>
            Subscribe above to get the next one.
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>Walito's Way — curated cool, delivered monthly.</p>
      </footer>
    </div>
  );
}
