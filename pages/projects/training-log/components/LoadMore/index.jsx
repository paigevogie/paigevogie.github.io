import { useState } from "react";
import styles from "./index.module.scss";

const LoadMore = ({ activities, setActivities }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(true);

  const loadMore = async () => {
    const newActivities = await (
      await fetch(`${process.env.HOST}/api/activities?page=${currentPage + 1}`)
    ).json();

    if (!!newActivities?.length) {
      setActivities([...activities, ...newActivities]);
      setCurrentPage(currentPage + 1);
    } else {
      setShowLoadMore(false);
    }
  };

  return showLoadMore ? (
    <div className={styles.loadMoreContainer}>
      <button onClick={loadMore}>Load More</button>
    </div>
  ) : null;
};

export default LoadMore;
