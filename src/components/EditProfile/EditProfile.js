import './EditProfile.css';

export default function EditProfile () {
	return (
		<div className={'wrapper'}>
			<div className={'editProfile'}>
				<form>
					<div className={'editProfile__title'}>Edit Profile</div>
					<label >
						<p>Username</p>
						<input className='input' type='text' placeholder={'Username'}/>
					</label>
					<label>
						<p>Email adress</p>
						<input className='input'  type='text' placeholder={'Email adress'}/>
					</label>
					<label>
						<p>New password</p>
						<input className='input'  type='password' placeholder={'New password'}/>
					</label>
					<label>
						<p>Avatar image (url)</p>
						<input className='input'  type='text' placeholder={'Avatar image'}/>
					</label>
					<label className={'submit'}>
						<input type='submit' value={'Save'} />
					</label>
				</form>
				<div className='alreadySignIn'>Don't have an account? <a href={''}>Sign Up</a>.</div>
			</div>
		</div>
	)
}