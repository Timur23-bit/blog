import React, { useState, useEffect } from 'react';
import { Pagination } from "antd";
import ListItem from "../ListItem/ListItem";
import 'antd/dist/antd.css';
import './List.css';
import informs from "../../resourse/Service/Service";
import Spint from "../Spin/Spin";

export default function List({user}) {
	const [ listArticles, setListArticles ] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	let token='';
	if (user) {
		token = user.token;
	}
	let render;
	const getCurrentArticleList = (currentPage, pageSize) => {
		informs.getArticles(pageSize, (currentPage-1)*pageSize, token).then(ext => {
			if (ext.message !== undefined) {
				setError(ext.message);
				setLoading(false);
			} else {
				setListArticles(ext.articles);
				setLoading(false);
			}
		})
	};


	useEffect(()=>{
		informs.getArticles(5, 0, token).then(ext => {
			if (ext.message !== undefined) {
				setError(ext);
				setLoading(false);
			} else {
				setListArticles(ext.articles);
				setLoading(false);
			}
		});
	}, []);

	if (!error ) {
		render = listArticles.length === 0 && loading ? <Spint/> : <div className="list">
			{listArticles.map((item, i) => <ListItem item={item} user={user} key={item.slug}/>)}
			<div className={'pagination'}>
				<Pagination defaultCurrent={1} total={500} pageSize={5} onChange={(currentPage, pageSize) => {
					getCurrentArticleList(currentPage, pageSize);
				}}/>
			</div>
		</div>;
	}

	const err = error ?  <div>{error.message}</div> : render;
	return err;
}