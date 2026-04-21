import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import AdminNav from './AdminNav';

export const metadata = {
  title: 'Admin — Dave Merheje',
  robots: 'noindex,nofollow',
};

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect('/admin/login');
  }

  return (
    <div style={styles.shell}>
      <AdminNav />
      <main style={styles.main}>{children}</main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  shell: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    fontFamily: 'system-ui, sans-serif',
    color: '#f0f0f0',
  },
  main: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '2rem 1rem 4rem',
  },
};
