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
    border-bottom-width : 1.5px;
    border-bottom-color : black;
    border-bottom-style : solid;
    border-top-color : black;
    border-top-style : solid;
    margin-bottom : 5px;
`;

const ImageBox = styled.div`
    display : flex;
    width : 15%;
    height : 300px;
    justify-content : center;
    align-items : center;
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
                </Container>
            </Link>
        );
    }
}

export default MovieResultBox;