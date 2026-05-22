import styles from './AboutPage.module.css';

const WALITO_PHOTO = 'https://i.imgur.com/8bQpDvN.jpeg';

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.photoWrap}>
          <img
            src={WALITO_PHOTO}
            alt="Wa'il aka Walito"
            className={styles.photo}
          />
          <div className={styles.photoFade} />
        </div>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>About</span>
          <h1 className={styles.name}>Wa'il<br />Walito</h1>
          <p className={styles.tagline}>Founder. Traveler. Obsessive researcher.</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.block}>
          <h2 className={styles.blockTitle}>Why This Exists</h2>
          <p className={styles.blockText}>
            Every recommendation on this site I've paid for myself, visited in person, or used until it broke.
            No sponsorships. No affiliate links. No brand deals. Just the stuff that actually earned a permanent
            spot in my life — and why.
          </p>
          <p className={styles.blockText}>
            I got tired of "best of" lists written by people who haven't touched the product.
            Walito's Way is the antidote: a living record of the things I actually reach for, wear, use, and recommend
            to people I care about.
          </p>
        </div>

        <div className={styles.block}>
          <h2 className={styles.blockTitle}>The Rules</h2>
          <ul className={styles.rulesList}>
            <li className={styles.rulesItem}>
              <span className={styles.rulesNum}>01</span>
              <span>Everything is personally purchased or experienced. No exceptions.</span>
            </li>
            <li className={styles.rulesItem}>
              <span className={styles.rulesNum}>02</span>
              <span>No affiliate links. Ever. The list stays clean.</span>
            </li>
            <li className={styles.rulesItem}>
              <span className={styles.rulesNum}>03</span>
              <span>One specific detail per pick that proves real experience.</span>
            </li>
            <li className={styles.rulesItem}>
              <span className={styles.rulesNum}>04</span>
              <span>If it stops being excellent, it gets removed. No legacy picks.</span>
            </li>
            <li className={styles.rulesItem}>
              <span className={styles.rulesNum}>05</span>
              <span>The list is alive. New picks added monthly. Check back.</span>
            </li>
          </ul>
        </div>

        <div className={styles.block}>
          <h2 className={styles.blockTitle}>Background</h2>
          <p className={styles.blockText}>
            Based between Dubai and wherever interesting is happening. I've been to Tokyo four times.
            I queue for things that deserve it. I've eaten at counters with six seats at 1am.
            I carry a bag I've taken to 14 countries. I track sleep obsessively and take notes on everything.
          </p>
          <p className={styles.blockText}>
            The common thread: I do the research so you don't have to. And I tell you exactly what nobody
            else will.
          </p>
        </div>

        <div className={styles.signoff}>
          <span className={styles.signoffMark}>—W</span>
          <p className={styles.signoffText}>Walito's Way</p>
        </div>
      </div>
    </div>
  );
}
