import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Slider from 'react-slick';
import '../styles/Home.css';


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
    flex-direction : column;
    background-color : blue;
`;

const SlideContainer = styled.div`
    display : flex;
    width : 100%;
    height : 40%;
    background-color : red;
`;

class Home extends React.Component{
    refreshPage(){
        window.location.reload(false);
    }

    render(){
        return(
            <Container className = "Container">
                <Header />
                <Body>
                    <SlideContainer>
                        
                    </SlideContainer>
                </Body>
            </Container>
        );
    }
};

export default Home;