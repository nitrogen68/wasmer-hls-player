export default {
  async fetch(request) {

    try {

      const url = new URL(request.url);

      // ======================
      // OPEN PLAYER
      // ======================
      if (!url.searchParams.get("stream")) {

        console.log("OPEN PLAYER PAGE");

        const html = await fetch(
          new URL("./index.html", import.meta.url)
        ).then(r => r.text());

        return new Response(html,{
          headers:{ "content-type":"text/html" }
        });
      }

      // ======================
      // STREAM PROXY
      // ======================
      const target = url.searchParams.get("stream");

      console.log("STREAM REQUEST:", target);

      if (!target) {
        throw new Error("Stream URL kosong");
      }

      const res = await fetch(target,{
        headers:{
          "User-Agent":"Mozilla/5.0",
          "Referer":target
        }
      });

      console.log("STATUS:", res.status);

      if (!res.ok) {
        console.error("Fetch gagal:", res.status);
      }

      return new Response(res.body,{
        status: res.status,
        headers:{
          "Access-Control-Allow-Origin":"*",
          "Access-Control-Allow-Headers":"*",
          "Access-Control-Allow-Methods":"GET, OPTIONS",
          "Content-Type":
            res.headers.get("content-type")
            || "application/octet-stream"
        }
      });

    } catch (err) {

      // ======================
      // ERROR HANDLER
      // ======================
      console.error("WORKER ERROR:", err.message);

      return new Response(
        JSON.stringify({
          success:false,
          error:err.message
        },null,2),
        {
          status:500,
          headers:{
            "content-type":"application/json",
            "Access-Control-Allow-Origin":"*"
          }
        }
      );
    }
  }
};
