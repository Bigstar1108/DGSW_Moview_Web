import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { SERVER } from '../../config/config.json';
import { Link } from 'react-router-dom';

const Container = styled.div`
    display : flex;
    width : 100%;
    height : 100%;
    flex-direction : column;
`;

const TopBox = styled.div`
    display : flex;
    width : 100%;
    height : 5%;
    align-items : center;
`;

const InfoText = styled.span`
    font-family : 'Noto Sans KR', sans-serif;
    font-size : 20px;
    font-weight : bold;
    margin-left : 10px;
    margin-top : 10px;
    color : black;
`;

const ListBox = styled.div`
    display : grid;
    grid-template-columns : repeat(5, 300px);
    grid-auto-rows : minmax(450px, auto);
    grid-gap : 10px;
    margin-left : 10px;
    margin-top : 20px;
`;

const ListItem = styled.div`
    display : flex;
    flex-direction : column;
    border-style : solid;
    border-width : 1.5px;
    border-color : black;
`;

const ImageBox = styled.div`
    display : flex;
    width : 100%;
    height : 400px;
`;

const InfoBox = styled.div`
    display : flex;
    width : 100%;
    height : 50px;
    flex-direction : row;
    justify-content : center;
    align-items : center;
`;

class LikeScreen extends React.Component{
    state = {
        result : [],
        totalResult : 0
    }
    
    async componentDidMount(){
        await axios.post(`${SERVER}/bookmark/getbookmark`, {
            name : JSON.parse(localStorage.getItem('member')).Name
        })
        .then((response) => {
            this.setState({
                result : response.data.results,
                totalResult : response.data.total_results
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render(){
        return(
            <Container>
                {
                    this.state.totalResult === 0 ?
                    <InfoText>즐겨찾기 된 영화가 없습니다 :D</InfoText>
                    :
                    <>
                    <TopBox>
                        <InfoText>즐겨찾기 된 {this.state.totalResult}개의 영화가 있습니다</InfoText>
                    </TopBox>

                    <ListBox>
                        {
                            this.state.result.map((data, i) => (
                                <Link to = {`/detail/${data.movieId}`} style = {{ textDecoration : 'none'}}>
                                    <ListItem key = {i} >
                                        <ImageBox>
                                            <img
                                                style = {{width : "100%", height : "100%"}}
                                                src = {`https://image.tmdb.org/t/p/w300${data.moviePoster}`}
                                            />
                                        </ImageBox>
                                        <InfoBox>
                                            <InfoText style = {{margin : 0}}>{data.movieTitle} | {data.movieDate}</InfoText>
                                        </InfoBox>
                                    </ListItem>
                                </Link>
                            ))
                        }
                    </ListBox>
                    </>
                }
            </Container>
        );
    }
}

export default LikeScreen;