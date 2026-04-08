import { execSync } from "child_process";

export default {
  async fetch() {

    try {
      const out = execSync("ffmpeg -version").toString();
      return new Response(out);
    } catch(e){
      return new Response("FFmpeg NOT installed");
    }

  }
};
