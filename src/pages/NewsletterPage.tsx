import { useState } from 'react';
import { ArrowRight, CheckCircle, Mail, Zap, Eye, Lock } from 'lucide-react';
import styles from './NewsletterPage.module.css';

const PAST_ISSUES = [
  {
    id: '1',
    date: 'Oct 2024',
    subject: 'The device I carried every day for 3 months',
    preview: 'Rabbit R1 deep-dive, plus the Kindle that got me reading again...',
  },
  {
    id: '2',
    date: 'Sep 2024',
    subject: 'Nairobi food update + a Miyazaki recommendation',
    preview: 'Sugarhill wings, Spirited Away, and what I\'ve been listening to...',
  },
  {
    id: '3',
    date: 'Aug 2024',
    subject: 'The only bag I travel with now',
    preview: 'Patagonia Black Hole Duffel after 18 months. Plus: Jazz Club fragrance update...',
  },
  {
    id: '4',
    date: 'Jul 2024',
    subject: 'I found a glassmaker you need to know about',
    preview: 'JMM Glass — handmade, made to order, and the craftsmanship is unreal...',
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
      <div className={styles.hero}>
        <div className={styles.iconWrap}>
          <Mail size={28} />
        </div>
        <div className={styles.eyebrow}>
          <span className={styles.dot} />
          Monthly · Free · No noise
        </div>
        <h1 className={styles.title}>Get The List</h1>
        <p className={styles.subtitle}>
          Once a month I send the new picks, updated takes, and anything I've been
          thinking about. No padding. No sponsored content. Just the real stuff.
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
            <CheckCircle size={20} />
            <div>
              <p className={styles.successTitle}>You're on the list.</p>
              <p className={styles.successSub}>First issue lands in your inbox next month.</p>
            </div>
          </div>
        )}
      </div>

      <div className={styles.promises}>
        {[
          { Icon: Zap, title: 'One email a month', body: 'That\'s it. No welcome series, no re-engagement drip. One real email, monthly.' },
          { Icon: Eye, title: 'Only real picks', body: 'Everything in the email is something I\'m personally using or thinking about. No filler.' },
          { Icon: Lock, title: 'No third-party sharing', body: 'Your email stays here. I don\'t sell it, share it, or use it for ads.' },
        ].map(({ Icon, title, body }) => (
          <div key={title} className={styles.promise}>
            <div className={styles.promiseIcon}><Icon size={16} /></div>
            <div>
              <h3 className={styles.promiseTitle}>{title}</h3>
              <p className={styles.promiseBody}>{body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.archiveSection}>
        <h2 className={styles.archiveTitle}>Past issues</h2>
        <p className={styles.archiveSub}>A look at what's been sent.</p>
        <div className={styles.archiveList}>
          {PAST_ISSUES.map((issue) => (
            <div key={issue.id} className={styles.issue}>
              <span className={styles.issueDate}>{issue.date}</span>
              <div className={styles.issueContent}>
                <p className={styles.issueSubject}>{issue.subject}</p>
                <p className={styles.issuePreview}>{issue.preview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
