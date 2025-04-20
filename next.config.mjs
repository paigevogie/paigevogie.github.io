const config = {
  // Set page extension so we can have components and utils in the /pages directory
  // https://nextjs.org/docs/pages/api-reference/next-config-js/pageExtensions#including-non-page-files-in-the-pages-directory
  pageExtensions: ["page.jsx"],
  sassOptions: {
    prependData: `@use "@/styles/_vars" as *;`,
  },
  images: {
    // https://nextjs.org/docs/pages/api-reference/components/image#minimumcachettl
    minimumCacheTTL: 2678400, // 31 days
    // https://nextjs.org/docs/app/api-reference/components/image#remotepatterns
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.thestorygraph.com",
      },
      {
        protocol: "https",
        hostname: "api.mapbox.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default config;
