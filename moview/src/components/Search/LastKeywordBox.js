import React from 'react';
import styled from 'styled-components';
import { Clear } from '@material-ui/icons';

const Container = styled.div`
    display : flex;
    width : 100%;
    height : 60px;
    flex-direction : row;
    align-items : center;
    border-bottom-width : 1.5px;
    border-bottom-style : solid;
    border-color : #f7f7fa;
`;

const KeywordText = styled.span`
    font-size : 16px;
    color : #CECED3;
    font-family : 'Noto Sans KR', sans-serif;
    font-weight : bold;
    cursor : pointer;
`;

class LastKeywordBox extends React.Component{
    render(){
        return(
            <Container>
                <KeywordText
                    onClick = {() => this.props.handleSearch(this.props.keyword)}
                >
                    {this.props.keyword}
                </KeywordText>
                <Clear
                    style = {{position : 'fixed', right : 0, marginRight : "10%", color : "#CECED3", cursor : "pointer"}}
                    onClick = {() => this.props.handleArrayRemove(this.props.id)}
                />
            </Container>
        );
    }
}

export default LastKeywordBox;