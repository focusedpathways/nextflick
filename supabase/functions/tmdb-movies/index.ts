// tmdb-movies: the only place the TMDB token is used. The browser calls this function and never sees the token.
//   GET (no body)  -> TMDB's list of popular movies (the Browse "Live from TMDB" row)
//   POST { id }    -> one movie with its genres, cast (credits) and release certifications (release_dates)
// The token is the Supabase secret TMDB_READ_ACCESS_TOKEN (TMDB's "API Read Access Token"), sent to TMDB as
// `Authorization: Bearer <token>`.

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } })
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors })

  const token = Deno.env.get("TMDB_READ_ACCESS_TOKEN")
  if (!token) return json({ error: "TMDB token is not set on this function" }, 500)

  let path = "/movie/popular"
  if (req.method === "POST") {
    const { id } = await req.json().catch(() => ({}))
    if (!/^\d+$/.test(String(id ?? ""))) return json({ error: "Send a body like { \"id\": 550 }" }, 400)
    path = `/movie/${id}?append_to_response=credits,release_dates`
  }

  const tmdb = await fetch(`https://api.themoviedb.org/3${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  })
  return new Response(await tmdb.text(), {
    status: tmdb.status,
    headers: { ...cors, "Content-Type": "application/json" },
  })
})
