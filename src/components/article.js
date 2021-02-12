import React, { useState, useEffect } from "react";
import {ErrorMessage} from "./errorMessage";

export const ArticleForm = ({ onSubmit, errors, initialValues }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [description, setDescription] = useState("");
  const [tagList, setTagList] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({title, body, description, tagList});
  };

  useEffect(() => {
    if (!initialValues) {
      return;
    }

    setTagList(initialValues.tagList.join(' '));
    setBody(initialValues.body);
    setTitle(initialValues.title);
    setDescription(initialValues.description);
  }, [initialValues]);

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {errors && <ErrorMessage errors={errors}/>}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </fieldset>
              </fieldset>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="What is this article about?"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </fieldset>
              </fieldset>
              <fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                  ></textarea>
                </fieldset>
              </fieldset>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter tags"
                    value={tagList}
                    onChange={(event) => setTagList(event.target.value)}
                  />
                </fieldset>
              </fieldset>
              <fieldset>
                <fieldset className="form-group">
                  <button
                    type="submit"
                    className="btn btn-lg pull-xs-right btn-primary"
                  >
                    Publish Article
                  </button>
                </fieldset>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
