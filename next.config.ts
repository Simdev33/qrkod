import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // A gyökér-layout a [lang] szegmensben van, ezért a nyelven kívüli ismeretlen címekhez külön 404 kell.
    globalNotFound: true,
  },
  async redirects() {
    return [
      // Az első változat szünet-oldala: a rövid link maga dönti el, hová (és milyen nyelven) visz.
      { source: "/q/:code/szunetel", destination: "/q/:code", permanent: true },
    ];
  },
};

export default nextConfig;
