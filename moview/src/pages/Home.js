import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Slider from 'react-slick';
import '../styles/Home.css';
import { TMDB_API_KEY } from '../config/config.json';
import { SERVER } from '../config/config.json';
import defaultApi from '../lib/api/defaultApi';
import NowPlayingCard from '../components/nowPlayingCard';
import { Pause, PlayArrow } from '@material-ui/icons';
import { PacmanLoader } from 'react-spinners';
import axios from 'axios';

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
    align-items : center;
`;

const SliderContainer = styled.div`
    display : flex;
    width : 95%;
    height : 40%;
    flex-direction : column;
`;

const TopSliderBox = styled.div`
    display : flex;
    width : 100%;
    height : 5%;
    margin-top : 10px;
    margin-bottom : 10px;
    justify-content : flex-end;
`;

const BottomSliderBox = styled.div`
    display : flex;
    width : 100%;
    height : 95%;
    justify-content : center;
    align-items : center;
`;

const ControlSlideBtn = styled.button`
    display : flex;
    width : 20px;
    height : 20px;
    outline : none;
    border-radius : 50%; 
    border-width : 1px;
    border-style : solid;
    border-color : black;
    justify-content : center;
    align-items : center;
    margin-left : 3px;
    cursor : pointer;
    background-color : white;

    ${({ active }) => active && `
        background-color : #F03535;
    `}
`;

const BottomBox = styled.div`
    display : flex;
    width : 100%;
    height : 60%;
    margin-top : 20px;
    flex-direction : row;
`;

const BottomTextContainer = styled.div`
    display : flex;
    width : 45%;
    height : 90%;
    flex-direction : column;
    justify-content : center;
`;

const BottomEventContainer = styled.div`
    display : flex;
    width : 55%;
    height : 100%;
    background-color : red;
`;

const getMember = axios.get(`${SERVER}/auth/all`);
const getReview = axios.get(`${SERVER}/review/all`);
const getNowPlaying = defaultApi.get(`movie/now_playing?api_key=${TMDB_API_KEY}&language=ko&page=1&region=KR`);

class Home extends React.Component{
    state = {
        movieList : [],
        pauseActive : false,
        playActive : true
    }

    onClickSliderBtn = (type) => {
        switch(type){
            case 'pause':
                this.setState({
                    pauseActive : !this.state.pauseActive,
                    playActive : false
                });
                this.slider.slickPause();
                return null;
            case 'play':
                this.setState({
                    playActive : !this.state.playActive,
                    pauseActive : false
                });
                this.slider.slickPlay();
                return null;
            default:
                return null;
        }
    }

    componentDidMount(){
        axios.all([getMember, getReview, getNowPlaying])
        .then(axios.spread((...response) => {
            const Member = response[0];
            const Review = response[1];
            const NowPlaying = response[2];

            this.setState({
                movieList : NowPlaying.data.results,
                member : Member.data.total_results,
                review : Review.data.total_results
            });
        })).catch((error) => {
            console.log(error);
            alert("서버오류!");
        })
    }

    render(){
        const settings = {
            dots : true,
            infinite : true,
            speed : 1500,
            slidesToShow : 3,
            slidesToScroll : 2,
            autoplay : true,
            autoplaySpeed : 1000
        }

        return(
            <Container>
                <Header />
                <Body>
                    <SliderContainer>
                        <TopSliderBox>
                            <ControlSlideBtn active = {this.state.pauseActive} onClick = {() => this.onClickSliderBtn('pause')}><Pause style = {{fontSize : '11px'}} /></ControlSlideBtn>
                            <ControlSlideBtn active = {this.state.playActive} onClick = {() => this.onClickSliderBtn('play')}><PlayArrow style = {{fontSize : "11px"}} /></ControlSlideBtn>
                        </TopSliderBox>
                        
                        <BottomSliderBox>
                            {this.state.movieList && this.state.movieList.length > 0 ? 
                                <Slider {...settings} style = {{width : "100%", heihgt : "100%"}} ref = {slider => (this.slider = slider)}>
                                {
                                    this.state.movieList.slice(0, 10).map((movieLists, index) => (
                                        <NowPlayingCard
                                            key = {index}
                                            id = {movieLists.id}
                                            title = {movieLists.title}
                                            poster = {movieLists.poster_path}
                                            date = {movieLists.release_date}
                                            vote_average = {Math.round(movieLists.vote_average)/2}
                                            adult = {movieLists.adult}
                                        />
                                    ))
                                }
                            </Slider> : <PacmanLoader loading = {true} color = {"#ffff00"} /> }
                            </BottomSliderBox>
                    </SliderContainer>

                    <BottomBox>
                        <BottomTextContainer>
                            <span className = "InfoText"><span style = {{color : "#F03535", fontWeight : "bold"}}>무뷰</span>는</span>
                            <span className = "InfoText">총 <b>{this.state.member}명</b>의 <span style = {{color : "#F03535", fontWeight : "bold"}}>무뷰어</span>님들의</span>
                            <span className = "InfoText"><b>{this.state.review}개</b>의 리뷰로 이루어져 있습니다!</span>
                        </BottomTextContainer>
                        <BottomEventContainer></BottomEventContainer>
                    </BottomBox>
                </Body>
            </Container>
        );
    }
};

export default Home;