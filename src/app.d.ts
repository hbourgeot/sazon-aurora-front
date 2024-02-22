// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { AxiosInstance } from "axios";
  

import { AxiosInstance } from "axios";
  
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}

    interface Locals {
      svelxios: AxiosInstance;
    }
  

    interface Locals {
      svelxios: AxiosInstance;
    }
  
		// interface PageData {}
		// interface Platform {}
	}
}


export {};
