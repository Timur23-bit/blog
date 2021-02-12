import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { withRouter } from 'react-router-dom';
import Spint from '../Spin/Spin';
import informs from '../../resourse/Service/Service';
import vector from '../../resourse/Vector1.svg';
import './Article.css';
import {postDeleted, like, styleHeart, onEdit, updateDate } from '../../resourse/Service/FunctionForArticle';

function Article({ slug, user, history }) {
  const [article, setArticle] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [favorit, setFavorit] = useState(article.favorited);
  const [favoritCount, setFavoritCount] = useState(article.favoritesCount);

  let token= '';
  if (user) {
    token = user.token
  }
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
        <button className={'btn__yes'} onClick={() => postDeleted(slug, token, history)}>
          Yes
        </button>
      </div>
    </div>
  ) : null;

  async function unFavorited(favor) {
    if (user) {
      if (favor) {
      await informs.unfavoriteArticle(slug, token);
      setFavorit(false);
      setFavoritCount(favoritCount - 1);
      } else {
      await informs.favoriteArticle(slug, token);
      setFavorit(true);
      setFavoritCount(favoritCount + 1);
      }
    }
  }


  const editOrDelete =
    user && article && user.username === article.author.username ? (
      <div className={'profile__articleBtn articleBtn'}>
        <button className={'articleBtn articleBtn__delete'} onClick={() => setDeleted(true)}>
          Delete
        </button>
        <button className={'articleBtn articleBtn__edit'} onClick={() => onEdit(history, slug)}>
          Edit
        </button>
        {toolTips}
      </div>
    ) : null;

  function getArt() {
    if (!article && !error) {
       informs.getArticle(slug, token).then((ext) => {
        if (ext.message !== undefined) {
          setError(ext);
          setLoading(false);
        } else {
          setArticle(ext.article);
          setLoading(false);
          setFavoritCount(ext.article.favoritesCount);
          setFavorit(ext.article.favorited);
        }
      });
    }
  }
  getArt();



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
                <div className={'article__titleText title__text'}>{article.title}</div>
                <div className={'listItem__like'}>
                  <img
                    style={styleHeart(user)}
                    onClick={() => unFavorited(favorit)}
                    src={like(favorit)}
                    alt={'like'}
                  />
                  {favoritCount}
                </div>
              </div>
              <div className={'listItem__profile profile'}>
                <div className={'profile__data'}>
                  <div className={'profile__name'}>
                    {article.author.username}
                  </div>
                  <div className={'profile__date'}>
                    {updateDate(article.updatedAt)}
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
