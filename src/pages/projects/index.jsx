import Layout from "../../components/Layout";
import Link from "next/link";
import styles from "./index.module.scss";

const projectsList = [
  {
    title: "Bubbles",
    href: "/projects/bubbles",
    description: "Fun with randomness",
  },
  {
    title: "Dots",
    href: "/projects/dots",
    description: "CSS animations",
  },
];

const Projects = (props) => (
  <Layout
    className={styles.projects}
    title="Projects."
    seoTitle="Projects"
    {...props}
  >
    <ul>
      {projectsList.map(({ href, title, description }) => (
        <li>
          <Link href={href}>
            <p>{title}</p>
            <small>{description}</small>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

export default Projects;
