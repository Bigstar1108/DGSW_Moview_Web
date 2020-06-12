import React from 'react';
import styled from 'styled-components';

const MainLogo = styled.div`
    width : 130px;
    height : 100%;
    display : flex;
    justify-content : center;
    flex-direction : column;
`;

const LogoText = styled.span`
    font-size : 30px;
    color : black;
    font-family : 'Black Han Sans';
`;

const RedBox = styled.div`
    width : 45%;
    height : 10px;
    background-color : #F03535;
`;

class Logo extends React.Component{
    render(){
        return(
            <MainLogo>
                <RedBox></RedBox>
                <LogoText>Moview</LogoText>
            </MainLogo>
        );
    }
}

export default Logo;