/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        API_URL: process.env.API_URL,
        API_KEY_GEMINI:process.env.API_KEY_GEMINI,
    },
}

module.exports = nextConfig
