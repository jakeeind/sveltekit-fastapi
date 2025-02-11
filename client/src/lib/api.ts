import { PUBLIC_API_URL } from "$env/static/public";

export default async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${PUBLIC_API_URL}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  };

  const config: RequestInit = {
    method: 'GET',
    headers: { ...defaultHeaders, ...options.headers },
    ...options,
  };

  try {
    const res = await fetch(url, config);
    if (!res.ok) {
      const data = await res.json();
      return {
        data: null,
        errors: data.detail,
        response: res
      }
    }
    const data = await res.json();
    return {
      data: data,
      errors: null,
      response: res
    };
  } catch (error) {
    console.error('API Fetch Error:', error);
    return {
      data: null,
      errors: error,
      response: null
    }
  }
}