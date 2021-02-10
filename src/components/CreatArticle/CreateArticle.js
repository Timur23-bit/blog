import './CreateArticle.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import informs from '../../resourse/Service/Service';

function CreateArticle({ user, history }) {
  const { register, errors, handleSubmit } = useForm();
  // eslint-disable-next-line no-unused-vars
  const [tagList, setTagList] = useState([]);

  function TagList({ tag }) {
    return (
      <div className={'tag'}>
        <button
          className="btn__tag tags"
          value={`${tag}`}
          onClick={(event) => event.preventDefault()}
        >
          {tag}
        </button>
        <button
          className="btn__delete"
          onClick={(event) => {
            event.preventDefault();
            onDeleted(event);
          }}
        >
          Delete
        </button>
      </div>
    );
  }

  function onDeleted(event) {
    const currentTag = event.target.parentElement.firstChild.value;
    const prevTagList = tagList.slice(0, tagList.length);
    const indexDelete = prevTagList.indexOf(currentTag);
    prevTagList.splice(indexDelete, 1);
    setTagList([...prevTagList]);
  }

  function onAddTag(event) {
    if (
      event.target.parentElement.firstChild.value &&
      !tagList.includes(event.target.parentElement.firstChild.value)
    ) {
      setTagList([...tagList, event.target.parentElement.firstChild.value]);
      // eslint-disable-next-line no-param-reassign
      event.target.parentElement.firstChild.value = '';
    }
  }

  function clearInput(event) {
    // eslint-disable-next-line no-param-reassign
    event.target.parentElement.firstChild.value = '';
  }

  function tagRender(tagLi) {
    return tagLi.map((item, i) => <TagList tag={item} key={i} />);
  }

  function errorInput(error) {
    if (error) {
      return 'createNewArticle__input input inputError';
    }
    return 'createNewArticle__input input';
  }

  const onSubmit = async (data) => {
    const article = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: tagList.length !== 0 ? tagList : '',
      },
    };
    await informs.setArticle(article, user.token);
    history.push('/');
  };

  return (
    <div className={'wrapper'}>
      <div className={'createNewArticle'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={'createNewArticle__title'}>Create new article</div>
          <label>
            <p>Title</p>
            <input
              className={errorInput(errors.title)}
              name="title"
              ref={register({ required: true })}
              type="text"
              placeholder={'Title'}
            />
            {errors.title && errors.title.type === 'required' && (
              <div className={'error'}>Title is required</div>
            )}
          </label>
          <label>
            <p>Short description</p>
            <input
              className={errorInput(errors.description)}
              name="description"
              ref={register({ required: true })}
              type="text"
              placeholder={'Title'}
            />
            {errors.description && errors.description.type === 'required' && (
              <div className={'error'}>Short description is required</div>
            )}
          </label>
          <label>
            <p>Text</p>
            <textarea
              className={errorInput(errors.body)}
              name="body"
              ref={register({ required: true })}
              placeholder={'Text'}
              rows={6}
            />
            {errors.body && errors.body.type === 'required' && (
              <div className={'error'}>Text is required</div>
            )}
          </label>
          <label id={'tagList'}>
            <p>Tags</p>
            {tagRender(tagList)}
            <div>
              <input
                className={`${errorInput(errors.tagList)} tags `}
                name="tagList"
                type="text"
                placeholder={'Tag'}
              />
              <button
                className="btn__delete"
                onClick={(event) => {
                  event.preventDefault();
                  clearInput(event);
                }}
              >
                Delete
              </button>
              <button
                className="btn__addTag"
                onClick={(event) => {
                  event.preventDefault();
                  onAddTag(event);
                }}
              >
                Add tag
              </button>
            </div>
          </label>
          <label className={'submit'}>
            <input type="submit" value={'Send'} />
          </label>
        </form>
      </div>
    </div>
  );
}

export default withRouter(CreateArticle);
