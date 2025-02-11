import { api } from '$lib/api';
import * as sdk from '$lib/client/sdk.gen';
import { client } from '$lib/client/client.gen';
import type { PageServerLoad } from './$types';
export const load = (async () => {
  const result = await sdk.readItem({ client, path: { item_id: 2 } });
  console.log(result);
}) satisfies PageServerLoad;