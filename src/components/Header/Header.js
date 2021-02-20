import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';

function Header({ updateUser, user, history }) {
    function imgCorrection(image) {
    if (image) {
      return (
        <Link to={'/profile'}>
          <img className={'avatar'} src={user && user.image} alt={'Avatar'} />
        </Link>
      );
    }
    return (
      <Link to={'/profile'}>
        <div className={'no-avatar'}>No avatar</div>
      </Link>
    );
  }


   const profile = user ? (
      <div className={'header__profile'}>
        <button className={'btn__createArticle'}>
          <Link to={'/new-article'}>Create article</Link>
        </button>
        <div className={'header__username'}>
          <Link to={'/profile'}>{user && user.username}</Link>
        </div>
        <div>{imgCorrection(user && user.image)}</div>
        <button
          onClick={() => {
            sessionStorage.clear();
            history.push('/');
            updateUser('');
          }}
          className={'btn__logOut'}
        >
          Log out
        </button>
      </div>
    ) : '';

  const headerAuthor = (
    <div>
      <button className={'btn header__signIn'}>
        <Link to={'/sign-in'}>Sign In</Link>
      </button>
      <button className={'btn header__signUp'}>
        <Link to={'/sign-up'}>Sing Up</Link>
      </button>
    </div>
  );

  const render = user ? profile : headerAuthor;

  return (
    <div className={'header'}>
      <div className={'title'}>
        <Link to={'/'}>Realworld Blog</Link>
      </div>
      <div className={'header__author'}>{render}</div>
    </div>
  );
}

export default withRouter(Header);
