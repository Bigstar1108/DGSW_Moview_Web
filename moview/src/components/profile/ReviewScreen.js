import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { SERVER } from '../../config/config.json';
import Moment from 'moment';
import StarRatings from 'react-star-ratings';

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
    grid-auto-rows : minmax(200px, auto);
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

const ItemTopBox = styled.div`
    display : flex;
    width : 100%;
    height : 40%;
    flex-direction : column;
    border-bottom-color : black;
    border-bottom-style : solid;
    border-bottom-width : 1px;
`;

const ItemBottomBox = styled.div`
    display : flex;
    width : 100%;
    height : 60%;
`;

class ReviewScreen extends React.Component{
    state = {
        result : [],
        totalResult : 0
    }

    async componentDidMount(){
        await axios.post(`${SERVER}/review/author`, {
            author : JSON.parse(localStorage.getItem('member')).Name
        })
        .then((response) => {
            this.setState({
                result : response.data.results,
                totalResult : response.data.total_results
            });
            console.log(response);
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
                        <InfoText>작성하신 {this.state.totalResult}개의 리뷰를 불러왔습니다</InfoText>
                    </TopBox>

                    <ListBox>
                        {
                            this.state.result.map((data, i) => (
                                <ListItem key = {i}>
                                    <ItemTopBox>
                                        <div style = {{display : 'flex', width : "100%", height : "50%", flexDirection : "row", alignItems : "flex-end"}}>
                                            <InfoText style = {{margin : 0, marginLeft : "10px"}}>{data.movieName}</InfoText>
                                            <InfoText style = {{margin : 0, marginLeft : "10px", fontSize : "14px"}}>| {Moment(data.updatedAt).format('YYYY-MM-DD')}</InfoText>
                                        </div>

                                        <div style = {{display : 'flex', width : "100%", height : "50%", flexDirection : "row", alignItems : "center", paddingLeft : "10px"}}>
                                            <StarRatings
                                                rating = {parseInt(data.vote)}
                                                numberOfStars = {5}
                                                starRatedColor = "#F03535"
                                                starDimension = "15px"
                                                starSpacing = '3px'
                                            />
                                        </div>
                                    </ItemTopBox>
                                    <ItemBottomBox>
                                        <InfoText style = {{fontSize : "14px"}}>
                                            "{data.content}"
                                        </InfoText>
                                    </ItemBottomBox>
                                </ListItem>
                            ))
                        }
                    </ListBox>
                    </>
                }
            </Container>
        );
    }
}

export default ReviewScreen;