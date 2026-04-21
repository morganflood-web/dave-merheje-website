import type { CSSProperties } from 'react';

// Dave Merheje admin UI — black/gold palette

export const inputStyle: CSSProperties = {
  width: '100%',
  padding: '0.6rem 0.75rem',
  backgroundColor: '#0a0a0a',
  border: '1px solid #333',
  borderRadius: '4px',
  color: '#f0f0f0',
  fontSize: '0.9rem',
  boxSizing: 'border-box',
  outline: 'none',
};

export const selectStyle: CSSProperties = {
  ...inputStyle,
  cursor: 'pointer',
};

export const textareaStyle: CSSProperties = {
  ...inputStyle,
  resize: 'vertical',
  lineHeight: 1.7,
  fontFamily: 'inherit',
};

export const btnStyle: CSSProperties = {
  padding: '0.55rem 1.1rem',
  backgroundColor: '#FFD700',
  color: '#0a0a0a',
  border: 'none',
  borderRadius: '4px',
  fontSize: '0.875rem',
  fontWeight: 700,
  cursor: 'pointer',
  letterSpacing: '0.03em',
  whiteSpace: 'nowrap',
};

export const secondaryBtnStyle: CSSProperties = {
  ...btnStyle,
  backgroundColor: 'transparent',
  border: '1px solid #333',
  color: '#888',
};

export const dangerBtnStyle: CSSProperties = {
  ...btnStyle,
  backgroundColor: '#3a1010',
  color: '#f5c0c0',
};

export const s: Record<string, CSSProperties> = {
  pageTitle: {
    color: '#FFD700',
    fontSize: '1.8rem',
    fontWeight: 700,
    margin: '0 0 1.5rem',
    letterSpacing: '0.02em',
  },
  sectionTitle: {
    color: '#f0f0f0',
    fontSize: '1rem',
    fontWeight: 700,
    margin: '0 0 1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    borderBottom: '1px solid #222',
    paddingBottom: '0.5rem',
  },
  card: {
    backgroundColor: '#111',
    border: '1px solid #222',
    borderRadius: '6px',
    padding: '1.25rem',
    marginBottom: '1.5rem',
  },
  editCard: {
    backgroundColor: '#0a0a0a',
    border: '1px solid #FFD700',
    borderRadius: '6px',
    padding: '1.25rem',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '0.75rem',
  },
  formActions: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
  },
  label: {
    display: 'block',
    color: '#888',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    marginBottom: '0.3rem',
  },
  checkLabel: {
    color: '#f0f0f0',
    fontSize: '0.875rem',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '0.875rem',
  },
  th: {
    textAlign: 'left' as const,
    color: '#888',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    padding: '0.5rem 0.75rem',
    borderBottom: '1px solid #222',
    whiteSpace: 'nowrap' as const,
  },
  tr: {
    borderBottom: '1px solid #1a1a1a',
  },
  editRow: {
    borderBottom: '1px solid #FFD700',
    backgroundColor: '#0a0a0a',
  },
  td: {
    padding: '0.6rem 0.75rem',
    color: '#f0f0f0',
    verticalAlign: 'middle' as const,
  },
  empty: {
    color: '#555',
    fontStyle: 'italic',
    margin: 0,
  },
  link: {
    color: '#FFD700',
    textDecoration: 'none',
    fontSize: '0.8rem',
    wordBreak: 'break-all' as const,
  },
  releaseRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
    padding: '0.75rem',
    backgroundColor: '#0a0a0a',
    border: '1px solid #1a1a1a',
    borderRadius: '4px',
  },
  releaseInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.2rem',
    flex: 1,
  },
  releaseMeta: {
    color: '#888',
    fontSize: '0.8rem',
  },
  hint: {
    color: '#444',
    fontSize: '0.8rem',
    marginTop: '0.5rem',
  },
};
