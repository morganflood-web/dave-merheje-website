export const dynamic = 'force-dynamic';

import { getBio } from '@/lib/data';
import { updateBio } from '@/lib/actions/bio';
import BioClient from './BioClient';

export default async function BioPage() {
  const bio = await getBio();
  return <BioClient bio={bio} updateBio={updateBio} />;
}
