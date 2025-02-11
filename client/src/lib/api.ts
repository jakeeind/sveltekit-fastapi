import { PUBLIC_API_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

interface FetchResponse {
	data?: unknown;
	error?: unknown;
	response?: Response;
}

export async function apiFetch(
	endpoint: string,
	options: RequestInit = {}
): Promise<FetchResponse> {
	const url = `${PUBLIC_API_URL}${endpoint}`;
	const defaultHeaders = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${localStorage.getItem('token') || ''}`
	};

	const config: RequestInit = {
		headers: { ...defaultHeaders, ...options.headers },
		...options
	};

	try {
		const res = await fetch(url, config);
		if (!res.ok) {
			const data = await res.json();
			return {
				error: data.detail,
				response: res
			};
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
			response: new Response(null, { status: 503 })
		};
	}
}

export async function safeFetch<T>(callback: () => Promise<T>) {
	try {
		return await callback();
	} catch (err) {
		console.error('API Error:', err);
		return {
			error: err,
			response: new Response(null, { status: 503 })
		};
	}
}
