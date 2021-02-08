import React from 'react';
import { Link } from "react-router-dom";
import { format } from "date-fns";
import like from '../../resourse/Vector.svg';
import './ListItem.css'


export default function ListItem({item}) {
	const { favoritesCount, tagList, title, description, slug} = item;

	function updateDate (date) {
		return format(new Date(date), 'MMMM d, yyyy');
	}

	return (

			<div className={'listItem'} key={item.author.username}>
			<div className={'listItem__title'}>
				<div className={'title__left'} >
					<div className={'title__text'}><Link to={`/articles/${slug}`}> {title} </Link></div>
					<div className={'listItem__like'}>
						<img src={like}  alt={'like'}/> {favoritesCount}
					</div>
				</div>
				<div className={'listItem__profile profile'}>
					<div className={'profile__data'}>
						<div className={'profile__name'}>{item.author.username}</div>
						<div className={'profile__date'}>{updateDate(item.updatedAt)}</div>
					</div>
					<img className={'avatar'} src={item.author.image} alt={'Avatar'}/>
				</div>
			</div>
			<div>
				{tagList.map((tag) => (
							<div className={'listItem__tag'} key={tag}>
								{tag}
							</div>
						))}
			</div>
			<div className={'listItem__description'}>
				{description}
			</div>
		</div>
	);
}
