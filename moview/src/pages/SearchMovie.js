import React from 'react';
import styled from 'styled-components';
import { ArrowBackIos } from '@material-ui/icons';

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
    border-bottom-width : 1px;
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
    background-color : blue;
`;

class SearchMovie extends React.Component{
    id = 0
    state = {
        keyword : "",
        lastKeyword : []
    }

    handleChange = (e) => {
        this.setState({
            keyword : e.target.value
        })
    }

    handleArrayPush = (keyword) => {
        this.setState({
            lastKeyword : this.state.lastKeyword.concat({ id : this.id++, keyword : keyword })
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.keyword === ""){
            alert("영화 제목을 입력해주세요.");
            return null;
        }else{
            this.handleArrayPush(this.state.keyword);
            localStorage.setItem('lastKeyword', JSON.stringify(this.state.lastKeyword));
            console.log(JSON.parse(localStorage.getItem('lastKeyword')));
        }
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
                        <span>dd</span>
                        :<span>aa</span>
                    }
                </Body>
            </Container>
        );
    }
}

export default SearchMovie;