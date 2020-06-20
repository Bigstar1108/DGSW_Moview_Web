import React from 'react';
import styled from 'styled-components';
import { ArrowBackIos } from '@material-ui/icons';
import LastKeywordBox from '../components/Search/LastKeywordBox';
import MovieResultBox from '../components/Search/MovieResultBox';
import { TMDB_API_KEY } from '../config/config.json';
import defaultApi from '../lib/api/defaultApi';

const Container = styled.div`
    display : flex;
    width : 100vw;
    height : 100vh;
    flex-direction : column;
    align-items : center;
`;
//Header
const Header = styled.div`
    display : flex;
    width : 100vw;
    height: 70px;
    background-color : #fff;
    border-bottom-style : solid;
    border-bottom-width : 1.5px;
    border-bottom-color : #f7f7fa;
    justify-content : center;
    position : fixed;
    top : 0;
    right : 0;
    left : 0;
`;

const MainHeader = styled.div`
    display : flex;
    width : 80%;
    height : 100%;
    align-items : center;
    justify-content : center;
    flex-direction : row;
`;

const SearchBar = styled.form`
    display : flex;
    width : 40%;
    height : 100%;
    flex-direction : row;
    align-items : center;
`;

const SearchInput = styled.input`
    width : 80%;
    height : 30px;
    outline : none;
    border-radius : 4px;
    border-bottom-right-radius : 0px;
    border-top-right-radius : 0px;
    border-width : 2px;
    border-color : #F03535;
    border-right-style : none;
    font-family : 'Noto Sans KR', sans-serif;
    font-size : 14px;
    padding-left : 10px;
`;

const SearchButton = styled.button`
    width : 10%;
    height : 36px;
    outline : none;
    cursor : pointer;
    border-radius : 4px;
    border-bottom-left-radius : 0px;
    border-top-left-radius : 0px;
    border-style : none;
    font-size : 16px;
    color : white;
    background-color : #F03535;
`;
//Body
const Body = styled.div`
    display : flex;
    width : 80%;
    height : 100%;
    padding-top : 70px;
    flex-direction : column;
`;

const TypeText = styled.span`
    font-family : 'Noto Sans KR', sans-serif;
    font-size : 20px;
    font-weight : bold;
    color : black;
    margin-top : 10px;
    margin-bottom : 20px;
`;

const ResultBody = styled.div`
    display : flex;
    width : 100%;
    height: 100%;
    flex-direction : column;
    justify-content : center;
    align-items : center;
`;

class SearchMovie extends React.Component{
    id = 0
    state = {
        keyword : "",
        lastKeyword : [],
        movieResult : null,
        searchEvent : false //검색 버튼을 누르기 전인지 후인지 확인
    }

    handleChange = (e) => {
        this.setState({
            keyword : e.target.value
        })
        if(e.target.value === ""){
            this.setState({
                searchEvent : false
            });
        }
    }

    async componentDidMount(){
        await this.checkLastKeyword();
    }

    //localStorage에 있는 최근검색어 배열이 공백인지 확인
    checkLastKeyword = () => {
        switch(!!JSON.parse(localStorage.getItem('lastKeyword'))){
            case true:
                this.setState({
                    lastKeyword : JSON.parse(localStorage.getItem('lastKeyword')),
                });
                return null;
            case false:
                return null;
            default:
                return null;
        }
    }

    //최근 검색어 배열에 새로운 키워드의 유무를 확인하는 함수
    getIndex = (arr, prop, value) => {
        for(var i = 0; i < arr.length; i++){
            if(arr[i][prop] === value){
                return true;
            }
        }
        return false;
    }

    //배열에 항목을 추가하여 localStorage에 저장
    handleArrayPush = (keyword) => {
        switch(this.getIndex(this.state.lastKeyword, "keyword", this.state.keyword)){
            case true:
                console.log(keyword + "는 이미 미리보기에 존재합니다.");
                return null;
            case false:
                var _lastKeyword = this.state.lastKeyword.concat ({ id : this.id++, keyword : keyword});
                this.setState({
                    lastKeyword : _lastKeyword,
                });
                localStorage.setItem('lastKeyword', JSON.stringify(_lastKeyword));
                return null;
            default:
                return null;
        }
    }

    //배열에 항목을 삭제하여 localStorage에 저장
    handleArrayRemove = (id) => {
        var _lastKeyword = this.state.lastKeyword.filter(data => data.id !== id);
        this.setState({
            lastKeyword : _lastKeyword,
        });
        localStorage.setItem('lastKeyword', JSON.stringify(_lastKeyword));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.keyword === ""){
            alert("영화 제목을 입력해주세요.");
            return null;
        }else{
            this.handleSearch(this.state.keyword);
        }
    }

    handleSearch = (keyword) => {
        defaultApi.get(
            `search/movie?api_key=${TMDB_API_KEY}&language=ko&query=${keyword}&page=1&include_adult=true&regin=KR`
        ).then((response) => {
            this.setState({
                movieResult : response.data, //영화 검색 결과
                keyword : keyword, 
                searchEvent : true //검색 버튼 확인 
            });
            console.log(this.state.movieResult);
            this.handleArrayPush(this.state.keyword);
            alert("검색결과를 불러왔습니다.");
        }).catch((error) => {
            console.log(error);
            alert("서버오류 : 검색결과를 불러오지 못했습니다.");
        })
    }

    render(){
        return(
            <Container>
                <Header>
                    <MainHeader>
                        <ArrowBackIos style = {{cursor : "pointer", position : "fixed", left : 0, marginLeft : "10%"}} onClick = {() => this.props.history.goBack()} />
                        <SearchBar onSubmit = {this.handleSubmit}>
                            <SearchInput 
                                type= "text"
                                placeholder = "영화 제목을 검색해주세요"
                                value = {this.state.keyword}
                                onChange = {this.handleChange}
                            />
                            <SearchButton type = "submit">검색</SearchButton>
                        </SearchBar>
                    </MainHeader>
                </Header>

                <Body>
                    {
                        this.state.keyword === "" ? 
                        <>
                            {
                                !(this.state.lastKeyword.length === 0) ?
                                <>
                                    <TypeText>최근 검색어</TypeText>
                                    {
                                    this.state.lastKeyword.map((data, index) => (
                                    <LastKeywordBox
                                        key = {index}
                                        id = {data.id}
                                        keyword = {data.keyword}
                                        lastKeyword = {this.state.lastKeyword}
                                        handleArrayRemove = {this.handleArrayRemove}
                                        handleSearch = {this.handleSearch}
                                    />
                                ))}</> : <TypeText>최근 검색어가 없습니다...</TypeText>
                            }
                        </>
                        :
                        <>
                            {
                                this.state.searchEvent ? 
                                <>
                                    {
                                        this.state.movieResult.total_results === 0 ?
                                        <>
                                            <ResultBody>
                                                <TypeText style = {{margin : 0}}>{this.state.keyword}의 대한 검색결과가 없습니다.</TypeText>
                                            </ResultBody>
                                        </> : 
                                        <>
                                            <TypeText>총 {this.state.movieResult.total_results}개의 영화가 있습니다.</TypeText>
                                            {
                                                this.state.movieResult.results.map((result, index) => (
                                                    <MovieResultBox
                                                        key = {index}
                                                        id = {result.id}
                                                        title = {result.title}
                                                        poster = {result.poster_path}
                                                        date = {result.release_date}
                                                        vote_average = {Math.round(result.vote_average) / 2}
                                                        adult = {result.adult}
                                                    />
                                                ))
                                            }
                                        </>
                                    }
                                </>
                                :
                                <ResultBody>
                                    <TypeText style = {{margin : 0}}>찾고싶은 영화의 제목을 검색해주세요!<br />무뷰가 최대한 빨리 결과를 가져오겠습니다 :D</TypeText>
                                </ResultBody>
                            }
                        </>
                    }
                </Body>
            </Container>
        );
    }
}

export default SearchMovie;