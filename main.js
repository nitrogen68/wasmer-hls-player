export default {
  async fetch(request) {

    const url = new URL(request.url);

    // buka player
    if (!url.searchParams.get("stream")) {
      return new Response(
        await fetch(new URL("./index.html", import.meta.url)).then(r=>r.text()),
        { headers: { "content-type":"text/html"} }
      );
    }

    // proxy stream
    const target = url.searchParams.get("stream");

    const res = await fetch(target, {
      headers:{
        "User-Agent":"Mozilla/5.0",
        "Referer":target
      }
    });

    return new Response(res.body,{
      headers:{
        "Access-Control-Allow-Origin":"*",
        "Content-Type":res.headers.get("content-type") || "application/octet-stream"
      }
    });

  }
};
