import { Mail, ArrowUpRight } from 'lucide-react';

export default function NewsletterPage() {
  return (
    <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--space-6) var(--space-16)' }}>
      <section style={{ padding: 'var(--space-12) 0 var(--space-10)', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 'var(--space-5)' }}>
          <Mail size={12} />
          <span>The List — Newsletter</span>
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--color-text-primary)', marginBottom: 'var(--space-5)' }}>
          Get the picks in <span style={{ color: 'var(--color-accent)' }}>your inbox.</span>
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', lineHeight: 1.7, maxWidth: '520px', marginBottom: 'var(--space-8)' }}>
          Monthly. No noise. No ads. No affiliate links. Just the new things that earned a spot on Walito's list — delivered straight to you.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', maxWidth: '480px' }}
        >
          <input
            type="email"
            placeholder="your@email.com"
            required
            style={{
              flex: 1,
              minWidth: '200px',
              background: 'var(--color-bg-card)',
              border: '1.5px solid var(--color-border)',
              padding: 'var(--space-3) var(--space-4)',
              color: 'var(--color-text-primary)',
              fontSize: '14px',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              background: 'var(--color-accent)',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: 'var(--space-3) var(--space-6)',
              border: '2px solid var(--color-accent)',
              cursor: 'pointer',
            }}
          >
            Subscribe
            <ArrowUpRight size={15} />
          </button>
        </form>
      </section>
    </div>
  );
}
