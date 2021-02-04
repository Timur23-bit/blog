import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ReactDom from 'react-dom';
import './Header.css';

export default function Header () {
	return (
		<div className={'header'}>
			<div className={'title'}>
				<Link to={'/'}>Realworld Blog</Link>
			</div>
			<div className={'header__author'}>
				<button className={'btn header__signIn'}>
					Sign In
				</button>
				<button className={'btn header__signUp'}>
					Sing Up
				</button>
			</div>
		</div>
	);
}