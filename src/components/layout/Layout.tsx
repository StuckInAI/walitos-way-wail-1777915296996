import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import styles from '@/components/layout/Layout.module.css';

export default function Layout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>Walito's Way — curated with love ✦</p>
      </footer>
    </div>
  );
}
