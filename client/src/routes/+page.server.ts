import * as sdk from '$lib/client/sdk.gen';
import { client } from '$lib/client/client.gen';
import type { PageServerLoad } from './$types';
import { safeFetch } from '$lib/api';

export const load = (async () => {
  const result = await safeFetch(() => sdk.readItem({ client, path: { item_id: 1 } }));
  console.log(result?.data);
}) satisfies PageServerLoad;