import React, { Component } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import axios from 'axios';
import { SERVER } from '../config/config.json';
import { connect } from 'react-redux';
import { adduserdata } from '../modules/actions/Login.actions';

const Container = styled.div`
    display : flex;
    width : 100vw;
    height : 100vh;
    flex-direction : column;
    align-items : center;
    justify-content : center;
    background-color : #E6E2E2;
`;
//정보가 나타나는 메인 영역
const MainContainer = styled.div`
    display : flex;
    width : 50%;
    height : 55%;
    background-color : white;
    border-radius : 3px;
    flex-direction : row;
`;
//로그인 정보가 나오는 영역
const LeftBottomBox = styled.div`
    display : flex;
    width : 60%;
    height : 100%;
    justify-content : center;
    align-items : center;
`;

// Notice 영역
const RightBottomBox = styled.div`
    display : flex;
    width : 40%;
    height : 100%;
    justify-content : center;
    flex-direction : column;
`;
//LeftBottomBox안에서 나눠져있는 영역
const MainLoginBox = styled.div`
    display : flex;
    width : 100%;
    height : 80%;
    border-right-style : solid;
    border-right-width : 2px;
    border-right-color : #f1f2f4;
    flex-direction : column;
    justify-content : center;
`;
//로그인, 회원가입, 설정 입력창이 포함되어있는 영역
const InputField = styled.div`
    display : flex;
    width : 70%;
    height : 30%;
    flex-direction : column;
    margin-top : 5%;
    margin-left : 10%;
`;
// 로그인, 회원가입 버튼 영역
const ButtonField = styled.div`
    display : flex;
    width : 70%;
    height : 20%;
    margin-top : 3%;
    margin-left : 10%;
`;
// 아이디, 비밀번호 찾기, 로그인 유지 영역
const SelectField = styled.div`
    display : flex;
    width : 100%;
    height : 20%;
    flex-direction : row;
    align-items : center;
`;
// 로그인, 회원가입 입력창
const InputText = styled.input`
    height : 40px;
    margin-top : 2%;
    outline : none;
    border-radius : 3px;
    border-width : 2px;
    border-color : #767676;
    font-family : 'Noto Sans KR', sans-serif;
    font-size : 14px;
    padding-left : 10px;
`; 

const KeepLoginDiv = styled.div`
    display : flex;
    width : 50%;
    height : 100%;
    margin-top : 10px;
    flex-direction : row;
`;

const LoginButton = styled.button`
    width : 48%;
    height : 50px;
    outline : none;
    cursor : pointer;
    margin-right : 4%;
    border-radius : 3px;
    font-family : 'Noto Sans KR', sans-serif;
    font-size : 16px;
    font-weight : bold;
    color : white;
    background-color : #F03535;
    border-style : none;
`;

const JoinButton = styled.button`
    width : 100%;
    height : 50px;
    outline : none;
    cursor : pointer;
    border-radius : 3px;
    font-family : 'Noto Sans KR', sans-serif;
    font-size : 16px;
    font-weight : bold;
    border-style : solid;
    border-color : black;
    border-width : 1px;
    background-color : white;
`;

class Login extends Component {
    state = {
        KeepLoginChecked : false,
        id : "",
        pw : ""
    }

    //로그인 유지 체크 하는 함수
    handleCheckChange = () => {
        this.setState({KeepLoginChecked : !this.state.KeepLoginChecked});
    };

    //input에 있는 값을 state로 전송하기 위한 함수
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    //버튼을 누르기 전 아이디나 비밀번호의 공백 확인하는 함수
    ButtonFilter = () => {
        if(this.state.id === ''){
            alert('아이디를 입력해주세요!');
            return null;
        }else if(this.state.pw === ''){
            alert('비밀번호를 입력해주세요!');
            return null;
        }else{
            this.LoginMoview(); //서버로 정보 전송
        }
    }

    //로그인 유지를 했을 때 localstorage혹은 store로 전송하는 함수
    saveUserData = (member, token) => {
        switch(this.state.KeepLoginChecked){
            case true: //true일 때 로컬스토리지 저장
                localStorage.setItem('member', JSON.stringify(member));
                localStorage.setItem('token', JSON.stringify(token));
                localStorage.setItem('KeepLogin', JSON.stringify(this.state.KeepLoginChecked));
                return null;
            case false: //false일 때 스토어로 전송
                this.props.onAddUserData(member, token);
                localStorage.setItem('member', JSON.stringify(member));
                localStorage.setItem('KeepLogin', JSON.stringify(this.state.KeepLoginChecked));
                return null;
            default:
                return null;
        }
    }

    //서버와 통신하는 메인 함수
    LoginMoview = () => {
        axios.post(`${SERVER}/auth/login`, {
            id : this.state.id,
            pw : this.state.pw
        })
        .then((response) => {
            switch(response.data.status){
                case 200:
                    alert('로그인 성공!');
                    this.saveUserData(response.data.data.member, response.data.data.tokenData);
                    this.props.history.push('/');
                    return null;
                case 403 :
                    alert('아이디와 비밀번호를 확인해주세요.');
                    return null;
                case 400 :
                    alert('아이디와 비밀번호 양식이 잘못되었습니다.');
                    return null;
                default :
                    return null;
            }
        }).catch((error) => {
            alert('서버 오류가 발생했습니다.');
            return null;
        })
    }

    render() {
        return (
            <Container>
                <Header />
                <MainContainer>
                        <LeftBottomBox>
                            <MainLoginBox>
                                <span className = "LoginText">로그인</span>
                                <span className = "WelcomeText">Welcome to Moview</span>
                                <InputField>
                                    <InputText 
                                        type = "text"
                                        placeholder = "아이디"
                                        name = "id"
                                        value = {this.state.id}
                                        onChange = {this.handleChange}
                                    />
                                    <InputText 
                                        type = "password"
                                        placeholder = "비밀번호"
                                        name = "pw"
                                        value = {this.state.pw}
                                        onChange = {this.handleChange}
                                    />

                                    <SelectField>
                                        <KeepLoginDiv>
                                            <input
                                                type = "checkbox"
                                                style = {{marginLeft : 0}}
                                                checked = {this.state.KeepLoginChecked}
                                                onChange = {() => this.handleCheckChange()}
                                            />
                                            <span className = "checkText" onClick = {() => this.handleCheckChange()} >로그인 유지</span>
                                        </KeepLoginDiv>
                                    </SelectField>
                                </InputField>

                                <ButtonField>
                                    <LoginButton onClick = {() => this.ButtonFilter()}>
                                        <span>로그인</span>
                                    </LoginButton>

                                    <Link to = "/join" style = {{width : "48%"}}>
                                        <JoinButton>
                                            <span>회원가입</span>
                                        </JoinButton>
                                    </Link>
                                </ButtonField>
                            </MainLoginBox>
                        </LeftBottomBox>

                        <RightBottomBox>
                            <span className = "Notice">Notice</span>
                            <span className = "NoticeText"><text style = {{color : "#F03535"}}>무뷰</text>는 영화의 리뷰를 공유하고,<br />자신의 추억을 저장하는 공간입니다.</span>
                            <span className = "NoticeText"><text style = {{color : "#F03535"}}>무뷰</text>에 가입하셔서 <br />다양한 리뷰를 확인하고 추억을 기록하세요!</span>
                        </RightBottomBox>
                </MainContainer>
            </Container>
        );
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        onAddUserData : (member, token) => dispatch(adduserdata(member, token))
    };
}

Login = connect(undefined, mapDispatchToProps)(Login);

export default Login;