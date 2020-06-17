import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display : flex;
    width : 20%;
    height : 100%;
    flex-direction : column;
    background-color : blue;
`;

const ProfileImgBox = styled.div`
    display : flex;
    width : 100%;
    height : 70%;
    background-color : yellow;
`;

class ActorBox extends React.Component{
    render(){
        return(
            <Container>
                <ProfileImgBox>
                    <img
                        style = {{width : "100%", height : "100%"}}
                        alt = {`${this.props.character}역 ${this.props.name} 프로필 이미지`}
                        src = {`https://image.tmdb.org/t/p/w200${this.props.poster}`}
                    />
                </ProfileImgBox>
            </Container>
        );
    }
}

export default ActorBox;