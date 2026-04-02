import Image from "next/image";
import type { Release, Show } from "@/generated/prisma/client";
import {
  addRelease,
  addShow,
  deleteRelease,
  deleteShow,
  logoutAdmin,
  updateRelease,
} from "./actions";

const inputClass =
  "w-full border border-white/15 bg-white/[0.06] px-3 py-2 text-sm text-white outline-none focus:border-white/35";
const labelClass = "block text-xs font-medium uppercase tracking-wide text-white/45";

export function AdminDashboard({
  shows,
  releases,
}: {
  shows: Show[];
  releases: Release[];
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 pb-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Admin</h1>
          <p className="mt-1 text-sm text-white/45">Shows and releases</p>
        </div>
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="text-sm text-white/50 underline decoration-white/25 underline-offset-4 hover:text-white"
          >
            Sign out
          </button>
        </form>
      </div>

      <section className="mt-14 border-t border-white/10 pt-12">
        <h2 className="text-lg font-medium text-white">Shows</h2>
        <ul className="mt-6 space-y-6">
          {shows.map((s) => (
            <li
              key={s.id}
              className="flex flex-col gap-3 border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="text-sm text-white/80">
                <p className="font-medium text-white">
                  {s.date.toLocaleString()}
                </p>
                <p>
                  {s.venue} — {s.city}
                  {s.provinceState ? `, ${s.provinceState}` : ""}
                </p>
                <a
                  href={s.ticketUrl}
                  className="text-xs text-white/50 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ticket link
                </a>
              </div>
              <form action={deleteShow}>
                <input type="hidden" name="id" value={s.id} />
                <button
                  type="submit"
                  aria-label={`Delete show: ${s.venue}`}
                  className="text-xs font-medium uppercase tracking-wide text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </form>
            </li>
          ))}
        </ul>

        <h3 className="mt-10 text-sm font-medium text-white/70">Add show</h3>
        <form action={addShow} className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="show-date">
              Date &amp; time
            </label>
            <input
              id="show-date"
              className={`mt-1 ${inputClass}`}
              type="datetime-local"
              name="date"
              required
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="venue">
              Venue
            </label>
            <input
              id="venue"
              className={`mt-1 ${inputClass}`}
              name="venue"
              required
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="city">
              City
            </label>
            <input id="city" className={`mt-1 ${inputClass}`} name="city" required />
          </div>
          <div>
            <label className={labelClass} htmlFor="provinceState">
              Province / state
            </label>
            <input
              id="provinceState"
              className={`mt-1 ${inputClass}`}
              name="provinceState"
              placeholder="Optional"
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="ticketUrl">
              Ticket URL
            </label>
            <input
              id="ticketUrl"
              className={`mt-1 ${inputClass}`}
              name="ticketUrl"
              type="url"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="border border-white/25 bg-white/[0.08] px-4 py-2 text-sm text-white hover:bg-white/15"
            >
              Add show
            </button>
          </div>
        </form>
      </section>

      <section className="mt-16 border-t border-white/10 pt-12">
        <h2 className="text-lg font-medium text-white">Releases</h2>

        <ul className="mt-8 space-y-16">
          {releases.map((r) => (
            <li key={r.id} className="border border-white/10 bg-white/[0.03] p-5">
              <div className="flex gap-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-white/10">
                  <Image
                    src={r.coverImage}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="min-w-0 text-sm text-white/70">
                  <p className="font-medium text-white">
                    {r.title} ({r.year})
                  </p>
                  {r.awardText ? <p className="mt-1">{r.awardText}</p> : null}
                </div>
              </div>

              <form
                action={updateRelease}
                encType="multipart/form-data"
                className="mt-6 grid gap-3 sm:grid-cols-2"
              >
                <input type="hidden" name="id" value={r.id} />
                <div>
                  <label className={labelClass} htmlFor={`title-${r.id}`}>
                    Title
                  </label>
                  <input
                    id={`title-${r.id}`}
                    className={`mt-1 ${inputClass}`}
                    name="title"
                    defaultValue={r.title}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor={`year-${r.id}`}>
                    Year
                  </label>
                  <input
                    id={`year-${r.id}`}
                    className={`mt-1 ${inputClass}`}
                    name="year"
                    type="number"
                    defaultValue={r.year}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor={`award-${r.id}`}>
                    Award / badge text
                  </label>
                  <input
                    id={`award-${r.id}`}
                    className={`mt-1 ${inputClass}`}
                    name="awardText"
                    defaultValue={r.awardText ?? ""}
                    placeholder="Optional"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor={`cover-${r.id}`}>
                    New cover image
                  </label>
                  <input
                    id={`cover-${r.id}`}
                    className="mt-1 block w-full text-sm text-white/60 file:mr-3 file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-white"
                    name="cover"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor={`platforms-${r.id}`}>
                    Platform links (JSON)
                  </label>
                  <textarea
                    id={`platforms-${r.id}`}
                    className={`mt-1 min-h-[120px] font-mono text-xs ${inputClass}`}
                    name="platforms"
                    defaultValue={JSON.stringify(r.platforms, null, 2)}
                    required
                  />
                </div>
                <div className="flex flex-wrap gap-3 sm:col-span-2">
                  <button
                    type="submit"
                    className="border border-white/25 bg-white/[0.08] px-4 py-2 text-sm text-white hover:bg-white/15"
                  >
                    Save release
                  </button>
                </div>
              </form>
              <form action={deleteRelease} className="mt-3">
                <input type="hidden" name="id" value={r.id} />
                <button
                  type="submit"
                  className="text-xs font-medium uppercase tracking-wide text-red-400 hover:text-red-300"
                >
                  Delete release
                </button>
              </form>
            </li>
          ))}
        </ul>

        <h3 className="mt-14 text-sm font-medium text-white/70">Add release</h3>
        <form action={addRelease} encType="multipart/form-data" className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="new-title">
              Title
            </label>
            <input
              id="new-title"
              className={`mt-1 ${inputClass}`}
              name="title"
              required
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="new-year">
              Year
            </label>
            <input
              id="new-year"
              className={`mt-1 ${inputClass}`}
              name="year"
              type="number"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="new-award">
              Award / badge text
            </label>
            <input
              id="new-award"
              className={`mt-1 ${inputClass}`}
              name="awardText"
              placeholder="Optional"
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="new-cover">
              Cover image
            </label>
            <input
              id="new-cover"
              className="mt-1 block w-full text-sm text-white/60 file:mr-3 file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-white"
              name="cover"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="new-platforms">
              Platform links (JSON)
            </label>
            <textarea
              id="new-platforms"
              className={`mt-1 min-h-[120px] font-mono text-xs ${inputClass}`}
              name="platforms"
              placeholder='[{"label":"YouTube","url":"https://..."}]'
              defaultValue="[]"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="border border-white/25 bg-white/[0.08] px-4 py-2 text-sm text-white hover:bg-white/15"
            >
              Add release
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
