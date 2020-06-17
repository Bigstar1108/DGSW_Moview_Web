import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { TMDB_API_KEY } from '../config/config.json';
import defaultApi from '../lib/api/defaultApi';
import axios from 'axios';
import '../styles/Detail.css';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import ActorBox from '../components/CreditActorBox';

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
    padding-top : 80px;
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
`;

const TobImgBox = styled.div`
    display : flex;
    width : 20%;
    height : 100%;
`;

const TobInfoBox = styled.div`
    display : flex;
    width : 80%;
    height : 100%;
    flex-direction : column;
`;

const CreditBox = styled.div`
    display : flex;
    width : 50%;
    height : 100%;
    flex-direction : column;
`;

const ReviewBox = styled.div`
    display : flex;
    width : 50%;
    height : 100%;
    flex-direction : column;
    background-color : blue;
`;

const CreditTopBox = styled.div`
    display : flex;
    width : 100%;
    height : 10%;
    justify-content : flex-end;
`;

const CreditBottomBox = styled.div`
    display : flex;
    width : 100%;
    height : 90%;
    flex-direction : row;
`;

const CreditExtraText = styled(Link)`
    text-decoration : none;
    font-size : 15px;
    font-family: 'Noto Sans KR', sans-serif;
    color : black;
    margin-right : 3%;
`;

class Detail extends React.Component{
    state = {
        Details : [],
        Credits : [],
        DateArray : [],
        Genres : [],
        vote : 0
    }

    componentDidMount(){
        const getDetail = defaultApi.get(`${this.props.match.params.movieId}?api_key=${TMDB_API_KEY}&language=ko`);
        const getCredits = defaultApi.get(`${this.props.match.params.movieId}/credits?api_key=${TMDB_API_KEY}`)

        axios.all([getDetail, getCredits])
        .then(
            axios.spread((...response) => {
                const Detail = response[0].data;
                const Credit = response[1].data.cast;
                const DateArray = Detail.release_date.split('-');
                const voteAverage = Math.round(Detail.vote_average)/2;
                this.setState({
                    Details : Detail,
                    Credits : Credit,
                    DateArray : DateArray,
                    Genres : Detail.genres,
                    vote : voteAverage
                });
                console.log(Detail);
                console.log(Credit);
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
                        <TobInfoBox>
                            <div className = "TobBox">
                                <div className = "titleBox">
                                    <span className = "Detailtitle">{this.state.Details.title}</span>
                                    <span className = "textBar">|</span>
                                    <span className = "yeardate">{this.state.DateArray[0]}</span>
                                </div>

                                <div className = "InfoTextBox">
                                    <span className = "type">장르 : </span>
                                    {
                                        this.state.Genres.map((genres, i) => (
                                            <div style = {{marginLeft : "5px"}}>
                                                <span key = {i}> {genres.name} </span>
                                            </div>
                                        ))
                                    }
                                </div>
                                
                                <div className = "InfoTextBox">
                                    <span className = "type">청소년 관람가능여부 : </span>
                                    <span className = "DetailText">
                                        {
                                            this.state.Details.adult ?
                                            "청소년 관람불가" : "청소년 관람가능"
                                        }
                                    </span>
                                </div>

                                <div className = "InfoTextBox">
                                    <span className = "type">개봉일 : </span>
                                    <span className = "DetailText">{this.state.Details.release_date}</span>
                                    <span className = "textBar">|</span>
                                    <span className = "type">런타임 : </span>
                                    <span className = "DetailText">{this.state.Details.runtime} 분</span>
                                </div>

                                <div className = "InfoTextBox">
                                    <span className = "type">영화 평점 : </span>
                                    <StarRatings
                                        rating = {this.state.vote}
                                        numberOfStars = {5}
                                        starRatedColor = "#F03535"
                                        starDimension = "13px"
                                        starSpacing = '2px'
                                    />
                                    <span className = "type" style = {{marginLeft : "10px"}}>{Math.round(this.state.Details.vote_average)/2}점</span>
                                    <span className="textBar">|</span>
                                    <span className = "type">무뷰어 평점 : </span>
                                    <StarRatings
                                        rating = {3}
                                        numberOfStars = {5}
                                        starRatedColor = "#F03535"
                                        starDimension = "13px"
                                        starSpacing = '2px'
                                    />
                                    <span className = "type" style = {{marginLeft : "10px"}}>3점,</span>
                                    <span className = "type" style = {{marginLeft : "10px"}}>총 3명</span>
                                    <span className = "textBar">|</span>
                                    <span className = "type">나의 평점 : </span>
                                    <StarRatings
                                        rating = {3}
                                        numberOfStars = {5}
                                        starRatedColor = "#F03535"
                                        starDimension = "13px"
                                        starSpacing = '2px'
                                    />
                                    <span className = "type" style = {{marginLeft : "10px"}}>3점</span>
                                </div>
                            </div>

                            <div className = "BottomBox">
                                <span className = "DetailTagline">"{this.state.Details.tagline}"</span>
                                <div className = "DetailOverviewBox">
                                    <span className = "type">줄거리</span>
                                    <span className = "DetailOverview">{this.state.Details.overview}</span>
                                </div>
                            </div>
                        </TobInfoBox>
                    </TobBody>

                    <BottomBody>
                        <CreditBox>
                            <span className = "type" style = {{marginTop : "10px"}}>배우/제작진</span>
                                <CreditTopBox>
                                    <CreditExtraText to = {`/detail/${this.state.Details.id}/credit`}>더보기</CreditExtraText>
                                </CreditTopBox>

                                <CreditBottomBox>
                                    {
                                        this.state.Credits.slice(0, 5).map((credit, i) => (
                                            <ActorBox
                                                key = {i}
                                                poster = {credit.profile_path}
                                                character = {credit.character}
                                                name = {credit.name}
                                            />
                                        ))
                                    }
                                </CreditBottomBox>
                        </CreditBox>

                        <ReviewBox>
                            <span className = "type" style = {{marginTop : "10px"}}>리뷰</span>
                            <CreditTopBox>
                                <CreditExtraText>더보기</CreditExtraText>
                            </CreditTopBox>
                        </ReviewBox>
                    </BottomBody>
                </Body>
            </Container>
        );
    }
}

export default Detail;