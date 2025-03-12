import {useState} from 'react';
import PropTypes from "prop-types";
import {useMutation} from "@apollo/client";
import {ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK} from "../queries.js";

function LoginForm({ handleLogin, show }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={(event) => handleLogin(event, {username, password})}>
        <div>
          title
          <input
            value={username}
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="password"
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
}

export default LoginForm;