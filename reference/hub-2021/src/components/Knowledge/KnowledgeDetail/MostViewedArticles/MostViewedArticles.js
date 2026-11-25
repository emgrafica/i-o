import React from "react";

const MostViewedArticles = (props) => {
  const { mostViewedArt, onClickDetail } = props;

  return (
    <article className="block-article-sidebar">
      <h6 className="title-article">Most viewed articles</h6>
      <ul>
        {mostViewedArt.map((item, index) => {
          return (
            <li key={index}>
              <span className="item" onClick={() => onClickDetail(item.kbNumber)}>{item.kbName}</span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export default MostViewedArticles;
