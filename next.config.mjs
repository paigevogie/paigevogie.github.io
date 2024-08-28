const config = {
  // Set page extension so we can have components and utils in the /pages directory
  // https://nextjs.org/docs/pages/api-reference/next-config-js/pageExtensions#including-non-page-files-in-the-pages-directory
  pageExtensions: ["page.jsx"],
  sassOptions: {
    prependData: `@use "@/styles/_vars" as *;`,
  },
};

export default config;
