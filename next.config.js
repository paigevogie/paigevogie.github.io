const path = require("path");

module.exports = {
  // https://github.com/vercel/next.js/issues/45052#issuecomment-1478022844,
  sassOptions: {
    fiber: false,
    includePaths: [path.join(__dirname, "styles")],
  },
};
