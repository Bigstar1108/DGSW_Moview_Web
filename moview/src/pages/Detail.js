import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { TMDB_API_KEY } from '../config/config.json';
import defaultApi from '../lib/api/defaultApi';
import axios from 'axios';

const Container = styled.div`
    display : flex;
    width : 100vw;
    height : 100vh;
    align-items : center;
    flex-direction : column;
`;

const Body = styled.div`
    display : flex;
    width : 80%;
    height : 100%;
    flex-direction : column;
    padding-top : 70px;
    background-color : #E6E2E2;
`;

const TobBody = styled.div`
    display : flex;
    width : 100%;
    height : 50%;
`;

const BottomBody = styled.div`
    display : flex;
    width : 100%;
    height : 50%;
    background-color : yellow;
`;

const TobImgBox = styled.div`
    display : flex;
    width : 40%;
    height : 100%;
    justify-content : center;
`;

const TobInfoBox = styled.div`
    display : flex;
    width : 60%;
    height : 100%;
    background-color : green;
`;

class Detail extends React.Component{
    state = {
        Details : [],
        Credits : []
    }

    componentDidMount(){
        const getDetail = defaultApi.get(`${this.props.match.params.movieId}?api_key=${TMDB_API_KEY}&language=ko`);
        const getCredits = defaultApi.get(`${this.props.match.params.movieId}/credits?api_key=${TMDB_API_KEY}&language=ko`)

        axios.all([getDetail, getCredits])
        .then(
            axios.spread((...response) => {
                const Detail = response[0].data;
                const Credit = response[1].data.cast;
                this.setState({
                    Details : Detail,
                    Credits : Credit
                });
            })
        ).catch((error) => {
            console.log(error);
            alert("영화 상세정보를 불러오는데 실패했습니다.");
        })
    }
    render(){
        return(
            <Container>
                <Header />
                
                <Body>
                    <TobBody>
                        <TobImgBox>
                            <img src = {`https://image.tmdb.org/t/p/w300${this.state.Details.poster_path}`} />
                        </TobImgBox>
                        <TobInfoBox></TobInfoBox>
                    </TobBody>
                    <BottomBody></BottomBody>
                </Body>
            </Container>
        );
    }
}

export default Detail;