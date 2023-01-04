import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
    try {
      const userSignUpData = await axios.post(
        'http://localhost:8080/users/create',
        { email: email, password: password }
      );
      alert(userSignUpData.data.message);
      navigate('/auth/signin');
    } catch (error) {
      alert(error.response.data.details);
    }
  };

  const onChangeSignUpEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangeSignUpPassword = (event) => {
    setPassword(event.target.value);
  };

  const userToken = localStorage.getItem('userToken');
  return (
    <StSignInWrap>
      {userToken ? <Navigate to="/" replace={true} /> : null}
      <StSignInItemFlex>
        <StTitle> 회원가입</StTitle>
        <StForm onSubmit={onSubmitSignUp}>
          <div>
            <StEmailInput
              type="text"
              onChange={onChangeSignUpEmail}
              placeholder="이메일"
            />
          </div>
          <div>
            <StPasswordInput
              type="text"
              onChange={onChangeSignUpPassword}
              placeholder="패스워드"
            />
          </div>
          <StButton disabled={!buttonOn ?? true}>완료</StButton>
        </StForm>
        <StButton
          onClick={() => {
            navigate('/auth/signin');
          }}
        >
          로그인하기
        </StButton>
      </StSignInItemFlex>
    </StSignInWrap>
  );
}

export default SignUp;

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
