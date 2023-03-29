import React from "react";
import Layout from "../../../components/Layout";
import styles from "./index.module.scss";

const Diagonals = (props) => (
  <Layout title="Diagonals" {...props}>
    <div className={styles.diagonals}>
      <div className="diagonal-1"></div>
      <div className="diagonal-2"></div>
      <div className="diagonal-3"></div>
      <div className="diagonal-4"></div>
      <div className="diagonal-5"></div>
    </div>
  </Layout>
);

export default Diagonals;