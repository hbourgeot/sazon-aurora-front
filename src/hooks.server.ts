
import { env } from "$env/dynamic/private";
import { client } from "$lib/server/auth";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const debug=env.debug=="debug"
  

const clientHandler: Handle=async ({event, resolve}) => {
  event.locals.svelxios={
    "GET":async(endpoint:string,body?:object, headers?:any)=>await client(event,endpoint,"GET",body,headers,debug),
    "POST":async(endpoint:string,body?:object, headers?:any)=>await client(event,endpoint,"POST",body,headers,debug),
    "PUT":async (endpoint:string,body?:object, headers?:any)=>await client(event,endpoint,"PUT",body,headers,debug),
    "PATCH":async (endpoint:string,body?:object, headers?:any)=> await client(event,endpoint,"PATCH",body,headers,debug),
    "DELETE":async (endpoint:string,body?:object, headers?:any)=> await client(event,endpoint,"DELETE",body,headers,debug)
  }

  return await resolve (event)
}

const trackers: Handle=async ({event, resolve}) => {
  return await resolve (event)
}

export const handle = sequence(clientHandler, trackers);
  