import { useState, type FormEvent } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { OrgEvent } from '@i-o/api';
import { Avatar, Icon, Notice } from '@i-o/ui';
import { useLiveEvents, useQuery } from './io';

const NAV = [
  { to: '/', key: 'nav.home', icon: 'home', end: true },
  { to: '/help', key: 'nav.help', icon: 'help' },
  { to: '/requests', key: 'nav.requests', icon: 'ticket' },
  { to: '/technology', key: 'nav.technology', icon: 'laptop' },
  { to: '/catalog', key: 'nav.catalog', icon: 'bag' },
] as const;

export function Shell() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const me = useQuery(io => io.me());
  const events = useQuery(io => io.events.list({ active: true }));
  const [q, setQ] = useState('');
  const [toasts, setToasts] = useState<OrgEvent[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);

  useLiveEvents(event => {
    setToasts(list => [event, ...list].slice(0, 3));
    setTimeout(() => setToasts(list => list.filter(e => e.id !== event.id)), 6000);
    events.reload();
  });

  const banners = (events.data ?? []).filter(e => !e.personal && e.severity !== 'info' && !dismissed.includes(e.id));

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <div className="shell">
      <a className="skip-link" href="#main">{t('shell.skip')}</a>
      <header className="topbar">
        <div className="topbar__inner">
          <Link to="/" className="brand" aria-label="i-o">
            <span className="brand__mark">i-o</span>
            <span className="brand__name">{t('brand.name')}</span>
          </Link>
          <nav className="nav" aria-label={t('nav.label')}>
            {NAV.map(item => (
              <NavLink key={item.to} to={item.to} end={'end' in item ? item.end : false} className="nav__link">
                <Icon name={item.icon} size={18} />
                <span>{t(item.key)}</span>
              </NavLink>
            ))}
          </nav>
          <form className="topbar__search" onSubmit={submit} role="search">
            <Icon name="search" size={18} />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder={t('shell.searchPlaceholder')} aria-label={t('shell.search')} />
          </form>
          <Link to="/preferences" className="me" aria-label={t('nav.preferences')}>
            {me.data && <Avatar name={me.data.name} size={34} />}
          </Link>
        </div>
      </header>

      {banners.length > 0 && (
        <div className="banners">
          {banners.map(event => (
            <Notice key={event.id} tone={event.severity === 'critical' ? 'critical' : 'warning'} title={event.title}
              action={<button className="ui-btn ui-btn--ghost ui-btn--sm" onClick={() => setDismissed(d => [...d, event.id])}>{t('common.dismiss')}</button>}>
              {event.body}
            </Notice>
          ))}
        </div>
      )}

      <main id="main" className="page">
        <Outlet />
      </main>

      <footer className="footer">
        <span>i-o systems · {t('brand.tagline')}</span>
        <span className="ui-muted">{t('footer.sample')}</span>
      </footer>

      <div className="ui-toasts" aria-live="polite">
        {toasts.map(toast => (
          <div key={toast.id} className="ui-toast"><strong>{toast.title}</strong>{toast.body && <div className="ui-small">{toast.body}</div>}</div>
        ))}
      </div>
    </div>
  );
}
