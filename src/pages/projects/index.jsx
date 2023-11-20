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
  {
    title: "Training Log",
    href: "/projects/training-log",
    description: "Data visualization",
  },
];

const Projects = (props) => (
  <Layout className={styles.projects} title="Projects" {...props}>
    <ul>
      {projectsList.map(({ href, title, description }) => (
        <li key={href}>
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
