import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Slider from 'react-slick';
import '../styles/Home.css';
import { TMDB_API_KEY } from '../config/config.json';
import defaultApi from '../lib/api/defaultApi';
import NowPlayingCard from '../components/nowPlayingCard';
import { Pause, PlayArrow } from '@material-ui/icons';
import { PacmanLoader } from 'react-spinners';

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
        defaultApi.get(
            `now_playing?api_key=${TMDB_API_KEY}&language=ko&page=1&region=KR`
        ).then((response) => {
            this.setState({
                movieList : response.data.results,
            });
            console.log(this.state.movieList);
        }).catch((error) => {
            console.log(error);
            alert("서버오류 : 현재 상영중인 영화 목록을 불러오는데 실패했습니다.");
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
                                            vote_average = {movieLists.vote_average}
                                            adult = {movieLists.adult}
                                        />
                                    ))
                                }
                            </Slider> : <PacmanLoader loading = {true} color = {"#F03535"} /> }
                            </BottomSliderBox>
                    </SliderContainer>
                </Body>
            </Container>
        );
    }
};

export default Home;