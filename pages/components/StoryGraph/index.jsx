import styles from "./index.module.scss";

const StoryGraph = ({ storygraphData }) => (
  <div className={styles["storygraph-embed"]}>
    <div>Recently Read</div>
    <ul>
      {storygraphData.books.map(({ title, author, img }) => (
        <li key={`${title}${author}`}>
          <img src={img} alt={title} />
          <div>
            <div>{title}</div>
            <small>{author}</small>
          </div>
      </li>
      ))}
    </ul>
  </div>
);

export default StoryGraph;
