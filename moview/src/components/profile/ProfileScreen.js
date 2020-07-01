import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display : flex;
    width : 100%;
    height : 100%;
    justify-content : center;
    align-items : center;
`;

const InfoText = styled.span`
    font-family: 'Noto Sans KR', sans-serif;
    font-size : 20px;
    font-weight : bold;
`;

class ProfileScreen extends React.Component{
    state = {
        name : JSON.parse(localStorage.getItem('member')).Name,
    }
    render(){
        return(
            <Container>
            </Container>
        );
    }
}

export default ProfileScreen;