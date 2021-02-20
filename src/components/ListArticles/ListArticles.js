import React, { useState, useEffect } from 'react';
import { Pagination } from "antd";
import ListItem from "../ListItem/ListItem";
import 'antd/dist/antd.css';
import './ListArticles.css';
import informs from "../../resourse/Service/Service";
import Spint from "../Spin/Spin";

export default function ListArticles({user}) {
	const [ listArticles, setListArticles ] = useState([]);
	const [ currentPages, setCurrentPages ] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const getCurrentArticleList = (currentPage, pageSize) => {
		setLoading(true);
		setCurrentPages(currentPage);
		informs.getArticles(pageSize, (currentPage-1)*pageSize, user && user.token).then(ext => {
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
		informs.getArticles(15, 0, user && user.token).then(ext => {
			if (ext.message !== undefined) {
				setError(ext);
				setLoading(false);
			} else {
				setListArticles(ext.articles);
				setLoading(false);
			}
		});
	}, []);

	function render () {
		return loading ? <Spint/> : <div className="list">
			{listArticles.map((item, i) => <ListItem item={item} user={user} key={item.slug}/>)}
			<div className={'pagination'}>
				<Pagination current={currentPages} total={500} pageSize={15} onChange={(currentPage, pageSize) => {
					getCurrentArticleList(currentPage, pageSize);
				}}/>
			</div>
		</div>;
	}

	const err = error ?  <div>{error.message}</div> : render();
	return err;
}