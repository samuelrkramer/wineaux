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
        <h4>Please sign in to continue </h4>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            className='fInput'
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            className='fInput'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
          <div className='bHold'>
            <button type='submit' className='form_button'>Login</button>
            <button onClick={demoHandler} className='form_button'>Demo</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
