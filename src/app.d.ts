// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}

    interface Locals {
      svelxios: Client
    }
  
		// interface PageData {}
		// interface Platform {}
	}
}


interface Response {
  ok: boolean;
  status: number;
  data: any;
}

interface Client {
  GET: (endpoint: string, body?: object, headers?: any) => Promise<Response>;
  POST: (endpoint: string, body?: object, headers?: any) => Promise<Response>;
  PUT: (endpoint: string, body?: object, headers?: any) => Promise<Response>;
  PATCH: (endpoint: string, body?: object, headers?: any) => Promise<Response>;
  DELETE: (endpoint: string, body?: object, headers?: any) => Promise<Response>;
}
  
export {};
