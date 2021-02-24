import React, { useState } from 'react';
import './EditProfile.css';
import {useForm} from "react-hook-form";
import { withRouter } from 'react-router-dom';
import informs from "../../resourse/Service/Service";

function EditProfile ({updateUser, userProfile, history}) {
	const { register, errors, handleSubmit } = useForm();
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');

	if (userProfile && !email && !username) {
		setEmail(userProfile.email);
		setUsername(userProfile.username);
	}

	const validEmail = /^[\w][\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
	const validUrl = /^https:\/\/[\w-\.]+\.[a-z]{2,5}[\/\w-\.]+$/i;

	async function validateUsername(usernames) {
		const res = informs.getProfile(usernames);
		return res;
	}

	async function validateEmail(emails) {
		const user = {
			user: {
				username: '',
				emails,
				password: ''
			}
		};
		const valid = await informs.setRegistration(user).then(ext => ext.errors.email);
		return valid;
	}

	function errorInput(error) {
		if (error) {
			return 'input inputError';
		}
		return 'input';
	}

	const onSubmit = async data => {
		const user = {
			user: {
				username: data.username,
				email: data.email,
				password: data.password,
				image: data.image
		 	}
		 };
		const res = await informs.setProfile(user, userProfile.token)
			.then(ext => {
				updateUser(ext.user);
				sessionStorage.setItem('user', JSON.stringify(ext.user));
				history.push('/');
			});

		 return res;
	};
	return (
		<div className={'wrapper'}>
			<div className={'signUp'}>
				<form onSubmit={handleSubmit(onSubmit)} >
					<div className={'signUp__title'}>Edit Profile</div>
					<label >
						<p>Username</p>
						<input className={errorInput(errors.username)} name="username" onChange={event => setUsername(event.target.value)} value={username} ref={register({required: true, minLength: 3, maxLength: 20, validate: user => validateUsername(user)})} type="text" placeholder={'Username'}/>
						{errors.username && errors.username.type === 'required' && <div className={'error'}>Username is required</div>}
						{errors.username && errors.username.type === 'minLength' && <div className={'error'}>The user name must be at least 3 letters long</div>}
						{errors.username && errors.username.type === 'validate' && <div className={'error'}>Username already been register</div>}
					</label>
					<label>
						<p>Email adress</p>
						<input className={errorInput(errors.email)} name="email" onChange={event => setEmail(event.target.value)} value={email} ref={register({required: true, pattern: validEmail, validate: emailer => validateEmail(emailer)})} type="text" placeholder={'Email adress'}/>
						{errors.email && errors.email.type === 'required' && <div className={'error'}>Email is required</div>}
						{errors.email && errors.email.type === 'pattern' && <div className={'error'}>Email adress not valid</div>}
						{errors.email && errors.email.type === 'validate' && <div className={'error'}>Email already been register</div>}
					</label>
					<label>
						<p>New password</p>
						<input className={errorInput(errors.password)} name="password" id="pass" ref={register({required: true, minLength: 8, maxLength: 40})} placeholder={'Password'} type="password"/>
						{errors.password && errors.password.type === 'minLength' && <div className={'error'}>Your password needs to be at least 8 characters.</div>}
						{errors.password && errors.password.type === 'maxLength' && <div className={'error'}>Your password must be no more than 40 characters</div>}
					</label>
					<label>
						<p>Avatar image(url)</p>
						<input className={errorInput(errors.image)} name="image" ref={register({pattern: validUrl})} placeholder={'Avatar image'}  type="text"/>
						{errors.image && <div className={'error'}>Invalid url</div>}
					</label>
					<label className={'submit'}>
						<input className={'btn__submit'} type="submit" value={'Save'} />
					</label>
				</form>
			</div>
		</div>
	);
}

export default withRouter(EditProfile);
