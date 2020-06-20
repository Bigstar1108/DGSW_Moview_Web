import React from 'react';
import styled from 'styled-components';
import { ArrowBackIos, ArrowUpward } from '@material-ui/icons';
import LastKeywordBox from '../components/Search/LastKeywordBox';
import MovieResultBox from '../components/Search/MovieResultBox';
import { TMDB_API_KEY } from '../config/config.json';
import defaultApi from '../lib/api/defaultApi';
import InfiniteScroll from 'react-infinite-scroll-component';

const Container = styled.div`
    display : flex;
    width : 100%;
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

const ArrowUpBtn = styled.button`
    display : flex;
    width : 50px;
    height : 50px;
    outline : none;
    border-radius : 50%;
    border-width : 2px;
    border-style : solid;
    border-color : black;
    justify-content : center;
    align-items : center;
    cursor : pointer;
    background-color : white;
    position : fixed;
    right : 0;
    bottom : 0;
    margin-right : 20px;
    margin-bottom : 5%;
`;

class SearchMovie extends React.Component{
    id = 0;

    state = {
        keyword : "",
        lastKeyword : [],
        movieResult : null,
        searchEvent : false, //검색 버튼을 누르기 전인지 후인지 확인
        limit : true,
        total_results : 0,
        total_pages : 0,
        page : 2,
        showScroll : false
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
        window.addEventListener("scroll", this.checkScrollTop);
    }
    //현재 스크롤이 얼마나 됬는지 확인하는 함수
    checkScrollTop = () => {
        if(!this.state.showScroll && window.pageYOffset > 400){
            this.setState({
                showScroll : true
            });
        }else if(this.state.showScroll && window.pageYOffset <= 400){
            this.setState({
                showScroll : false
            });
        }
    };

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
            `search/movie?api_key=${TMDB_API_KEY}&language=ko&query=${keyword}&page=1&include_adult=false&regin=KR`
        ).then((response) => {
            this.setState({
                movieResult : response.data.results, //영화 검색 결과
                keyword : keyword, 
                searchEvent : true, //검색 버튼 확인 
                total_pages : response.data.total_pages,
                total_results : response.data.total_results
            });
            console.log(this.state.movieResult);
            this.handleArrayPush(this.state.keyword);
            alert("검색결과를 불러왔습니다.");
        }).catch((error) => {
            console.log(error);
            alert("서버오류 : 검색결과를 불러오지 못했습니다.");
        })
    }
    //스크롤이 내려갈 때 마다 새로운 데이터를 불러옴
    FetchData = async () => {
        setTimeout(() => {
            if(this.state.page <= this.state.total_pages){
                defaultApi.get(
                    `search/movie?api_key=${TMDB_API_KEY}&language=ko&query=${this.state.keyword}&page=${this.state.page}&include_adult=false&regin=KR`
                ).then((response) => {
                    const _movieResult = this.state.movieResult.concat(response.data.results);
                    this.setState({
                        movieResult: _movieResult,
                        page: this.state.page + 1
                    });
                }).catch((error) => {
                    console.log(error);
                    alert("서버오류 : 더 많은 영화를 불러오는 중 오류가 발생했습니다.");
                })
            }else{
                this.setState({
                    limit: false,
                });
                return null;
            }
        }, 1500);   
    };

    scrollToTop = () => {
        window.scrollTo({
            top : 0,
            left : 0,
            behavior : 'smooth'
        });
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
                                        this.state.total_results === 0 ?
                                        <>
                                            <ResultBody>
                                                <TypeText style = {{margin : 0}}>{this.state.keyword}의 대한 검색결과가 없습니다.</TypeText>
                                            </ResultBody>
                                        </> : 
                                        <>
                                            <TypeText>총 {this.state.total_results}개의 영화가 있습니다.</TypeText>
                                            <InfiniteScroll
                                                dataLength = {this.state.movieResult.length}
                                                next = {this.FetchData}
                                                hasMore = {this.state.limit}
                                                loader = {<h4>Loading...</h4>}
                                            >
                                            {
                                                this.state.movieResult.map((result, index) => (
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
                                            </InfiniteScroll>
                                            {
                                                this.state.showScroll ? 
                                                <ArrowUpBtn onClick = {() => this.scrollToTop()}>
                                                    <ArrowUpward />
                                                </ArrowUpBtn>
                                                :null
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