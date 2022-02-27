module.exports = {
  siteMetadata: {
    defaultTitle: "paigevogie.com",
    titleTemplate: "%s | paigevogie.com",
    defaultDescription: "The portfolio and blog of Paige Vogenthaler.",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `paige-vogenthaler`,
        short_name: `paige-vogenthaler`,
        start_url: `/`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/Layout.jsx"),
        },
      },
    },
  ],
};
