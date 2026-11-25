import {
  useEffect, useId, useRef,
  type ButtonHTMLAttributes, type CSSProperties, type InputHTMLAttributes, type ReactNode,
  type SelectHTMLAttributes, type TextareaHTMLAttributes,
} from 'react';

/**
 * @i-o/ui: React 18 building blocks for every i-o surface.
 * Styles: import '@i-o/ui/styles.css' once (it relies on the --io-* tokens).
 */

const cx = (...names: Array<string | false | undefined | null>) => names.filter(Boolean).join(' ');

// ---------------------------------------------------------------- layout

export function Stack({ gap, children, className, as: Tag = 'div' }: { gap?: string; children: ReactNode; className?: string; as?: 'div' | 'section' | 'ul' | 'ol' }) {
  return <Tag className={cx('ui-stack', className)} style={gap ? ({ '--gap': gap } as CSSProperties) : undefined}>{children}</Tag>;
}

export function Row({ gap, spread, children, className }: { gap?: string; spread?: boolean; children: ReactNode; className?: string }) {
  return <div className={cx('ui-row', spread && 'ui-spread', className)} style={gap ? ({ '--gap': gap } as CSSProperties) : undefined}>{children}</div>;
}

export function Grid({ min, children }: { min?: string; children: ReactNode }) {
  return <div className="ui-grid" style={min ? ({ '--min': min } as CSSProperties) : undefined}>{children}</div>;
}

export function Card({ children, flat, className, as: Tag = 'div' }: { children: ReactNode; flat?: boolean; className?: string; as?: 'div' | 'section' | 'article' | 'li' }) {
  return <Tag className={cx('ui-card', flat && 'ui-card--flat', className)}>{children}</Tag>;
}

// ---------------------------------------------------------------- actions

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export function Button({ variant = 'primary', size, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: 'sm' }) {
  return <button type="button" className={cx('ui-btn', `ui-btn--${variant}`, size && `ui-btn--${size}`, className)} {...props} />;
}

/** Classes for links that should look like buttons (pass to <Link className=…>). */
export const buttonClass = (variant: ButtonVariant = 'primary', size?: 'sm') => cx('ui-btn', `ui-btn--${variant}`, size && `ui-btn--${size}`);

// ---------------------------------------------------------------- status

export type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export function Badge({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`ui-badge ui-badge--${tone}`}>{children}</span>;
}

export function Notice({ tone = 'info', title, children, action }: { tone?: 'info' | 'warning' | 'critical'; title: ReactNode; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className={`ui-notice ui-notice--${tone}`} role={tone === 'critical' ? 'alert' : 'status'}>
      <Icon name={tone === 'info' ? 'info' : 'alert'} />
      <div style={{ flex: 1 }}>
        <strong>{title}</strong>
        {children && <div className="ui-small">{children}</div>}
      </div>
      {action}
    </div>
  );
}

export function Avatar({ name, size }: { name: string; size?: number }) {
  const initials = name.split(/\s+/).map(part => part[0]).slice(0, 2).join('').toUpperCase();
  return <span className="ui-avatar" aria-hidden style={size ? ({ '--size': `${size}px` } as CSSProperties) : undefined}>{initials}</span>;
}

export function Empty({ title, children }: { title: ReactNode; children?: ReactNode }) {
  return <div className="ui-empty"><p className="ui-h3">{title}</p>{children && <p>{children}</p>}</div>;
}

export function Skeleton({ height = 16, width = '100%' }: { height?: number; width?: number | string }) {
  return <div className="ui-skeleton" style={{ height, width }} aria-hidden />;
}

// ---------------------------------------------------------------- forms

export function Field({ label, hint, children, htmlFor }: { label: ReactNode; hint?: ReactNode; children: ReactNode; htmlFor?: string }) {
  return (
    <div className="ui-field">
      <label className="ui-label" htmlFor={htmlFor}>{label}</label>
      {children}
      {hint && <span className="ui-hint">{hint}</span>}
    </div>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="ui-input" {...props} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className="ui-textarea" {...props} />;
}

export function Select({ options, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { options: Array<{ value: string; label: string }> }) {
  return (
    <select className="ui-select" {...props}>
      {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  );
}

export function SearchInput({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="ui-search">
      <Icon name="search" />
      <input className="ui-input" type="search" aria-label={label} {...props} />
    </div>
  );
}

// ---------------------------------------------------------------- tabs

export function Tabs<T extends string>({ value, onChange, tabs, label }: { value: T; onChange: (value: T) => void; tabs: Array<{ value: T; label: ReactNode }>; label: string }) {
  return (
    <div className="ui-tabs" role="tablist" aria-label={label}>
      {tabs.map(tab => (
        <button key={tab.value} role="tab" type="button" className="ui-tab" aria-selected={tab.value === value} onClick={() => onChange(tab.value)}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------- side sheet

export function SideSheet({ open, title, onClose, children, footer }: { open: boolean; title: ReactNode; onClose: () => void; children: ReactNode; footer?: ReactNode }) {
  const titleId = useId();
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    panel.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previous?.focus();
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="ui-sheet-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="ui-sheet" role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1} ref={panel}>
        <div className="ui-sheet__head">
          <h2 className="ui-h2" id={titleId}>{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close"><Icon name="close" /></Button>
        </div>
        <div className="ui-sheet__body">{children}</div>
        {footer && <div className="ui-sheet__foot">{footer}</div>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- timeline

export interface TimelineItem {
  id: string;
  who: string;
  automated?: boolean;
  when: string;
  text: ReactNode;
  kind?: 'comment' | 'status' | 'system';
}

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="ui-timeline">
      {items.map(item => (
        <li key={item.id} className="ui-timeline__item">
          <span className={cx('ui-timeline__dot', item.automated && 'ui-timeline__dot--io')} aria-hidden>
            {item.automated ? 'io' : item.who.split(/\s+/).map(p => p[0]).slice(0, 2).join('')}
          </span>
          <div className="ui-stack" style={{ '--gap': '4px' } as CSSProperties}>
            <div className="ui-small"><strong>{item.who}</strong> <span className="ui-muted">· {item.when}</span></div>
            <div className={item.kind === 'comment' ? 'ui-timeline__bubble' : undefined}>{item.text}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

// ---------------------------------------------------------------- key/value

export function Facts({ items }: { items: Array<[ReactNode, ReactNode]> }) {
  return <dl className="ui-kv">{items.map(([k, v], i) => <FactRow key={i} k={k} v={v} />)}</dl>;
}
function FactRow({ k, v }: { k: ReactNode; v: ReactNode }) {
  return <><dt>{k}</dt><dd>{v}</dd></>;
}

// ---------------------------------------------------------------- icons (24px, 1.75 stroke)

const PATHS: Record<string, string> = {
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm9 16-4.35-4.35',
  close: 'M6 6l12 12M18 6 6 18',
  info: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 8v5m0-8h.01',
  alert: 'M12 3 2 20h20L12 3Zm0 7v4m0 3h.01',
  home: 'M3 11 12 4l9 7v9h-6v-6H9v6H3z',
  help: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-2.5 7a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5v.7m0 3h.01',
  ticket: 'M4 6h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4z',
  laptop: 'M5 6h14v9H5zM3 18h18',
  bag: 'M5 8h14l-1 12H6L5 8Zm4 0V6a3 3 0 0 1 6 0v2',
  book: 'M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 1-4-4z',
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  spark: 'M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5m7 7L18 18M6 18l2.5-2.5m7-7L18 6',
  phone: 'M8 3h8v18H8zM11 18h2',
  monitor: 'M3 5h18v11H3zM8 20h8m-4-4v4',
  key: 'M14 4a6 6 0 1 1-5.2 9l-5.8 5.8V21h3v-2h2v-2h2l1.6-1.6A6 6 0 0 1 14 4Zm2 4h.01',
  box: 'M4 7l8-4 8 4v10l-8 4-8-4zM4 7l8 4 8-4M12 11v10',
  check: 'M5 12l5 5L20 7',
};

export function Icon({ name, size = 20, title }: { name: keyof typeof PATHS | string; size?: number; title?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <path d={PATHS[name] ?? PATHS.info} />
    </svg>
  );
}
