import React, { Component } from 'react';
import './Home.css';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import moment from 'moment';
const mapStateToProps = state => {
    return { session: state.session }
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        let nextPayday = this.getNextPayday()
        this.state = { nextPayday: nextPayday };
    }

    componentDidMount() {
    }

    getNextPayday() {
        let today = moment()
        let payday = null;
        let week = 1;
        while (!today.isBefore(this.getNthWeekday(today, week, 5))) {
            week += 2;
        }
        payday = this.getNthWeekday(today, week, 5);
        return payday.format('MMMM Do');

    }

    getNthWeekday(baseDate, weekth, day) {
        // parse base date
        var date = moment(baseDate);
        var year = date.year();
        var month = date.month();

        // Convert date to moment (month 0-11)
        var myMonth = moment({ year: year, month: month });
        // assume we won't have to move forward any number of weeks
        var weeksToAdvance = weekth - 1;

        // Get first weekday of the first week of the month
        var firstOccurranceOfDay = myMonth.weekday(day);
        // Check if first weekday occurrance is in the given month
        if (firstOccurranceOfDay.month() !== month) {
            weeksToAdvance++;
        }

        // Return nth weekday of month formatted (custom format)
        return firstOccurranceOfDay.add(weeksToAdvance, 'weeks');

    }

    render() {
        let user = this.props.user || {};
        let username = `${user.firstName} ${user.lastName}` || 'Noname';
        return (
            
            <Container fluid='lg' style={{ 'paddingTop': '1rem' }}>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Welcome {username}!</Card.Title>
                                <Card.Text>
                                    Your next paycheck will be {this.state.nextPayday}
                    </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="auto" />
                    <Col>
                        <Card >
                            <Card.Header>Upcoming Holidays!</Card.Header>
                            <Table borderless style={{'marginBbottom': '0rem'}}>
                                    <tbody>
                                        <tr>
                                            <td >
                                                Christmas Day
                                            </td>
                                            <td >
                                                Fri, Dec 25 2020
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                New Year's Day
                                            </td>
                                            <td >
                                                Wen, Jan 1 2021
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(mapStateToProps)(Dashboard)