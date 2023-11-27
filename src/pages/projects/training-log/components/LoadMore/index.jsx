import { useState } from "react";
import styles from "./index.module.scss";

const LoadMore = ({ activities, setActivities }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const loadMore = async () => {
    const newActivities = await (
      await fetch(`/api/activities?page=${currentPage + 1}`)
    ).json();

    setActivities([...activities, ...newActivities]);
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className={styles.loadMoreContainer}>
      <button onClick={loadMore}>Load More</button>
    </div>
  );
};

export default LoadMore;
