module.exports = {
  siteMetadata: {
    defaultTitle: "Paige Vogie",
    titleTemplate: "%s | Paige Vogie",
    defaultDescription: "The portfolio and blog of Paige Vogie (@paigevogie).",
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
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/blog`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `paige-vogie`,
        short_name: `paige-vogie`,
        start_url: `/`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
    },
  ],
};
