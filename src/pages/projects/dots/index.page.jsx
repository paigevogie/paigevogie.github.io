import Layout from "../../components/Layout";
import styles from "./index.module.scss";

const Ring = () => <div className="ring"></div>;

const Dots = (props) => (
  <Layout className={styles.dots} title="Dots" {...props}>
    <div className="rings">
      {Array(12)
        .fill(0)
        .map((item, index) => (
          <Ring key={index} />
        ))}
    </div>
  </Layout>
);

export default Dots;
