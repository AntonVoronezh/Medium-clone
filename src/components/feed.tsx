import React from "react";
import { Link } from "react-router-dom";

import { TagList } from "./tagList";
import { AddToFavorites } from "./addToFavorites";

interface IAuthor {
  username?: string;
  image?: string;
}

export interface IArticle {
  author: IAuthor;
  favorited: boolean;
  favoritesCount: number;
  createdAt: string;
  title: string;
  description: string;
  tagList: string[];
  slug: string;
}

interface IProps {
  articles: IArticle[];
}

export const Feed = ({ articles }: IProps): JSX.Element => {
  return (
    <div>
      {articles.map((article, idx) => {
        return (
          <div className="article-preview" key={idx}>
            <div className="article-meta">
              <Link to={`/profiles/${article.author.username}`}>
                <img src={article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link
                  to={`/profiles/${article.author.username}`}
                  className="author"
                >
                  {article.author.username}
                </Link>
                <span className="date">{article.createdAt}</span>
              </div>
              <div className="pull-xs-right">
                <AddToFavorites
                  isFavorited={article.favorited}
                  favoritesCount={article.favoritesCount}
                  articleSlug={article.slug}
                />
              </div>
            </div>
            <Link to={`/articles/${article.slug}`} className="author">
              <h1>{article.title}</h1>
              <p>{article.description}</p>
              <span>Read more...</span>
              <TagList tags={article.tagList} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};
