const path = require("path");

module.exports = {
  // https://github.com/vercel/next.js/issues/45052#issuecomment-1478022844,
  sassOptions: {
    fiber: false,
    includePaths: [path.join(__dirname, "styles")],
  },
  // Set page extension so we can have components and utils in the /pages directory
  // https://nextjs.org/docs/pages/api-reference/next-config-js/pageExtensions#including-non-page-files-in-the-pages-directory
  pageExtensions: ["page.jsx"],
  env: {
    HOST: process.env.HOST,
  },
};
