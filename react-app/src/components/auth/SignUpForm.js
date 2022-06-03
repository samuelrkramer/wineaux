import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import Logo from '../NavBar/Logo';
import './auth.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    const data = await dispatch(signUp(username, email, password, repeatPassword, firstname, lastname, birthdate));
    if (data) {
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].replace('username', 'Username');
        data[i] = data[i].replace('email', 'Email');
        data[i] = data[i].replace('password', 'Password');
        data[i] = data[i].replace('first_name', 'First Name');
        data[i] = data[i].replace('last_name', 'Last Name');
        data[i] = data[i].replace('birthdate', 'Birthdate');
        data[i] = data[i].replace('confirm_pass', 'Repeat Password');
      }
      setErrors(data)
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateBirthdate = (e) => {
    setBirthdate(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        <Logo />
        <h1>Welcome to Wineaux!</h1>
        <div id="signup-form-errors-container">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label>First Name</label>
          <input
            type='text'
            name='first_name'
            onChange={updateFirstName}
            value={firstname}
          ></input>
        </div>
        <div>
          <label>Last Name</label>
          <input
            type='text'
            name='last_name'
            onChange={updateLastName}
            value={lastname}
          ></input>
        </div>
        <div>
          <label>User Name</label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label>Birthdate</label>
          <input
            type='date'
            name='birthdate'
            onChange={updateBirthdate}
            value={birthdate}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label>Repeat Password</label>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className='bHold'>
          <button type='submit'>Sign Up</button>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
