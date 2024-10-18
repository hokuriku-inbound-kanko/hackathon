import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";

// https://hokuriku-inbound-kanko−hackathon.deno.dev/
const USERNAME = "hokuriku";
const PASSWORD = "inbound";

Deno.serve((req) => {
  const auth = req.headers.get("Authorization");
  if (auth !== `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`) {
    const headers = new Headers({ "WWW-Authenticate": 'Basic realm="Fake Realm"', });
    return new Response("Unauthorized", { status: 401, headers });
  }
  return serveDir(req, { fsRoot: "./" });
});