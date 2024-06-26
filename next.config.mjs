// const api = "http://192.168.101.112:8080/";
// const api = "https://it-hub.fita.cc/";
const api = "https://api.student-hub.site/";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: api,
  },
  images: {
    domains: [
      "pixelbox.ru",
      "distribution.faceit-cdn.net",
      "it-hub.s3.us-east-005.backblazeb2.com",
      "inpit.sstu.ru",
    ],
  },
};

export default nextConfig;
