/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      backend_url:
        process.env.NODE_ENV === "production"
          ? "https://api.zaman.group/"
          : "https://api.zaman.group/",
          // : "https://api.agency.appstick.com.bd/"
      // socket_url:
      //   process.env.NODE_ENV === "production"
      //     ? "http://192.168.0.178:5000/"
      //     : "http://192.168.0.178:5000/",
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "appstick.s3.ap-southeast-1.amazonaws.com",
        },
        {
          protocol: "http",
          hostname: "192.168.0.178",
        },
        {
          protocol: "http",
          hostname: "localhost",
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  
