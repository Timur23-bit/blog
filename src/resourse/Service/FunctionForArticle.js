import {format} from "date-fns";
import likeTrue from "../path4qwe.svg";
import likeFalse from "../Vector.svg";
import informs from "./Service";


export function like(liked) {
	if (liked) {
		return likeTrue;
	}
	return likeFalse;
}

// eslint-disable-next-line consistent-return
export function styleHeart (user) {
	if (user) {
		return {cursor: 'pointer'}
	}
}

export async function postDeleted(slug, token, history) {
	await informs.deleteArticle(slug, token);
	history.push('/');
}

export function onEdit(history, slug) {
	history.push(`/articles/${slug}/edit`);
}

export function updateDate(date) {
	return format(new Date(date), 'MMMM d, yyyy');
}

export function minify(text) {
	return `${text.slice(0, text.indexOf(' ', 40))}...`;
}