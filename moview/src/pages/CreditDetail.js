import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const Container = styled.div`
    display : flex;
    width : 100vw;
    height : 100vh;
    flex-direction : column;
    align-items : center;
`;

const Body = styled.div`
    display : flex;
    width : 80%;
    height : 100%;
    padding-top : 80px;
    flex-direction : column;
`;

class CreditDetail extends React.Component{
    render(){
        return(
            <Container>
                <Header />

                <Body>
                    
                </Body>
            </Container>
        );
    }
}

export default CreditDetail;