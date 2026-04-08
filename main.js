export default {
  async fetch(request) {

    return new Response(
      await fetch(new URL("./index.html", import.meta.url)).then(r=>r.text()),
      {
        headers: {
          "content-type": "text/html"
        }
      }
    );

  }
};
