'use client';

import { useState } from 'react';
import { s, inputStyle, btnStyle, dangerBtnStyle, secondaryBtnStyle } from '../adminStyles';

interface Show {
  id: string;
  date: Date;
  venue: string;
  city: string;
  provinceState: string | null;
  ticketUrl: string;
  soldOut: boolean;
}

interface Props {
  shows: Show[];
  addShow: (fd: FormData) => Promise<void>;
  updateShow: (fd: FormData) => Promise<void>;
  deleteShow: (fd: FormData) => Promise<void>;
}

function formatDateForInput(date: Date): string {
  // Format as YYYY-MM-DD for date input
  return new Date(date).toISOString().split('T')[0];
}

function formatDateDisplay(date: Date): string {
  return new Date(date).toLocaleDateString('en-CA', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function ShowsClient({ shows, addShow, updateShow, deleteShow }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    await addShow(new FormData(e.currentTarget));
    (e.currentTarget as HTMLFormElement).reset();
    setSubmitting(false);
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    await updateShow(new FormData(e.currentTarget));
    setEditingId(null);
    setSubmitting(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this show? This cannot be undone.')) return;
    const fd = new FormData();
    fd.append('id', id);
    await deleteShow(fd);
  }

  return (
    <div>
      <h1 style={s.pageTitle}>Shows</h1>

      {/* ── Add Show Form ── */}
      <section style={s.card}>
        <h2 style={s.sectionTitle}>Add New Show</h2>
        <form onSubmit={handleAdd} style={s.formGrid}>
          <div>
            <label style={s.label}>Date</label>
            <input type="date" name="date" required style={inputStyle} />
          </div>
          <div>
            <label style={s.label}>Venue</label>
            <input name="venue" placeholder="Majestic Theatre" required style={inputStyle} />
          </div>
          <div>
            <label style={s.label}>City</label>
            <input name="city" placeholder="St. John's" required style={inputStyle} />
          </div>
          <div>
            <label style={s.label}>Province / State</label>
            <input name="provinceState" placeholder="NL" style={inputStyle} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={s.label}>Ticket URL</label>
            <input name="ticketUrl" placeholder="https://…" required style={inputStyle} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" id="soldOut-add" name="soldOut" style={{ width: 16, height: 16 }} />
            <label htmlFor="soldOut-add" style={s.checkLabel}>Sold Out</label>
          </div>
          <div style={s.formActions}>
            <button type="submit" disabled={submitting} style={btnStyle}>
              {submitting ? 'Adding…' : '+ Add Show'}
            </button>
          </div>
        </form>
      </section>

      {/* ── Shows Table ── */}
      <section style={s.card}>
        <h2 style={s.sectionTitle}>Upcoming Shows ({shows.length})</h2>
        {shows.length === 0 ? (
          <p style={s.empty}>No shows scheduled.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={s.table}>
              <thead>
                <tr>
                  {['Date', 'Venue', 'City', 'Province', 'Tickets', 'Sold Out', 'Actions'].map((h) => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shows.map((show) =>
                  editingId === show.id ? (
                    <tr key={show.id} style={s.editRow}>
                      <td colSpan={7} style={{ padding: '1rem' }}>
                        <form onSubmit={handleUpdate} style={s.formGrid}>
                          <input type="hidden" name="id" value={show.id} />
                          <div>
                            <label style={s.label}>Date</label>
                            <input
                              type="date"
                              name="date"
                              defaultValue={formatDateForInput(show.date)}
                              required
                              style={inputStyle}
                            />
                          </div>
                          <div>
                            <label style={s.label}>Venue</label>
                            <input name="venue" defaultValue={show.venue} required style={inputStyle} />
                          </div>
                          <div>
                            <label style={s.label}>City</label>
                            <input name="city" defaultValue={show.city} required style={inputStyle} />
                          </div>
                          <div>
                            <label style={s.label}>Province / State</label>
                            <input name="provinceState" defaultValue={show.provinceState ?? ''} style={inputStyle} />
                          </div>
                          <div style={{ gridColumn: '1 / -1' }}>
                            <label style={s.label}>Ticket URL</label>
                            <input name="ticketUrl" defaultValue={show.ticketUrl} required style={inputStyle} />
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                              type="checkbox"
                              id={`soldOut-${show.id}`}
                              name="soldOut"
                              defaultChecked={show.soldOut}
                              style={{ width: 16, height: 16 }}
                            />
                            <label htmlFor={`soldOut-${show.id}`} style={s.checkLabel}>Sold Out</label>
                          </div>
                          <div style={s.formActions}>
                            <button type="submit" disabled={submitting} style={btnStyle}>
                              {submitting ? 'Saving…' : 'Save'}
                            </button>
                            <button type="button" onClick={() => setEditingId(null)} style={secondaryBtnStyle}>
                              Cancel
                            </button>
                          </div>
                        </form>
                      </td>
                    </tr>
                  ) : (
                    <tr key={show.id} style={s.tr}>
                      <td style={s.td}>{formatDateDisplay(show.date)}</td>
                      <td style={s.td}>{show.venue}</td>
                      <td style={s.td}>{show.city}</td>
                      <td style={s.td}>{show.provinceState ?? '—'}</td>
                      <td style={{ ...s.td, maxWidth: '160px' }}>
                        <a href={show.ticketUrl} target="_blank" rel="noreferrer" style={s.link}>
                          {truncate(show.ticketUrl, 35)}
                        </a>
                      </td>
                      <td style={{ ...s.td, textAlign: 'center' }}>
                        {show.soldOut ? '✓' : '—'}
                      </td>
                      <td style={{ ...s.td, whiteSpace: 'nowrap' }}>
                        <button onClick={() => setEditingId(show.id)} style={secondaryBtnStyle}>Edit</button>{' '}
                        <button onClick={() => handleDelete(show.id)} style={dangerBtnStyle}>Delete</button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n) + '…' : str;
}
