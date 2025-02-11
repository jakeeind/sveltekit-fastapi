# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.


# Client API Documentation

## `apiFetch`

The `apiFetch` function is an asynchronous function used to make HTTP requests to the API.

### Parameters

- `endpoint` (string): The API endpoint to which the request is made.
- `options` (RequestInit): Optional configuration for the request, such as method, headers, body, etc.

### Returns

A promise that resolves to an object containing:
- `data`: The response data if the request was successful, otherwise `null`.
- `errors`: Any errors that occurred during the request, otherwise `null`.
- `response`: The full response object if the request was successful, otherwise `null`.

### Example Usage

```typescript
import apiFetch from './src/lib/api';

async function fetchData() {
  const result = await apiFetch('/example-endpoint');
  if (result.errors) {
    console.error('Error fetching data:', result.errors);
  } else {
    console.log('Data fetched successfully:', result.data);
  }
}

fetchData();
```

### Error Handling

If the request fails, the function will log the error to the console and return an object with `data` set to `null`, `errors` containing the error, and `response` set to `null`.
