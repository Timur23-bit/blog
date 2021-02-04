import './SignIn.css';

export default function SignIn () {
	return (
		<div className={'wrapper'}>
			<div className={'signIn'}>
				<form>
					<div className={'signIn__title'}>Sign In</div>
					<label >
						<p>Email adress</p>
						<input className='input' type='text' placeholder={'Email adress'}/>
					</label>
					<label>
						<p>Password</p>
						<input className='input'  type='password' placeholder={'Password'}/>
					</label>
					<label className={'submit'}>
						<input type='submit' value={'Login'}/>
					</label>
				</form>
				<div className='alreadySignIn'>Don't have an account? <a href={''}>Sign Up</a>.</div>
			</div>
		</div>
	)
}