import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Slider from 'react-slick';
import { PacmanLoader } from 'react-spinners';
import { TMDB_API_KEY } from '../config/config.json';
import defaultApi from '../lib/api/defaultApi';
import CreditDetailActorBox from '../components/CreditDetailActorBox';

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
    padding-top : 70px;
    flex-direction : column;
    justify-content : center;
`;

const CreditBox = styled.div`
    display : flex;
    width : 95%;
    height : 40%;
    flex-direction : column;
    justify-content : center;
    align-items : center;
`;

const TypeText = styled.span`
    font-family : 'Noto Sans KR', sans-serif;
    font-size : 18px;
    font-weight : bold;
    color : black;
    align-self : flex-start;
    margin-bottom : 10px;
`;

class CreditDetail extends React.Component{
    state = {
        credit : null,
    }

    componentDidMount(){
        defaultApi.get(`movie/${this.props.match.params.movieId}/credits?api_key=${TMDB_API_KEY}`)
        .then((response) => {
            this.setState({
                credit : response.data.cast,
            })
            console.log(response.data.cast);
        })
        .catch((error) => {
            console.log(error);
            alert("배우/제작사 정보를 불러오는데 실패했습니다.");
        })
    }
    render(){
        const creditsettings = {
            dots : true,
            infinite : true,
            speed : 1000,
            slidesToShow : 3,
            slidesToScroll : 2,
        }

        return(
            <Container>
                <Header />

                <Body>
                    <CreditBox>
                        {
                            
                            !!this.state.credit ? 
                            <>
                            <TypeText>배우</TypeText>
                            <Slider {...creditsettings} style = {{width : "100%", heihgt : "100%"}}>
                            {
                                this.state.credit.map((data, index) => (
                                    <CreditDetailActorBox
                                        key = {index}
                                        character = {data.character}
                                        name = {data.name}
                                        poster = {data.profile_path}
                                    />
                                ))
                            }
                            </Slider></> : <PacmanLoader loading = {true} color = {"#ffff00"} />
                        }
                    </CreditBox>
                </Body>
            </Container>
        );
    }
}

export default CreditDetail;