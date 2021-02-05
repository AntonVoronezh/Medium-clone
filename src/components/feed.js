import React from "react";
import { Link } from "react-router-dom";

export const Feed = ({ articles }) => {
  return (
    <div>
      {articles.map((article, idx) => {
        return (
          <div className="article-preview" key={idx}>
            <div className="article-meta">
              <Link to={`/profiles/${article.author.username}`}>
                <img src={`${article.author.image}`} />
              </Link>
              <div className="info">
                <Link
                  to={`/profiles/${article.author.username}`}
                  className="author"
                >
                  {article.author.username}`
                </Link>
                <span className="date">{article.createdAt}</span>
              </div>
            </div>
            <Link to={`/articles/${article.slug}`} className="author">
              <h1>{article.title}</h1>
              <p>{article.description}</p>
              <span>Read more...</span>
              <ul className="tag-list">
                {article.tagList.map((tag) => {
                  return (
                    <li key={tag} className="tag-default tag-pill tag-outline">
                      {tag}
                    </li>
                  );
                })}
              </ul>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
