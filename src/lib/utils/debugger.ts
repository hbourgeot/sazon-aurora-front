
export const debuggerInstance = async (
  name: string,
  payload: any,
  response: Response,
  endpoint?: string,
  headers?: any,
  method?: string
) => {
  try {
    let res = response.clone();
    let color = res.ok ? "[1;32m" : "[1;31m";
    let data = "NO RES DATA";

    try {
      data = await res
        .json()
        .then((r) => r)
        .catch((e) => "NO RES DATA");

      console.log(color, method + ": " + endpoint + " " + res.status, "\n", {
        HEADER: headers,
        PAYLOAD: payload,
        RESPONSE: { response: res, data },
      });
    } catch {
      try {
        data = await res
          .text()
          .then((r) => r)
          .catch((e) => "NO RES DATA");

        console.log(color, method + ": " + endpoint + " " + res.status, "\n", {
          HEADER: headers,
          PAYLOAD: payload,
          RESPONSE: { status: res.status, response: res, data },
        });
      } catch (e) {
        console.log("ha ocurrido un error con debugger");
        console.error(method + ": " + endpoint + " ", {
          error: e,
          response,
          status: response.status,
        });
      }
    }
  } catch (e) {
    console.log("ha ocurrido un error con debugger");
    console.error(method + ": " + endpoint + " ", {
      error: e,
      response,
      status: response.status,
    });
  }
};