import React from 'react';
import styled from 'styled-components';
import MoviewLogo from '../assets/components/Logo';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = styled.div`
    display : flex;
    width : 100vw;
    height : 70px;
    background-color : #fff;
    border-bottom-style : solid;
    border-bottom-width : 1.5px;
    border-bottom-color : #f7f7fa;
    justify-content : center;
    position : fixed;
    top : 0;
    right : 0;
    left : 0;
`;

const MainHeader = styled.div`
    width : 80%;
    height : 100%;
    display : flex; 
    align-items : center;
`;

const LogoContainer = styled.div`
    display : flex;
    width : 10%;
    height : 100%;
`;

const TextConatiner = styled.div`
    display : flex;
    width : 80%;
    height : 100%;
    align-items : center;
`;

const ButtonContainer = styled.div`
    display : flex;
    width : 20%;
    height : 100%;
    justify-content : flex-end;
    align-items : center;
`;

const HeaderText = styled(Link)`
    font-size : 16px;
    color : #202225;
    font-family : 'Noto Sans KR', sans-serif;
    text-decoration : none;
    margin-left : 7%;
`;

const HeaderLoginButton = styled.button`
    width : 90px;
    height : 36px;
    background-color : white;
    outline : none;
    border-style : solid;
    border-color : black;
    border-width : 1px;
    cursor : pointer;
    font-family : 'Noto Sans KR', sans-serif;
    margin-right : 10px;
    border-radius : 3px;
    font-size : 13px;
    font-weight : bold;
`;

const HeaderJoinButton = styled.button`
    width : 90px;
    height : 36px;
    background-color : #F03535;
    color : white;
    outline : none;
    cursor : pointer;
    border-style : none;
    font-family : 'Noto Sans KR', sans-serif;
    border-radius : 3px;
    font-size : 13px;
    font-weight : bold;
`;

const HeaderProfileButton = styled.button`
    width : 90px;
    height : 36px;
    background-color : white;
    outline : none;
    border-style : solid;
    border-color : black;
    border-width : 1px;
    cursor : pointer;
    font-family : 'Noto Sans KR', sans-serif;
    border-radius : 3px;
    font-size : 13px;
    font-weight : bold;
`;

class Headers extends React.Component{
    state = {
        LoginCheck : false, //로그인 유무
    }
    //로그인 유무를 체크하는 함수
    checkLoginState = () => {
        switch(localStorage.getItem('KeepLogin')){
            case 'true':
                if(!(!!localStorage.getItem('member')) || !(!!localStorage.getItem('token'))){
                    this.setState({
                        LoginCheck : false
                    })
                }else{
                    this.setState({
                        LoginCheck : true
                    })
                }
                return null;
            case 'false':
                if(!(!!this.props.member) || !(!!this.props.token)){
                    //false면 로그인이 되어있지 않음
                    this.setState({
                        LoginCheck : false
                    });
                }else{
                    //true면 로그인이 되어있음
                    this.setState({
                        LoginCheck : true
                    });
                }
                return null;
            default:
                return null;
        }
    }

    componentDidMount(){
        this.checkLoginState();
    }

    render(){
        return(
            <Header>
                <MainHeader>
                    <Link to = "/" style = {{textDecoration : 'none'}}>
                        <LogoContainer>
                            <MoviewLogo />
                        </LogoContainer>
                    </Link>

                    <TextConatiner>
                        <HeaderText to = '/searchmovie'>영화 검색하기</HeaderText>
                        <HeaderText>이벤트</HeaderText>
                    </TextConatiner>

                    <ButtonContainer>
                        {
                            this.state.LoginCheck ?
                                <>
                                    <Link to = "/profile">
                                        <HeaderProfileButton>
                                            <span>프로필</span>
                                        </HeaderProfileButton>
                                    </Link>
                                </> :
                                <>
                                    <Link to="/login">
                                        <HeaderLoginButton>
                                            <span>로그인</span>
                                        </HeaderLoginButton>
                                    </Link>
                                    <Link to="/join">
                                        <HeaderJoinButton>
                                            <span>회원가입</span>
                                        </HeaderJoinButton>
                                    </Link>
                                </>
                        }
                    </ButtonContainer>
                </MainHeader>
            </Header>
        );
    }
}

let mapStateToProps = (state) => {
    return{
        member : state.Login.member, //state.리듀서.원하는변수
        token : state.Login.member
    };
}

Headers = connect(mapStateToProps)(Headers);

export default Headers;