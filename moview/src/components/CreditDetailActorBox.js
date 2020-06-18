import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display : flex;
    width : 100%;
    height : 100%;
    flex-direction : row;
    cursor : pointer;
`;

const ProfileImgBox = styled.div`
    display : flex;
    width : 40%;
    height : 100%;
`;

const ProfileInfoBox = styled.div`
    display : flex;
    width : 60%;
    height : 100%;
    flex-direction : column;
    margin-left : 10px;
`;

const InfoText = styled.span`
    font-family : 'Noto Sans KR', sans-serif;
    font-size : 15px;
    font-weight : bold;
    color : black;
`;

class CreditDetailActorBox extends React.Component{
    render(){
        return(
            <Container onClick = {() => window.open(`https://www.google.com/search?q=${this.props.name}`, "_blank")}>
                <ProfileImgBox>
                    {
                        this.props.poster === null || this.props.poster === "" ? <InfoText>프로필 이미지가 없습니다.</InfoText>
                        : <img
                            style = {{width : "100%", height : "100%"}}
                            alt = {`${this.props.character}역 ${this.props.name} 프로필 이미지`}
                            src = {`https://image.tmdb.org/t/p/w200${this.props.poster}`}
                            />
                    }
                </ProfileImgBox>

                <ProfileInfoBox>
                    <InfoText>{this.props.character} 역</InfoText>
                    <InfoText>{this.props.name}</InfoText>
                </ProfileInfoBox>
            </Container>
        );
    }
}

export default CreditDetailActorBox;