import React from 'react'

const LoginForm = ({ username, password, handleLogin, handleUsernameChange, handlePasswordChange }) => {
  return (
    <form onSubmit={handleLogin}>
      <h3>Log In</h3>
      <div>
        Username:&nbsp;
          <input
          type='text'
          value={username}
          name='Username'
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        Password:&nbsp;
          <input
          type='password'
          value={password}
          name='Password'
          onChange={handlePasswordChange}
        />
      </div>
      <button type='submit'>Log In</button>
    </form>
  )
}

export default LoginForm