import './SignUp.css';
import {useForm} from "react-hook-form";
import {useState} from 'react';
import {Link, withRouter } from "react-router-dom";
import check from '../../resourse/check.svg';
import informs from "../../resourse/Service/Service";

function SignUp ({updateUser, history}) {
	const { register, errors, handleSubmit } = useForm();
	const [checked, setChecked] = useState(true);
	// eslint-disable-next-line no-useless-escape
	const validEmail = /^[\w][\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;

	function onChecked(event) {
			setChecked(event.target.checked);
	}

	function disabledBtn(checker) {
		if (checker) {
			return false;
		}
		return true;
	}

	async function validateUsername(username) {
		const result = await informs.getProfile(username);
		return result;
	}

	async function validateEmail(email) {
		const user = {
			user: {
				username: '',
				email,
				password: ''
			}
		};
		const valid = await informs.setRegistration(user).then(ext => ext.message);
		return valid;
	}

	function errorInput(errorses) {
		if (errorses) {
			return 'input inputError';
		}
		return 'input';
	}


	const onSubmit = async data => {
		const user = {
			user: {
				username: data.username,
				email: data.email,
				password: data.password
			}
		};
		const res = await informs.setRegistration(user)
			.then(ext => {
					updateUser(ext.user);
					sessionStorage.setItem('user', JSON.stringify(ext.user));
					history.push('/');
			});

		return res;
	};

	function render() {
		return (
			<div className={'wrapper'}>
				<div className={'signUp'}>
					<form onSubmit={handleSubmit(onSubmit)} >
						<div className={'signUp__title'}>Create new account</div>
						<label >
							<p>Username</p>
							<input className={errorInput(errors.username)} name="username" ref={register({required: true, minLength: 3, maxLength: 20, validate: username => validateUsername(username)})} type="text" placeholder={'Username'}/>
							{errors.username && errors.username.type === 'required' && <div className={'error'}>Username is required</div>}
							{errors.username && errors.username.type === 'minLength' && <div className={'error'}>The user name must be at least 3 letters long</div>}
							{errors.username && errors.username.type === 'validate' && <div className={'error'}>Username already been register</div>}
						</label>
						<label>
							<p>Email adress</p>
							<input className={errorInput(errors.email)}  name="email" ref={register({required: true, pattern: validEmail, validate: email => validateEmail(email)})} type="text" placeholder={'Email adress'}/>
							{errors.email && errors.email.type === 'required' && <div className={'error'}>Email is required</div>}
							{errors.email && errors.email.type === 'pattern' && <div className={'error'}>Email adress not valid</div>}
							{errors.username && errors.username.type === 'validate' && <div className={'error'}>Email already been register</div>}
						</label>
						<label>
							<p>Password</p>
							<input className={errorInput(errors.password)} name="password" id="pass" ref={register({required: true, minLength: 8, maxLength: 40})} placeholder={'Password'} type="password"/>
							{errors.password && errors.password.type === 'minLength' && <div className={'error'}>Your password needs to be at least 8 characters.</div>}
							{errors.password && errors.password.type === 'maxLength' && <div className={'error'}>Your password must be no more than 40 characters</div>}
							{errors.password && errors.password.type === 'required' && <div className={'error'}>Password is required</div>}
						</label>
						<label>
							<p>Repeat password</p>
							<input className={errorInput(errors.confpassword)} name="confpassword" ref={register({validate: value => value === document.getElementById('pass').value})} placeholder={'Password'}  type="password"/>
							{errors.confpassword && <div className={'error'}>Passwords must match</div>}
						</label>
						<hr />
						<label className={'label-checkbox'}>
							<input onChange={(event) => onChecked(event)} checked={checked} className={'checkbox'} name="checkbox" type={'checkbox'}/><span className={'fake'}><img src={check} alt={'check'}/></span><div>I agree to the processing of my personal information</div>
						</label>
						<label className={'submit'}>
							<input className={'btn__submit'} disabled={disabledBtn(checked)} type="submit" value={'Create'} />
						</label>
					</form>
					<div className="alreadySignIn">Already have an account? <Link to={'/sign-in'}>Sign In</Link>.</div>
				</div>
			</div>
		);
	}

	return render();
}

export default withRouter(SignUp);