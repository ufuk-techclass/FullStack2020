import React from 'react'

const LoginForm = ({ handleLogin, handleUsernameChange,
  handlePasswordChange, username, password }) => {
  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default LoginForm