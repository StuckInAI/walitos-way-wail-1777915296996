export default function UpdatesPage() {
  const updates: Array<{ date: string; title: string; body: string }> = [
    {
      date: 'May 2024',
      title: 'Added PLAUD NotePin & Eufairy UV Printer',
      body: 'Two new tech picks that changed my daily workflow. The PLAUD records and transcribes every meeting. The Eufairy prints on literally anything.',
    },
    {
      date: 'April 2024',
      title: 'Rabbit R1 & Echo Hydrogen Water',
      body: 'The R1 is half-baked but the vision is right. The Echo bottle — was skeptical, now a believer after 30 days.',
    },
    {
      date: 'March 2024',
      title: 'MoonSwatch & JMM Glass',
      body: 'Queued 2 hours for the MoonSwatch. Worth it. JMM Glass — discovered at an LA craft market. Every piece starts a conversation.',
    },
    {
      date: 'February 2024',
      title: 'Superhuman AI & Oura Ring',
      body: 'Hit inbox zero for the first time in 4 years. The Oura Ring completely restructured my sleep.',
    },
    {
      date: 'January 2024',
      title: 'Launch — First 7 picks live',
      body: 'Started Walito\'s Way with Aesop hand wash, Café de Olla, and the Muji CD player. The list is alive.',
    },
  ];

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '60px 24px 80px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, color: '#f0f0ff' }}>Updates</h1>
      <p style={{ fontSize: 13, color: '#8888AA', marginBottom: 48 }}>What's new on the list. Proof it's alive.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {updates.map((u, i) => (
          <div key={i} style={{
            padding: '28px 0',
            borderBottom: i < updates.length - 1 ? '1px solid #1a1a28' : 'none',
          }}>
            <span style={{ fontSize: 11, color: '#FF4D00', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
              {u.date}
            </span>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#f0f0ff', marginTop: 8, marginBottom: 8 }}>
              {u.title}
            </h3>
            <p style={{ fontSize: 14, color: '#8888AA', lineHeight: 1.7 }}>{u.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
