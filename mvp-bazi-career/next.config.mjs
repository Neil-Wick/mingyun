/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ★ 关键改动：输出纯静态站点（Static Site Export）
  // 好处：不需要 Node 服务器，任何静态托管平台都能直接部署
  //       （Netlify Drop / Cloudflare Pages / GitHub Pages 等）
  // 代价：无法使用 Next.js API Routes / Server Components / ISR
  //       —— 但本 MVP 的排盘 100% 在浏览器里运行，所以完全满足
  output: "export",

  // 静态 Export 模式下必须关闭图像优化（否则构建会报错）
  images: {
    unoptimized: true,
  },

  // 静态站点部署在子路径（比如 GitHub Pages：user.github.io/repo-name）
  // 时需要把下面两行的注释去掉，把 basePath 改成你的仓库名
  // basePath: "/mvp-bazi-career",
  // assetPrefix: "/mvp-bazi-career/",

  trailingSlash: true, // 让生成的路由以 /xxx/index.html 的形式，静态托管兼容性更好
};

export default nextConfig;
