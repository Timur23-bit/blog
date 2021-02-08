import './CreateArticle.css';

export default function EditProfile () {
	return (
		<div className={'wrapper'}>
			<div className={'createNewArticle'}>
				<form>
					<div className={'createNewArticle__title'}>Create new article</div>
					<label >
						<p>Title</p>
						<input className="createNewArticle__input input" type="text" placeholder={'Title'}/>
					</label>
					<label>
						<p>Short description</p>
						<input className="createNewArticle__input input"  type="text" placeholder={'Title'}/>
					</label>
					<label>
						<p>Text</p>
						<textarea className="createNewArticle__input input" placeholder={'Text'} rows={6}/>
					</label>
					<label>
						<p>Tags</p>
						<div>
							<input className="createNewArticle__input input tags"  type="text" placeholder={'Tag'}/>
							<button className="btn btn__delete">Delete</button><button className="btn btn__addTag">Add tag</button>
						</div>
					</label>
					<label className={'submit'}>
						<input type="submit" value={'Send'} />
					</label>
				</form>
			</div>
		</div>
	)
}