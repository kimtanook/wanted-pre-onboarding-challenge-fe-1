import axios from 'axios';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitSignIn = async (event) => {
    event.preventDefault();
    try {
      const userSignInData = await axios.post(
        'http://localhost:8080/users/login',
        { email: email, password: password }
      );
      localStorage.setItem('userToken', userSignInData.data.token);
      alert(userSignInData.data.message);
      navigate('/');
    } catch (error) {
      alert(error.response.data.details);
    }
  };
  const onChangeSignInEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangeSignInPassword = (event) => {
    setPassword(event.target.value);
  };

  const userToken = localStorage.getItem('userToken');
  return (
    <StSignInWrap>
      {userToken ? <Navigate to="/" replace={true} /> : null}
      <StSignInItemFlex>
        <StTitle> 로그인</StTitle>
        <StForm onSubmit={onSubmitSignIn}>
          <div>
            <StEmailInput
              type="text"
              onChange={onChangeSignInEmail}
              placeholder="이메일"
            />
          </div>
          <div>
            <StPasswordInput
              type="text"
              onChange={onChangeSignInPassword}
              placeholder="패스워드"
            />
          </div>
          <StButton>완료</StButton>
        </StForm>
        <StButton
          onClick={() => {
            navigate('/auth/signup');
          }}
        >
          회원가입하기
        </StButton>
      </StSignInItemFlex>
    </StSignInWrap>
  );
}

export default SignIn;

const StSignInWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 1px solid black;
  padding: 20px;
  width: 20rem;
  height: 20rem;
  border-radius: 10px;
`;

const StSignInItemFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StTitle = styled.div`
  margin: 10px;
`;
const StEmailInput = styled.input`
  margin: 5px;
  padding-left: 10px;
  border: 1px black solid;
  border-radius: 15px;
  height: 30px;
`;
const StPasswordInput = styled.input`
  margin: 5px;
  padding-left: 10px;
  border: 1px black solid;
  border-radius: 15px;
  height: 30px;
`;
const StButton = styled.button`
  margin: 5px;
  border: none;
  border-radius: 20px;
  background-color: black;
  color: white;
  width: 130px;
  height: 25px;
`;
