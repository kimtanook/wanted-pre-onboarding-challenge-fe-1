import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonOn, setButtonOn] = useState(false);

  const signUpConfirm = () => {
    if (email.includes('@') && email.includes('.') && password.length >= 8) {
      setButtonOn(true);
    } else {
      setButtonOn(false);
    }
  };
  useEffect(() => {
    signUpConfirm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  const onSubmitSignUp = async (event) => {
    event.preventDefault();
    const userSignUpData = await axios.post(
      'http://localhost:8080/users/create',
      { email: email, password: password }
    );
    alert(userSignUpData.data.message);
    navigate('/auth/signin');
  };

  const onChangeSignUpEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangeSignUpPassword = (event) => {
    setPassword(event.target.value);
  };

  const userToken = localStorage.getItem('userToken');
  return (
    <div>
      {userToken ? <Navigate to="/" replace={true} /> : null}
      <div>
        <div> 회원가입 페이지</div>
        <form onSubmit={onSubmitSignUp}>
          <div>
            <input
              type="text"
              onChange={onChangeSignUpEmail}
              placeholder="이메일"
            />
          </div>
          <div>
            <input
              type="text"
              onChange={onChangeSignUpPassword}
              placeholder="패스워드"
            />
          </div>
          <button disabled={!buttonOn ?? true}>완료</button>
        </form>
        <button
          onClick={() => {
            navigate('/auth/signin');
          }}
        >
          로그인하러가기
        </button>
      </div>
    </div>
  );
}

export default SignUp;
