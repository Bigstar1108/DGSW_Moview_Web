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
import { connect } from 'react-redux';

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
    margin-left : 2%;
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

const LikeButton = styled.button`
    width : 90px;
    height : 36px;
    outline : none;
    cursor : pointer;
    font-family : 'Noto Sans KR', sans-serif;
    border-radius : 3px;
    font-size : 13px;
    font-weight : bold;
    position : fixed;
    right : 0;
    margin-right : 10%;
    ${prop => prop.active ? 
    `background-color : #F03535;
     color : white;
     border-style : none;
    ` : 
    `background-color : white;
     border-style : solid;
     border-color : black;
     border-width : 1px;
    `
    }
`;

class Detail extends React.Component{
    state = {
        Details : [], //영화 상세정보
        Credits : [], //배우, 제작진 정보
        DateArray : [], //개봉일 split한 배열
        Genres : [], //장르 모음
        company : [],
        vote : 0, //영화 평점
        Like : false, //즐겨찾기
    }

    componentDidMount(){
        const getDetail = defaultApi.get(`movie/${this.props.match.params.movieId}?api_key=${TMDB_API_KEY}&language=ko`);
        const getCredits = defaultApi.get(`movie/${this.props.match.params.movieId}/credits?api_key=${TMDB_API_KEY}`);

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
                    company : Detail.production_companies,
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
    //기능 추가 필요.
    onClickLike = () => {
        switch(localStorage.getItem('KeepLogin')){
            case 'true':
                if(!(!!localStorage.getItem('member')) || !(!!localStorage.getItem('token'))){
                    alert("로그인을 먼저 해주세요 :D");
                    return null;
                }else{
                    switch(this.state.Like){
                        case true:
                            this.setState({
                                Like : !this.state.Like,
                            });
                            alert("즐겨찾기를 해제했습니다.");
                            return null;
                        case false:
                            this.setState({
                                Like : !this.state.Like,
                            });
                            alert("즐겨찾기에 추가했습니다.");
                            return null;
                        default:
                            return null;
                    }
                }
            case 'false':
                if(!(!!this.props.member) || !(!!this.props.token)){
                    //false면 로그인이 되어있지 않음
                    alert("로그인을 먼저 해주세요 :D");
                    return null;
                }else{
                    switch(this.state.Like){
                        case true:
                            this.setState({
                                Like : !this.state.Like,
                            });
                            alert("즐겨찾기를 해제했습니다.");
                            return null;
                        case false:
                            this.setState({
                                Like : !this.state.Like,
                            });
                            alert("즐겨찾기에 추가했습니다.");
                            return null;
                        default:
                            return null;
                    }
                }
            default:
                alert("로그인을 먼저 해주세요 :D");
        }
    }

    render(){
        return(
            <Container>
                <Header />
                
                <Body>
                    <TobBody>
                        <LikeButton active = {this.state.Like} onClick = {() => this.onClickLike()} >즐겨찾기</LikeButton>
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
                                    <span className = "type">제작사/수입/배급사 : </span>
                                    {
                                        this.state.company.slice(0, 3).map((company, index) => (
                                            <div style = {{marginLeft : "5px"}}>
                                                <span key = {index}> {company.name} </span>
                                            </div>
                                        ))
                                    }
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
                                    <span className = "type" style = {{marginLeft : "10px"}}>총 {this.state.Details.vote_count}명</span>
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
                                    <CreditExtraText to = {`/detail/${this.state.Details.id}/credit`}>
                                        더보기
                                    </CreditExtraText>
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

let mapStateToProps = (state) => {
    return{
        member : state.Login.member, //state.리듀서.원하는변수
        token : state.Login.member
    };
}

Detail = connect(mapStateToProps)(Detail);

export default Detail;