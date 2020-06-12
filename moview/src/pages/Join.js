import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../components/Header';
import { SERVER } from '../config/config.json';
import '../styles/Login.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Container = styled.div`
    display : flex;
    width : 100vw;
    height : 100vh;
    flex-direction : column;
    align-items : center;
    justify-content : center;
    background-color : #E6E2E2;
`;

const MainContainer = styled.div`
    display : flex;
    width : 50%;
    height : 55%;
    background-color : white;
    border-radius : 3px;
    flex-direction : row;   
`;

const MainJoinBox = styled.div`
    display : flex;
    width : 100%;
    height : 80%;
    border-right-style : solid;
    border-right-width : 2px;
    border-right-color : #f1f2f4;
    flex-direction : column;
    justify-content : center;
`;

const LeftBox = styled.div`
    display : flex;
    width : 60%;
    height : 100%;
    flex-direction : column;
    justify-content : center;
`;

const RightBox = styled.div`
    display : flex;
    width : 40%;
    height : 100%;
    flex-direction : column;
    justify-content : center;
`;

const InputField = styled.div`
    display : flex;
    width : 70%;
    flex-direction : column;
    margin-top : 5%;
    margin-left : 10%;
`;

const InputText = styled.input`
    height : 40px;
    outline : none;
    border-radius : 3px;
    border-width : 2px;
    border-color : #767676;
    font-family : 'Noto Sans KR', sans-serif;
    font-size : 14px;
    padding-left : 10px;
    margin-top : 10px;
`;

const ErrorMsg = styled.span`
    font-size : 12px;
    color : #FA4238;
    font-family : 'Noto Sans KR', sans-serif;
    align-self : flex-start;
`;

const JoinButton = styled.button`
    width : 70%;
    height : 50px;
    outline : none;
    border-radius : 3px;
    border-style : none;
    font-family : 'Noto Sans KR', sans-serif;
    font-size : 16px;
    color : white;
    cursor : pointer;
    background-color : #F03535;
    margin-left : 10%;
`;

class Join extends React.Component{
    state = {
        idErrorMsg : "",
        pwErrorMsg : "",
        checkpwErrorMsg : "",
        nameErrorMsg : "",
        id : "",
        pw : "",
        checkpw : "",
        name : ""
    }

    JoinAlert = () => {
        confirmAlert({
            title : '회원가입 성공!',
            message : '로그인 화면으로 가시겠어요?',
            buttons : [
                {
                    label : '네',
                    onClick : () => this.props.history.push('/login')
                },
                {
                    label : '아니오',
                    onClick : () => this.props.history.push('/')
                }
            ]
        })
    }

    ButtonFilter =  () => {
        if(this.state.idErrorMsg === '아이디를 입력해주세요.'){
            alert(this.state.idErrorMsg);
            return null;
        }else if(this.state.pwErrorMsg === '비밀번호를 입력해주세요.'){
            alert(this.state.pwErrorMsg);
            return null;
        }else if(this.state.checkpwErrorMsg === '비밀번호를 한번 더 입력해주세요.'){
            alert(this.state.checkpwErrorMsg);
            return null;
        }else if(this.state.checkpwErrorMsg === "비밀번호가 일치하지 않습니다."){
            alert(this.state.checkpwErrorMsg);
            return null;
        }else if(this.state.nameErrorMsg === "닉네임(이름)을 입력해주세요."){
            alert(this.state.nameErrorMsg);
            return null;
        }else{
            this.joinMoview();
        }
    }

    checkErrorMsg = (Filter) => {
        switch(Filter){
            case 'id':
                if(this.state.id === ''){
                    this.setState({
                        idErrorMsg : "아이디를 입력해주세요."
                    })
                    return null;
                }else{
                    this.setState({
                        idErrorMsg : ''
                    })
                    return null;
                }
            case 'pw':
                if(this.state.pw === ''){
                    this.setState({
                        pwErrorMsg : "비밀번호를 입력해주세요."
                    })
                    return null;
                }else{
                    this.setState({
                        pwErrorMsg : ''
                    })
                    return null;
                }
            case 'checkpw':
                if(this.state.checkpw === ''){
                    this.setState({
                        checkpwErrorMsg : '비밀번호를 한번 더 입력해주세요.'
                    })
                    return null;
                }else{
                    if(this.state.pw === this.state.checkpw){
                        this.setState({
                            checkpwErrorMsg : ''
                        })
                        return null;
                    }else{
                        this.setState({
                            checkpwErrorMsg : '비밀번호가 일치하지 않습니다.'
                        })
                        return null;
                    }
                }
            case 'name':
                if(this.state.name === ''){
                    this.setState({
                        nameErrorMsg : "닉네임(이름)을 입력해주세요."
                    })
                    return null;
                }else{
                    this.setState({
                        nameErrorMsg : ""
                    })
                    return null;
                }
            default:
                return null;
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    joinMoview = () => {
        axios.post(`${SERVER}/auth/register`, {
            id : this.state.id,
            pw : this.state.pw,
            Name : this.state.name,
        })
        .then((response) => {
            switch(response.data.status){
                case 200 :
                    this.JoinAlert();
                    return null;
                case 403 :
                    alert(response.data.message);
                    return null;
                case 400 :
                    alert(response.data.message);
                    return null;
                default :
                    return null;
            }
        })
        .catch((error) => {
            alert('서버 오류가 발생했습니다.');
            return null;
        })
    }
    
    render(){
        return(
            <Container>
                <Header />
                <MainContainer>
                    <LeftBox>
                        <MainJoinBox>
                            <span className = "LoginText">회원가입</span>
                            <span className = "WelcomeText">Join in Moview</span>
                            <InputField>
                                <InputText
                                    type = "text"
                                    placeholder = "아이디"
                                    onBlur = {() => this.checkErrorMsg('id')}
                                    value = {this.state.id}
                                    name = "id"
                                    onChange = {this.handleChange}
                                />
                                <ErrorMsg>{this.state.idErrorMsg}</ErrorMsg>

                                <InputText
                                    type = "password"
                                    placeholder = "비밀번호"
                                    onBlur = {() => this.checkErrorMsg('pw')}
                                    value = {this.state.pw}
                                    name = "pw"
                                    onChange = {this.handleChange}
                                />
                                <ErrorMsg>{this.state.pwErrorMsg}</ErrorMsg>

                                <InputText 
                                    type = "password"
                                    placeholder = "비밀번호 확인"
                                    onBlur = {() => this.checkErrorMsg('checkpw')}
                                    value = {this.state.checkpw}
                                    name = "checkpw"
                                    onChange = {this.handleChange}
                                />
                                <ErrorMsg>{this.state.checkpwErrorMsg}</ErrorMsg>

                                <InputText
                                    type = "text"
                                    placeholder = "닉네임(이름)"
                                    onBlur = {() => this.checkErrorMsg('name')}
                                    value = {this.state.name}
                                    name = "name"
                                    onChange = {this.handleChange}
                                />
                                <ErrorMsg>{this.state.nameErrorMsg}</ErrorMsg>
                            </InputField>
                        </MainJoinBox>
                        <JoinButton onClick = {() => this.ButtonFilter()}>
                            <span>회원가입하기</span>
                        </JoinButton>
                    </LeftBox>
                    <RightBox>
                        <span className = "Notice">Notice</span>
                        <span className = "NoticeText">간편한 회원가입으로 <text style = {{color : "#F03535"}}>무뷰</text>에 가입하세요!</span>
                        <span className = "NoticeText"><text style = {{color : "#F03535"}}>무뷰</text>에 가입하셔서 <br />다양한 리뷰를 확인하고 추억을 기록하세요!</span>
                    </RightBox>
                </MainContainer>
            </Container>
        );
    }
}

export default Join;