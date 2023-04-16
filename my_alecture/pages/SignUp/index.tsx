import useInput from '@hooks/useInput';
// import fetcher from '@utils/fetcher';
import React, { useCallback, useState, VFC } from 'react';
import axios from 'axios';
// import useSWR from 'swr';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from './styles';
import { Link, } from 'react-router-dom';

const SignUp = () => {
    // 구조분해할당
    const [email, onChangeEmail]=useInput('');
    const [nickname, onChangeNickname]=useInput('');
    const [password, ,setPassword]=useInput('');
    const [passwordCheck, ,setPasswordCheck]=useInput('');

    // custom 에러들
    const [mismatchError, setMismatchError] = useState(false);
    const [signUpError, setSignUpError] = useState('');
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    // useInput으로 받는 setValue로 callback함수 customize
    const onChangePassword = useCallback((e : any)=>{
      setPassword(e.target.value);
      // password는 passwordCheck랑 같은지 확인하기
      setMismatchError(e.target.value !== passwordCheck);
    }, [passwordCheck]);
    const onChangePasswordCheck = useCallback((e : any)=>{
      setPasswordCheck(e.target.value);
      // passwordCheck는 password랑 같은지 확인하기
      setMismatchError(e.target.value !== password)
    }, [password]);
    // useCallback :
    // callback함수를 기억해뒀다가, deps([]안에 있는 것들)의 값이 바뀌면 함수를 새로 만들고 실행
    // SignUp 함수가 재실행될때마다 저 함수들을 모두 새로 생성됨(re-rendering - 디버깅하기 어려움)
    //  +) re-rendering한다고 화면을 처음부터 다시 그리는건 아니지만, 함수들을 다시 계산하게됨
    //  +) virtual DOM - 달라진 가상 DOM과 현재 DOM을 비교하여 달라진 부분 그림
    // -> 따라서 이걸 막기 위해 useCallback()으로 감싸기
    const onSubmit = useCallback(()=>{  //@@@@@@@@@ e.preventDefault is not a function 에러 뜨길래 e 없앴더니 504뜸@@@@
      // e.preventDefault();
      // console.log("submig 버튼 눌림");
      if(!mismatchError){
        console.log('서버로 회원가입하기');
        setSignUpError(''); //초기화
        setSignUpSuccess(false);  //초기화 -> 요청 연달아 날리면 이전 결과가 남아있음 //로딩단계
        // 잊지말자! 현재 frontend의 webpack dev 서버 포트는 3090, 백엔드 서버 포트는 3095
        // 비동기요청 시작
        // @@@@@@@@@@@@@@@@@@@문제발생@@@@@@@@@@@ 504 gateway timeout 
        axios
          // .post('http://localhost:3095/api/users', { => 3090이 3095로 보내는 요청
          .post('/api/users',{  // => 3090에서 보내도 webpack.config의 devServer에서 프록시 설정 해뒀기 때문에 3095가 3095로 보낸것처럼 됨
            email,
            nickname,
            password,
          })
          .then((response)=>{
            console.log(response);
            setSignUpSuccess(true);
          })
          .catch((error)=>{
            console.log(error.response);
            setSignUpError(error.response.data);
          })
          .finally(()=>{})
        console.log(email, nickname, password, passwordCheck);
      }

    }, [email, nickname, password, passwordCheck]);
  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
