import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login, login_demo } from '../../store/session';
import Logo from '../NavBar/Logo';
import './auth.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoHandler = async (e) => {
    e.preventDefault();
    // alert("demo handler fired")
    const data = await dispatch(login_demo());
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin}>
      <div>
        <Logo />
        <h1>Welcome Back!</h1>
        <div className='auth-fields'>
          <div className='auth-field'>
            <div className='auth-label-err'>
              <label htmlFor='email'>Email</label>
            </div>
            <input
              className='auth-input'
              name='email'
              type='text'
              placeholder='Please enter your email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='auth-field'>
            <div className='auth-label-err'>
              <label htmlFor='password'>Password</label>
            </div>
            <input
              className='auth-input'
              name='password'
              type='password'
              placeholder='Please enter your password'
              value={password}
              onChange={updatePassword}
            />
          </div>
        </div>
        <div id="login-err">
          {errors.length !== 0 &&
            <div>The username and password provided do not match.</div>
          }
        </div>
        <div className='bHold'>
          <button type='submit' className='form_button'>Login</button>
          <button onClick={demoHandler} className='form_button'>Demo</button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
