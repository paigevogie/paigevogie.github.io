module.exports = {
    siteMetadata: {
        title: "Paige Vogenthaler",
        titleTemplate: "%s · Software Engineer",
        description: "The blog and portfolio of Paige Vogenthaler.",
        url: "https://www.paigevogie.com",
        image: "/images/snape.jpg" // Path to your image you placed in the 'static' folder
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
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `paige-vogenthaler`,
                short_name: `paige-vogenthaler`,
                start_url: `/`,
                icon: `src/assets/favicon.png`,
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-148896184-1",
                head: true,
            },
        },
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                defaultLayouts: {
                    default: require.resolve('./src/components/BlogLayout.jsx')
                }
            }
        },
    ],
}
