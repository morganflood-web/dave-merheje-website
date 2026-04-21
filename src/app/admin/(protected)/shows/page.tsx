export const dynamic = 'force-dynamic';

import { getShows } from '@/lib/data';
import { addShow, updateShow, deleteShow } from '@/lib/actions/shows';
import ShowsClient from './ShowsClient';

export default async function ShowsPage() {
  let shows;
  try {
    shows = await getShows();
  } catch (err) {
    return (
      <div style={{ padding: '2rem', color: '#f55', fontFamily: 'monospace' }}>
        <h2>DB Error</h2>
        <pre>{String(err)}</pre>
        <pre>{err instanceof Error ? err.stack : ''}</pre>
      </div>
    );
  }
  return (
    <ShowsClient
      shows={shows}
      addShow={addShow}
      updateShow={updateShow}
      deleteShow={deleteShow}
    />
  );
}
