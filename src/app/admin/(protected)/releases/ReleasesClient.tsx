'use client';

import { useState } from 'react';
import { s, inputStyle, btnStyle, dangerBtnStyle, secondaryBtnStyle } from '../adminStyles';
import type { PlatformLink } from '@/lib/db';

interface Release {
  id: string;
  title: string;
  year: number;
  awardText: string | null;
  coverImage: string;
  platforms: PlatformLink[];
  sortOrder: number;
}

interface Props {
  releases: Release[];
  addRelease: (fd: FormData) => Promise<void>;
  updateRelease: (fd: FormData) => Promise<void>;
  deleteRelease: (fd: FormData) => Promise<void>;
}

function emptyPlatform(): PlatformLink {
  return { label: '', url: '' };
}

function PlatformEditor({
  platforms,
  onChange,
}: {
  platforms: PlatformLink[];
  onChange: (p: PlatformLink[]) => void;
}) {
  function update(idx: number, field: keyof PlatformLink, value: string) {
    const next = platforms.map((p, i) => (i === idx ? { ...p, [field]: value } : p));
    onChange(next);
  }

  function remove(idx: number) {
    onChange(platforms.filter((_, i) => i !== idx));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {platforms.map((p, idx) => (
        <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            value={p.label}
            onChange={(e) => update(idx, 'label', e.target.value)}
            placeholder="Label (e.g. Spotify)"
            style={{ ...inputStyle, flex: '0 0 160px' }}
          />
          <input
            value={p.url}
            onChange={(e) => update(idx, 'url', e.target.value)}
            placeholder="URL"
            style={{ ...inputStyle, flex: 1 }}
          />
          <button
            type="button"
            onClick={() => remove(idx)}
            style={{ ...dangerBtnStyle, padding: '0.4rem 0.6rem', fontSize: '0.8rem' }}
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...platforms, emptyPlatform()])}
        style={{ ...secondaryBtnStyle, alignSelf: 'flex-start', marginTop: '0.25rem' }}
      >
        + Add Platform
      </button>
    </div>
  );
}

function CoverImageUpload({ defaultPath }: { defaultPath: string }) {
  const [path, setPath] = useState(defaultPath);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(defaultPath);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.path) {
        setPath(data.path);
        setPreview(data.path);
      } else {
        alert('Upload failed: ' + (data.error ?? 'unknown error'));
      }
    } catch {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {preview && (
        <img
          src={preview}
          alt="Cover"
          style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4, border: '1px solid #444' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      )}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFile}
        disabled={uploading}
        style={{ color: '#ccc', fontSize: '0.875rem' }}
      />
      {uploading && <p style={{ color: '#aaa', fontSize: '0.8rem', margin: 0 }}>Uploading…</p>}
      <input type="hidden" name="coverImage" value={path} />
      <p style={{ color: '#888', fontSize: '0.75rem', margin: 0 }}>
        Or enter a path manually: <input
          value={path}
          onChange={(e) => { setPath(e.target.value); setPreview(e.target.value); }}
          placeholder="/images/release-dawud.jpg"
          style={{ ...inputStyle, marginTop: '0.25rem', fontSize: '0.8rem' }}
        />
      </p>
    </div>
  );
}


function ReleaseForm({
  defaultValues,
  releaseId,
  onSubmit,
  submitting,
  submitLabel,
  onCancel,
}: {
  defaultValues?: Release;
  releaseId?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, platforms: PlatformLink[]) => Promise<void>;
  submitting: boolean;
  submitLabel: string;
  onCancel?: () => void;
}) {
  const [platforms, setPlatforms] = useState<PlatformLink[]>(
    defaultValues?.platforms ?? [emptyPlatform()]
  );

  return (
    <form onSubmit={(e) => onSubmit(e, platforms)} style={s.formGrid}>
      {releaseId && <input type="hidden" name="id" value={releaseId} />}
      {/* Hidden field carries the platforms JSON */}
      <input type="hidden" name="platforms" value={JSON.stringify(platforms)} />

      <div>
        <label style={s.label}>Title</label>
        <input name="title" placeholder="DAWUD" defaultValue={defaultValues?.title} required style={inputStyle} />
      </div>
      <div>
        <label style={s.label}>Year</label>
        <input name="year" type="number" placeholder="2025" defaultValue={defaultValues?.year} required style={inputStyle} />
      </div>
      <div>
        <label style={s.label}>Sort Order</label>
        <input name="sortOrder" type="number" placeholder="0" defaultValue={defaultValues?.sortOrder ?? 0} style={inputStyle} />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={s.label}>Award / Description (optional)</label>
        <input
          name="awardText"
          placeholder="🏆 Juno Award Nominated 2026"
          defaultValue={defaultValues?.awardText ?? ''}
          style={inputStyle}
        />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={s.label}>Cover Image</label>
        <CoverImageUpload
          defaultPath={defaultValues?.coverImage ?? '/images/release-placeholder.svg'}
        />
      </div>

      <div style={{ gridColumn: '1 / -1' }}>
        <label style={{ ...s.label, marginBottom: '0.5rem' }}>Streaming Platforms</label>
        <PlatformEditor platforms={platforms} onChange={setPlatforms} />
      </div>

      <div style={{ ...s.formActions, gridColumn: '1 / -1' }}>
        <button type="submit" disabled={submitting} style={btnStyle}>
          {submitting ? 'Saving…' : submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} style={secondaryBtnStyle}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default function ReleasesClient({ releases, addRelease, updateRelease, deleteRelease }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleAdd(e: React.FormEvent<HTMLFormElement>, platforms: PlatformLink[]) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    fd.set('platforms', JSON.stringify(platforms));
    await addRelease(fd);
    (e.currentTarget as HTMLFormElement).reset();
    setSubmitting(false);
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>, platforms: PlatformLink[]) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    fd.set('platforms', JSON.stringify(platforms));
    await updateRelease(fd);
    setEditingId(null);
    setSubmitting(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this release? This cannot be undone.')) return;
    const fd = new FormData();
    fd.append('id', id);
    await deleteRelease(fd);
  }

  return (
    <div>
      <h1 style={s.pageTitle}>Releases</h1>

      {/* ── Add Release Form ── */}
      <section style={s.card}>
        <h2 style={s.sectionTitle}>Add New Release</h2>
        <ReleaseForm
          onSubmit={handleAdd}
          submitting={submitting}
          submitLabel="+ Add Release"
        />
      </section>

      {/* ── Releases List ── */}
      <section style={s.card}>
        <h2 style={s.sectionTitle}>Current Releases ({releases.length})</h2>
        {releases.length === 0 ? (
          <p style={s.empty}>No releases yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {releases.map((release) =>
              editingId === release.id ? (
                <div key={release.id} style={s.editCard}>
                  <ReleaseForm
                    defaultValues={release}
                    releaseId={release.id}
                    onSubmit={handleUpdate}
                    submitting={submitting}
                    submitLabel="Save Changes"
                    onCancel={() => setEditingId(null)}
                  />
                </div>
              ) : (
                <div key={release.id} style={s.releaseRow}>
                  <div style={s.releaseInfo}>
                    <strong style={{ color: '#f0f0f0' }}>{release.title}</strong>
                    <span style={s.releaseMeta}>{release.year}{release.awardText ? ` · ${release.awardText}` : ''}</span>
                    <div style={{ marginTop: '0.4rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {release.platforms.map((p) => (
                        <a key={p.url} href={p.url} target="_blank" rel="noreferrer" style={{
                          padding: '0.2rem 0.5rem',
                          backgroundColor: 'rgba(255,215,0,0.1)',
                          border: '1px solid rgba(255,215,0,0.3)',
                          borderRadius: '3px',
                          color: '#FFD700',
                          fontSize: '0.75rem',
                          textDecoration: 'none',
                          fontWeight: 600,
                        }}>
                          {p.label}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                    <button onClick={() => setEditingId(release.id)} style={secondaryBtnStyle}>Edit</button>
                    <button onClick={() => handleDelete(release.id)} style={dangerBtnStyle}>Delete</button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
}
