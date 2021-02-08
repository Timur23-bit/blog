import React, { useState } from 'react';
import ReactMarkdown from "react-markdown";
import {format} from "date-fns";
import Spint from "../Spin/Spin";
import informs from "../../resourse/Service/Service";

import like from "../../resourse/Vector.svg";
import photo from "../../resourse/Rectangle 1.png";
import './Article.css';

export default function Article ({slug}) {
	const [article, setArticle] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	let render;
	if (!article && !error) {
		informs.getArticle(slug).then(ext => {
			if (ext.message !== undefined) {
				setError(ext);
				setLoading(false);
			} else {
				setArticle(ext.article);
				setLoading(false);
			}
		});
	}
	function releaseDate (date) {
		return format(new Date(date), 'MMMM d, yyyy');
	}

	if (!error) {
		render = loading && !article? <Spint/> : <div className={'article'}>
			<div className={'listItem article__listItem'}>
				<div className={'listItem__title'}>
					<div className={'title__left'} >
						<div className={'title__text'}>{article.title}</div>
						<div className={'listItem__like'}>
							<img src={like}  alt={'like'}/> {article.favoritesCount}
						</div>
					</div>
					<div className={'listItem__profile profile'}>
						<div className={'profile__data'}>
							<div className={'profile__name'}>{article.author.username}</div>
							<div className={'profile__date'}>{releaseDate(article.updatedAt)}</div>
						</div>
						<img src={photo} alt={'Avatar'}/>
					</div>
				</div>
				{article.tagList.map((tag) => (
						<div className={'listItem__tag'} key={tag}>
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
		</div>;
	}

	return error ? <div>{error.message}</div> : render;
}