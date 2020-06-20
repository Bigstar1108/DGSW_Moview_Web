import React from 'react';
import styled from 'styled-components';
import '../../styles/nowPlayingCard.css';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

const Container = styled.div`
    display : flex;
    width : 100%;
    height : 320px;
    flex-direction : row;
    align-items : center;
    border-top-width : 1.5px;
    border-top-color : black;
    border-top-style : solid;
`;

const ImageBox = styled.div`
    display : flex;
    width : 15%;
    height : 300px;
    justify-content : center;
    align-items : center;
`;

const InfoBox = styled.div`
    display : flex;
    width : 80%;
    height : 100%;
    flex-direction : column;
`;

const RateBox = styled.div`
    display : flex;
    width : 100%;
    flex-direction : row;
    align-items : center;
    margin-left : 10px;
`;

class MovieResultBox extends React.Component{
    render(){
        return(
            <Link to = {`/detail/${this.props.id}`} style = {{textDecoration : "none"}}>
                <Container>
                    <ImageBox>
                        {
                            this.props.poster ? 
                            <img
                                style = {{width : "100%", height : "100%"}}
                                src = {`https://image.tmdb.org/t/p/w300${this.props.poster}`}
                            /> : <span className = "adult">포스터 이미지가 없습니다.</span>
                        }
                    </ImageBox>

                    <InfoBox>
                        <span className = "title" style = {{marginTop : "5px"}}>{this.props.title}</span>
                        {
                            this.props.adult ? <span className = "adult">청소년 관람불가</span> : <span className = "adult">청소년 관람가능</span>
                        }
                        <span className = "date">{this.props.date}</span>
                        <RateBox>
                            <StarRatings
                                rating = {this.props.vote_average}
                                numberOfStars = {5}
                                starRatedColor = "#F03535"
                                starDimension = "15px"
                                starSpacing = '3px'
                            />
                            <span className = "rating">{this.props.vote_average}</span>
                        </RateBox>
                    </InfoBox>
                </Container>
            </Link>
        );
    }
}

export default MovieResultBox;