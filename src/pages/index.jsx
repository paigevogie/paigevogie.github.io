import Layout from "../components/Layout";
import GitHub from "../components/GitHub";
import Strava from "../components/Strava";
import Libby from "../components/Libby";
import LinkedIn from "../components/LinkedIn";
import styles from "./index.module.scss";
import {
  getGithubData,
  getLibbyData,
  getLinkedInData,
  getStravaData,
} from "../service";
import { config } from "../components/SEO";

export async function getServerSideProps({ res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=59"
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
      <p>
        Find me all over the web <b>@paigevogie</b>.
      </p>
    }
    {...props}
  >
    <div className={styles.embeds}>
      <div>
        <Strava {...{ stravaData }} />
        <Libby {...{ libbyData }} />
        <GitHub {...{ githubData }} />
        <LinkedIn {...{ linkedInData }} />
      </div>
    </div>
  </Layout>
);

export default Home;
