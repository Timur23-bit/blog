import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import likeFalse from '../../resourse/Vector.svg';
import likeTrue from '../../resourse/path4qwe.svg';
import './ListItem.css';
import informs from '../../resourse/Service/Service';

export default function ListItem({ item, user }) {
  const { favorited, favoritesCount, tagList, title, description, slug } = item;
  const [favorit, setFavorit] = useState(favorited);
  const [favoritCount, setFavoritCount] = useState(favoritesCount);
  function updateDate(date) {
    return format(new Date(date), 'MMMM d, yyyy');
  }

  function like(liked) {
    if (liked) {
      return likeTrue;
    }
    return likeFalse;
  }

  async function unFavorited(favor) {
    if (favor) {
      await informs.unfavoriteArticle(slug, user.token);
      setFavorit(false);
      setFavoritCount(favoritCount - 1);
    } else {
      await informs.favoriteArticle(slug, user.token);
      setFavorit(true);
      setFavoritCount(favoritCount + 1);
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
