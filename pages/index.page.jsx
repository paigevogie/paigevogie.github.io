import GitHub from "./components/GitHub";
import Layout from "./components/Layout";
import Libby from "./components/Libby";
import LinkedIn from "./components/LinkedIn";
import { config } from "./components/SEO";
import Strava from "./components/Strava";
import styles from "./index.module.scss";
import {
  getGithubData,
  getLibbyData,
  getLinkedInData,
  getStravaData,
} from "./service/homeService";

export async function getServerSideProps({ res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=59"
  );

  return {
    props: {
      githubData: await getGithubData(),
      libbyData: await getLibbyData(),
      linkedInData: await getLinkedInData(),
      stravaData: await getStravaData(),
    },
  };
}

const Home = ({
  githubData,
  stravaData,
  libbyData,
  linkedInData,
  ...props
}) => (
  <Layout
    title="Hello!"
    seoTitle={config.defaultTitle}
    subtitle={
      <p className={styles.subtitle}>
        Find me all over the web <b>@paigevogie</b>.
      </p>
    }
    className={styles.embeds}
    {...props}
  >
    <div>
      <GitHub {...{ githubData }} />
      <Libby {...{ libbyData }} />
      <Strava {...{ stravaData }} />
      <LinkedIn {...{ linkedInData }} />
    </div>
  </Layout>
);

export default Home;
