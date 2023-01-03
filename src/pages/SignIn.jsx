import axios from 'axios';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitSignIn = async (event) => {
    event.preventDefault();
    const userSignInData = await axios.post(
      'http://localhost:8080/users/login',
      { email: email, password: password }
    );
    localStorage.setItem('userToken', userSignInData.data.token);
    alert(userSignInData.data.message);
    navigate('/');
  };
  const onChangeSignInEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangeSignInPassword = (event) => {
    setPassword(event.target.value);
  };

  const userToken = localStorage.getItem('userToken');
  return (
    <div>
      {userToken ? <Navigate to="/" replace={true} /> : null}
      <div>
        <div> 로그인 페이지</div>
        <form onSubmit={onSubmitSignIn}>
          <div>
            <input
              type="text"
              onChange={onChangeSignInEmail}
              placeholder="이메일"
            />
          </div>
          <div>
            <input
              type="text"
              onChange={onChangeSignInPassword}
              placeholder="패스워드"
            />
          </div>
          <button>완료</button>
        </form>
        <button
          onClick={() => {
            navigate('/auth/signup');
          }}
        >
          회원가입하러가기
        </button>
      </div>
    </div>
  );
}

export default SignIn;
