// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { AxiosInstance } from "axios";
  
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}

    interface Locals {
      svelxios: AxiosInstance;
      user: User
    }
  
		// interface PageData {}
		// interface Platform {}
	}
}

interface User {
    id: number;
    email: string;
    name: string;
    role: number;
    document: string;
}

export {};
