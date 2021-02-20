import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ListItem.css';
import informs from '../../resourse/Service/Service';
import { like, styleHeart, updateDate } from '../../resourse/Service/FunctionForArticle'


export default function ListItem({ item, user }) {
  const { tagList, title, description, slug } = item;
  const [favorit, setFavorit] = useState(item.favorited);
  const [favoritCount, setFavoritCount] = useState(item.favoritesCount);

  async function unFavorited(favor) {
    if (user) {
      if (favor) {
        await informs.unfavoriteArticle(slug, user.token).then(result => {
          setFavorit(result.article.favorited);
          setFavoritCount(result.article.favoritesCount);
        });
      } else {
        await informs.favoriteArticle(slug, user.token).then(result => {
          setFavorit(result.article.favorited);
          setFavoritCount(result.article.favoritesCount);
        });
      }
    }
  }

  return (
    <div className={'listItem'} key={item.author.username}>
      <div className={'listItem__title'}>
        <div className={'title__left'}>
          <div className={'title__text'}>
            <Link to={`/articles/${slug}`}> {title} </Link>
          </div>
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
            <div className={'profile__name'}>{item.author.username}</div>
            <div className={'profile__date'}>{updateDate(item.updatedAt)}</div>
          </div>
          <img className={'avatar'} src={item.author.image} alt={'Avatar'} />
        </div>
      </div>
      <div>
        {tagList.map((tag) => (
          <div className={'listItem__tag'} key={tag}>
            {tag}
          </div>
        ))}
      </div>
      <div className={'listItem__description'}>{description}</div>
    </div>
  );
}
