
import {baseUrl} from "$env/static/private"
import type {RequestEvent} from "@sveltejs/kit"
import {debuggerInstance} from "$lib/utils/debugger"

export const client = async (
  event: RequestEvent,
  endpoint: string,
  method: string,
  raw?: object,
  headers?: any,
  debug?: boolean
) => {
  let body = raw ? JSON.stringify(raw) : null;

  let res = await fetch(baseUrl + endpoint, { method, body, headers });

  if (debug) {
    await debuggerInstance("CLIENT", raw, res, endpoint, headers, method);
  }

  if (res.ok) {
    let data = await res.json();
    return { ok: true, status: res.status, data };
  } else {
    let data;
    try {
      data = await res.json();
    } catch (error) {
      data = undefined;
    }
    return {
      ok: false,
      status: res.status,
      data: JSON.stringify(data),
    };
  }
};
  