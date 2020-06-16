import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display : flex;
    width : 100vw;
    height : 100vh;
`;

class Profile extends React.Component{
    state = {
        member : JSON.parse(localStorage.getItem('member')),
    }

    render(){
        return(
            <Container>
                <h1>Profile</h1>
            </Container>
        );
    }
}

export default Profile;