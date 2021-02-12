import './SignIn.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import informs from '../../resourse/Service/Service';

function SignIn({ updateUser, history }) {
  const { register, errors, handleSubmit } = useForm();
  const [validPass, setValidPass] = useState(true);
  const validEmail = /^[\w][\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;

  function errorInput(error) {
    if (error) {
      return 'input inputError';
    }
    return 'input';
  }

  async function validateEmail(email) {
    const user = {
      user: {
        username: '',
        email,
        password: '',
      },
    };
    const valid = await informs
      .setRegistration(user)
      .then((ext) => ext.errors.email);
    return valid;
  }

  const onSubmit = async (data) => {
    const user = {
      user: {
        email: data.email,
        password: data.password,
      },
    };

    const res = await informs.setAuthentication(user).then((ext) => {
      if (ext.user) {
        sessionStorage.setItem('user', JSON.stringify(ext.user));
        updateUser(ext.user);
        history.push('/');
        setValidPass(true);
      } else {
        setValidPass(false);
        setTimeout(() => setValidPass(true), 5000);
      }
    });

    return res;
  };

  return (
    <div className={'wrapper'}>
      <div className={'signIn'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={'signIn__title'}>Sign In</div>
          <label>
            <p>Email adress</p>
            <input
              className={errorInput(errors.email)}
              name="email"
              ref={register({
                required: true,
                pattern: validEmail,
                validate: (email) => validateEmail(email),
              })}
              type="text"
              placeholder={'Email adress'}
            />
            {errors.email && errors.email.type === 'required' && (
              <div className={'error'}>Email is required</div>
            )}
            {errors.email && errors.email.type === 'pattern' && (
              <div className={'error'}>Email adress not valid</div>
            )}
            {errors.email && errors.email.type === 'validate' && (
              <div className={'error'}>Email not registered</div>
            )}
          </label>
          <label>
            <p>Password</p>
            <input
              className={errorInput(errors.password)}
              name="password"
              id="pass"
              ref={register({ required: true, minLength: 8, maxLength: 40 })}
              placeholder={'Password'}
              type="password"
            />
            {errors.password && errors.password.type === 'minLength' && (
              <div className={'error'}>
                Your password needs to be at least 8 characters.
              </div>
            )}
            {errors.password && errors.password.type === 'maxLength' && (
              <div className={'error'}>
                Your password must be no more than 40 characters
              </div>
            )}
            {errors.password && errors.password.type === 'required' && (
              <div className={'error'}>Password is required</div>
            )}
            {!validPass && <div className={'error'}>Password is wrong</div>}
          </label>
          <label className={'submit'}>
            <input type="submit" value={'Login'} />
          </label>
        </form>
        <div className="alreadySignIn">
          Don't have an account? <Link to={'/sign-up'}>Sign Up</Link>.
        </div>
      </div>
    </div>
  );
}

export default withRouter(SignIn);
