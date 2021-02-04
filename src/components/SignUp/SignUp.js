import './SignUp.css';
import check from '../../resourse/check.svg';
export default function SignUp () {
	let classNamePass = '';
	let classNameConfPass = '';

	function validatePassLength(e) {
		if (e.target.value.length < 6) {
			e.target.classList.add('errorActive');
			document.querySelector('.passErrorLength').classList.remove('invisible')
		} else {
			e.target.classList.remove('errorActive');
			document.querySelector('.passErrorLength').classList.add('invisible')
		}
	}

	function validatePassConfLength(e) {
		if (e.target.value !== document.querySelector('.pass').value) {
			e.target.classList.add('errorActive');
			document.querySelector('.passConfErrorLength').classList.remove('invisible')
		} else {
			e.target.classList.remove('errorActive');
			document.querySelector('.passConfErrorLength').classList.add('invisible')
		}
	}

	return (
		<div className={'wrapper'}>
			<div className={'signUp'}>
				<form>
					<div className={'signUp__title'}>Create new account</div>
					<label >
						<p>Username</p>
						<input className='input' type='text' placeholder={'Username'}/>
					</label>
					<label>
						<p>Email adress</p>
						<input className='input'  type='text' placeholder={'Email adress'}/>
					</label>
					<label>
						<p>Password</p>
						<input className='input pass' placeholder={'Password'} required={true} type='password' onChange={(event)=> validatePassLength(event)}/>
						<div className={'passErrorLength invisible'}>Your password needs to be at least 6 characters.</div>
					</label>
					<label>
						<p>Repeat password</p>
						<input className='input conf-pass' placeholder={'Password'} onChange={(event) => validatePassConfLength(event)} type='password'/>
						<div className={'passConfErrorLength invisible'}>Passwords must match</div>
					</label>
					<hr />
					<label className={'label-checkbox'}>
						<input className={'checkbox'} type={'checkbox'}/><span className={'fake'}><img src={check} /></span><div>I agree to the processing of my personal information</div>
					</label>
					<label className={'submit'}>
						<input type='submit' value={'Create'}/>
					</label>
				</form>
				<div className='alreadySignIn'>Already have an account? <a href={''}>Sign In</a>.</div>
			</div>
		</div>
	);
}