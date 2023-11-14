import React from "react";
import Head from "next/head";
import { usePathname } from "next/navigation";

export const config = {
  defaultTitle: "Paige Vogie",
  defaultDescription: "The portfolio and blog of Paige Vogie (@paigevogie).",
  siteURL: "https://paigevogie.com",
};

const SEO = (props) => {
  const title =
    props.title === config.defaultTitle
      ? props.title
      : `${props.title} | Paige Vogie`;
  const description = props.description || config.defaultDescription;
  const canonical = `${config.siteURL}${usePathname()}`;

  return (
    <Head>
      <title>{title}</title>
      <link rel="canonical" href={canonical} />
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta
        property="og:image"
        // linkedin profile pic
        content="https://media.licdn.com/dms/image/D5603AQHFjNT527uGVA/profile-displayphoto-shrink_400_400/0/1693941114473?e=1705536000&v=beta&t=OF1vnZyolU9Xz2btbjxeVcRdOD5qu5ldQ9C7V4nCGo8"
      />
    </Head>
  );
};

export default SEO;
