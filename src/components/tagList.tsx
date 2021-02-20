import React from "react";

interface IProps {
  tags: string[];
}

export const TagList = ({ tags }: IProps): JSX.Element => {
  return (
    <ul className="tag-list">
      {tags.map(
        (tag): JSX.Element => {
          return (
            <li key={tag} className="tag-default tag-pill tag-outline">
              {tag}
            </li>
          );
        }
      )}
    </ul>
  );
};
