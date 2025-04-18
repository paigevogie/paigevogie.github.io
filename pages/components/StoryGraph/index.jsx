import styles from "./index.module.scss";

const StoryGraph = ({ storygraphData }) => (
  <div className={styles["storygraph-embed"]}>
    <div>Recently Read</div>
    <ul>
      {storygraphData.books.map(({ title, author, img, url }) => (
        <li key={`${title}${author}`}>
          <a href={url} target="_blank">
            <img src={img} alt={title} />
            <div>
              <div>{title}</div>
              <small>{author}</small>
            </div>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default StoryGraph;
