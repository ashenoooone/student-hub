const api = "http://192.168.101.112:8080/";
// const api = "https://it-hub.fita.cc/"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: api,
  },
  images: {
    domains: ["pixelbox.ru", "distribution.faceit-cdn.net"],
  },
};

export default nextConfig;
