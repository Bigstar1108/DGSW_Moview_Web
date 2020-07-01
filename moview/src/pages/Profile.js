import React from 'react';
import styled from 'styled-components';
import { ArrowBackIos, ArrowUpward } from '@material-ui/icons';
import LikeScreen from '../components/profile/LikeScreen';
import ProfileScreen from '../components/profile/ProfileScreen';

const Container = styled.div`
    display : flex;
    width : 100%;
    height : 100vh;
    flex-direction : column;
`;

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

const Body = styled.div`
    display : flex;
    width : 100%;
    height : 100%;
    padding-top : 70px;
    flex-direction : row;
`;

const NavBody = styled.div`
    width : 90%;
    height : 100%;
    display : flex;
    margin-left : 10%;
`;

const Nav = styled.div`
    display : flex;
    width : 10%;
    height : 100%;
    flex-direction : column;
    border-right-style : solid;
    border-right-width : 1.5px;
    border-right-color : #f7f7fa;
    background-color : #fff;
    position : fixed;
    left : 0;
`;

const TypeLi = styled.li`
    list-style-type : none;
    margin-top : 10px;
`;

const TypeText = styled.span`
    font-size : 20px;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight : bold;
    cursor : pointer;
    ${prop => prop.value ? 
        `
            color : #F03535;
        `
        :
        `
            color : black;
        `
    }
`;

const ArrowUpBtn = styled.button`
    display : flex;
    width : 50px;
    height : 50px;
    outline : none;
    border-radius : 50%;
    border-width : 2px;
    border-style : solid;
    border-color : black;
    justify-content : center;
    align-items : center;
    cursor : pointer;
    background-color : white;
    position : fixed;
    right : 0;
    bottom : 0;
    margin-right : 20px;
    margin-bottom : 5%;
`;

class Profile extends React.Component{
    state = {
        member : JSON.parse(localStorage.getItem('member')),
        typeReview : false,
        typeLike : false,
        typeCalendar : false,
        typeProfile : true,
        typeScreen : 'profile'
    }

    componentDidMount(){
        window.addEventListener("scroll", this.checkScrollTop);
    }

    checkScrollTop = () => {
        if(!this.state.showScroll && window.pageYOffset > 300){
            this.setState({
                showScroll : true
            });
        }else if(this.state.showScroll && window.pageYOffset <= 300){
            this.setState({
                showScroll : false
            });
        }
    };

    scrollToTop = () => {
        window.scrollTo({
            top : 0,
            left : 0,
            behavior : 'smooth'
        });
    }

    handleOnClick = (type) => {
        switch(type){
            case 'profile':
                this.setState({
                    typeLike : false,
                    typeReview : false,
                    typeCalendar : false,
                    typeProfile : true,
                    typeScreen : 'profile'
                });
                return null;
            case 'like':
                this.setState({
                    typeLike : true,
                    typeReview : false,
                    typeCalendar : false,
                    typeProfile : false,
                    typeScreen : 'like'
                });
                return null;
            case 'review':
                this.setState({
                    typeLike : false,
                    typeReview : true,
                    typeCalendar : false,
                    typeProfile : false,
                    typeScreen : 'review'
                });
                return null;
            case 'calendar':
                this.setState({
                    typeLike : false,
                    typeReview : false,
                    typeCalendar : true,
                    typeProfile : false,
                    typeScreen : 'calendar'
                });
                return null;
            default:
                return null;
        };
    }

    handleScreen = (type) => {
        switch(type){
            case 'profile':
                return <ProfileScreen />;
            case 'like':
                return <LikeScreen />;
            case 'review':
                return null;
            case 'calendar':
                return null;
            default:
                return null;
        };
    }

    render(){
        return(
            <Container>
                <Header>
                    <MainHeader>
                        <ArrowBackIos
                            style = {{cursor : "pointer", position : "fixed", left : 0, marginLeft : "10%"}}
                            onClick = {() => this.props.history.goBack()}
                        />
                    </MainHeader>
                </Header>
                <Body>
                    <Nav>
                        <ul>
                            <TypeLi>
                                <TypeText 
                                    value = {this.state.typeProfile}
                                    onClick = {() => this.handleOnClick('profile')}
                                >프로필</TypeText>
                            </TypeLi>

                            <TypeLi>
                                <TypeText 
                                    value = {this.state.typeLike}
                                    onClick = {() => this.handleOnClick('like')}
                                >즐겨찾기</TypeText>
                            </TypeLi>

                            <TypeLi>
                                <TypeText
                                    value = {this.state.typeReview}
                                    onClick = {() => this.handleOnClick('review')}
                                >리뷰</TypeText>
                            </TypeLi>

                            <TypeLi>
                                <TypeText
                                    value = {this.state.typeCalendar}
                                    onClick = {() => this.handleOnClick('calendar')}
                                >캘린더</TypeText>
                            </TypeLi>
                        </ul>
                    </Nav>
                    <NavBody>
                        {
                            this.handleScreen(this.state.typeScreen)
                        }
                    </NavBody>
                </Body>
                {
                    this.state.showScroll ? 
                    <ArrowUpBtn onClick = {() => this.scrollToTop()}>
                        <ArrowUpward />
                    </ArrowUpBtn>
                    :null
                }
            </Container>
        );
    }
}

export default Profile;