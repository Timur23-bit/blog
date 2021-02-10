import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { withRouter } from 'react-router-dom';
import Spint from '../Spin/Spin';
import informs from '../../resourse/Service/Service';
import like from '../../resourse/Vector.svg';
import vector from '../../resourse/Vector1.svg';
import './Article.css';

function Article({ slug, user, history }) {
  const [article, setArticle] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const toolTips = deleted ? (
    <div className={'toolTips'}>
      <div className={'arrow'} />
      <div className={'toolTips__img'}>
        <img src={vector} alt={'!'} />
        <div className={'toolTips__title'}>
          Are you sure to delete this article?
        </div>
      </div>
      <div className={'toolTips__btn'}>
        <button className={'btn__no'} onClick={() => setDeleted(false)}>
          No
        </button>
        <button className={'btn__yes'} onClick={postDeleted}>
          Yes
        </button>
      </div>
    </div>
  ) : null;

  function onDelete() {
    setDeleted(true);
  }

  async function postDeleted() {
    await informs.deleteArticle(slug, user.token);
    history.push('/');
  }

  function onEdit() {
    history.push(`/articles/${slug}/edit`);
  }

  const editOrDelete =
    article && user.username === article.author.username ? (
      <div className={'profile__articleBtn articleBtn'}>
        <button className={'articleBtn articleBtn__delete'} onClick={onDelete}>
          Delete
        </button>
        <button className={'articleBtn articleBtn__edit'} onClick={onEdit}>
          Edit
        </button>
        {toolTips}
      </div>
    ) : null;

  function getArt() {
    if (!article && !error) {
      informs.getArticle(slug).then((ext) => {
        if (ext.message !== undefined) {
          setError(ext);
          setLoading(false);
        } else {
          setArticle(ext.article);
          setLoading(false);
        }
      });
    }
  }
  getArt();
  function releaseDate(date) {
    return format(new Date(date), 'MMMM d, yyyy');
  }

  function render() {
    if (error) {
      return <div>{error.message}</div>;
    }
    if (loading && !article) {
      return <Spint />;
    }
    return (
      <div id={'layout'}>
        <div className={'article'}>
          <div className={'listItem article__listItem'}>
            <div className={'listItem__title'}>
              <div className={'title__left'}>
                <div className={'title__text'}>{article.title}</div>
                <div className={'listItem__like'}>
                  <img src={like} alt={'like'} /> {article.favoritesCount}
                </div>
              </div>
              <div className={'listItem__profile profile'}>
                <div className={'profile__data'}>
                  <div className={'profile__name'}>
                    {article.author.username}
                  </div>
                  <div className={'profile__date'}>
                    {releaseDate(article.updatedAt)}
                  </div>
                </div>
                <img
                  className={'avatar'}
                  src={article.author.image}
                  alt={'Avatar'}
                />
                {editOrDelete}
              </div>
            </div>
            {article.tagList.map((tag) => (
              <div className={'listItem__tag article__tag'} key={tag}>
                {tag}
              </div>
            ))}
            <div className={'listItem__description article__description'}>
              {article.description}
            </div>
            <div className={'article__text'}>
              <div className={'article__body'}>
                <ReactMarkdown>{article.body}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return render();
}

export default withRouter(Article);
