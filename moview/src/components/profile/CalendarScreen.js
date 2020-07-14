import React from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Moment from 'moment';

const Container = styled.div`
    display : flex;
    width : 100%;
    height : 100%;
    flex-direction : column;
`;

const CalendarBox = styled.div`
    display : flex;
    width : 100%;
    height : 40%;
    justify-content : center;
    align-items : center;
`;

class CalendarScreen extends React.Component{
    state = {
        date : new Date(),
    }

    onChange = (date) => {
        this.setState({ date });
    };

    render(){
        return(
            <Container>
                <CalendarBox>
                    <Calendar 
                        onChange = {this.onChange}
                        value = {this.state.date}
                    />
                </CalendarBox>
            </Container>
        );
    }
}

export default CalendarScreen;