import { PUBLIC_API_URL } from "$env/static/public";

interface FetchResponse {
  data?: any;
  error?: any;
  response?: Response;
}

export async function apiFetch(endpoint: string, options: RequestInit = {}): Promise<FetchResponse> {
  const url = `${PUBLIC_API_URL}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  };

  const config: RequestInit = {
    headers: { ...defaultHeaders, ...options.headers },
    ...options,
  };

  try {
    const res = await fetch(url, config);
    if (!res.ok) {
      const data = await res.json();
      return {
        error: data.detail,
        response: res
      }
    }
    const data = await res.json();
    return {
      data: data,
      response: res
    };
  } catch (err) {
    console.error('API Fetch Error:', err);
    return {
      error: err,
    }
  }
}

// import createClient from "openapi-fetch";
// import type { paths } from "./openapi-schema";

// export const api = createClient<paths>({
//   baseUrl: PUBLIC_API_URL,
// })

// export async function safeApiRequest<T>(
//   callback: () => Promise<T>,
//   fallback?: T
// ) {
//   try {
//     return await callback();
//   } catch (error) {
//     console.error('API Error:', error);
//     return fallback;
//   }
// }

import { createClient } from "@hey-api/client-fetch";

export const api = createClient({
  baseUrl: PUBLIC_API_URL,
})