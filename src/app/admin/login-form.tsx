import { loginAdmin } from "./actions";

export function AdminLoginForm({ showError }: { showError: boolean }) {
  return (
    <div className="mx-auto max-w-sm px-6 py-20">
      <h1 className="text-xl font-semibold text-white">Admin</h1>
      <p className="mt-2 text-sm text-white/50">Sign in to manage shows and releases.</p>
      {showError ? (
        <p className="mt-4 text-sm text-red-400" role="alert">
          Incorrect password.
        </p>
      ) : null}
      <form action={loginAdmin} className="mt-8 space-y-4">
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full border border-white/20 bg-white/[0.06] px-3 py-2.5 text-sm text-white outline-none focus:border-white/40"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="w-full border border-white/30 bg-white py-2.5 text-sm font-medium uppercase tracking-wide text-[#0a0a0a] hover:bg-white/90"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
