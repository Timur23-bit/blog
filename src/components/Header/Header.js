import React from 'react';
import { Link, withRouter } from "react-router-dom";
import './Header.css';

function Header ({updateUser, user, history}) {
	let username;
	let img;
	let profile;

	if (user) {
		username = user.username;
		img = user.image;
	}


	function imgCorrection(image) {
		if (image) {
			return <img className={'avatar'} src={img} alt={'Avatar'}/>
		}
		return <div className={'no-avatar'}>No avatar</div>
	}

	if (username) {
		profile = (
		<div className={'header__profile'}>
			<button className={'btn__createArticle'}><Link to={'/'}>Create article</Link></button>
			<div className={'header__username'}><Link to={'/profile'}>{username}</Link></div>
			<div>{imgCorrection(img)}</div>
			<button
				onClick={() => {
				sessionStorage.clear();
				history.push('/');
				updateUser('');
			}}
				className={'btn__logOut'}>Log out</button>
		</div>
	);
	}
	const headerAuthor = <div>
		<button className={'btn header__signIn'}>
			<Link to={'/sign-in'}>Sign In</Link>
		</button>
		<button className={'btn header__signUp'}>
			<Link to={'/sign-up'}>Sing Up</Link>
		</button>
	</div>;

	const render = sessionStorage.getItem('user') ? profile : headerAuthor;



	return (
		<div className={'header'}>
			<div className={'title'}>
				<Link to={'/'}>Realworld Blog</Link>
			</div>
			<div className={'header__author'}>
				{render}
			</div>
		</div>
	);
}

export default withRouter(Header);