const PROXY_CONFIG = [
  {
    context: [
      "/vehicle",
    ],
    target: "https://localhost:7018",
    secure: false,
    changeOrigin: true
  }
]

module.exports = PROXY_CONFIG;
