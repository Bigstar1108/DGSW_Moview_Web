import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display : flex;
    width : 20%;
    height : 60%;
    flex-direction : column;
    margin-right : 3%;
`;

const ProfileImgBox = styled.div`
    display : flex;
    width : 100%;
    height : 80%;
    margin-bottom : 5px;
`;

const CreditText = styled.span`
    font-family : 'Noto Sans KR', sans-serif;
    font-size : 13px;
    font-weight : bold;
    color : black;
`;

class ActorBox extends React.Component{
    render(){
        return(
            <Container>
                <ProfileImgBox>
                    {
                        this.props.poster === null || this.props.poster === "" ? <span>이미지가 없습니다.</span>
                        : <img
                            style = {{width : "100%", height : "100%"}}
                            alt = {`${this.props.character}역 ${this.props.name} 프로필 이미지`}
                            src = {`https://image.tmdb.org/t/p/w200${this.props.poster}`}
                            />
                    }
                </ProfileImgBox>

                <CreditText>{this.props.character} 역</CreditText>
                <CreditText>{this.props.name}</CreditText>
            </Container>
        );
    }
}

export default ActorBox;