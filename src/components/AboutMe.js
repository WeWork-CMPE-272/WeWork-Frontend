import React, { Component } from 'react'
import { connect } from 'react-redux'
import config from '../config'
import { Container, Row, Col, Card, ListGroup, Table } from 'react-bootstrap'
import request from '../lib/http'
import moment from 'moment';
const mapStateToProps = state => {
    return { session: state.session }
}

class AboutMe extends Component {
    constructor(props) {
        super(props);
        this.state = { aboutMe: {} };
    }

    async componentDidMount() {
        if (this.props.session.isLoggedIn) {
            // Call the API server GET /users endpoint with our JWT access token
            console.log(config);
            let response = null;
            try {
                const empNo = this.props.user.empNo;
                console.log(config.loginUri);
                response = await request({
                    method: 'GET',
                    uri: `${config.employeeUri}/${empNo}/`,
                    resolveWithFullResponse: true,
                })
                const aboutMe = JSON.parse(response.body);
                console.log(aboutMe);
                this.setState({ aboutMe })
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    getNextWorkAniversary(hireDate) {
        const parts = hireDate.split('-');
        const today = moment();
        const curYear = today.year();
        let aniversary = moment({ year: curYear, month: parts[1], days: parts[2] });
        if(aniversary.isBefore(today)) {
            aniversary = aniversary.add(1,'Y').format('YYYY-MM-DD');
        }
        const yearsWorked = parseInt(curYear) - parseInt(parts[0]);
        return { yearsWorked, aniversary};

    }
    render() {
        const aboutMe = this.state.aboutMe;
        console.log(aboutMe);
        let yearsWorked = '';
        let aniversary = '';
        const tableBody = { 'Basic': {}, 'Employee': {} };
        if (aboutMe.hasOwnProperty('empNo')) {
            tableBody['Basic']['Full Name'] = `${aboutMe.firstName} ${aboutMe.lastName}`;
            tableBody['Basic']['Gender'] = aboutMe.gender;
            tableBody['Basic']['Birthday'] = aboutMe.birthday;
            tableBody['Employee']['Employee Number'] = aboutMe.empNo;
            tableBody['Employee']['Role'] = aboutMe.title;
            tableBody['Employee']['Department'] = aboutMe.department.name;
            tableBody['Employee']['Manager'] = `${aboutMe.department.deptManager.firstName} ${aboutMe.department.deptManager.lastName}`;
            tableBody['Employee']['Hire Date'] = aboutMe.hireDate;
            let res = this.getNextWorkAniversary(aboutMe.hireDate);
            yearsWorked = res.yearsWorked;
            aniversary = res.aniversary;
        }

        const right = {
            'textAlign': 'right'
        }

        const left = {
            'textAlign': 'left'
        }

        // Construct table
        const table = [];
        for (const [section, info] of Object.entries(tableBody)) {
            console.log(section);
            console.log(info);
            table.push(<div>
                <h3 style={left}>{section}</h3>
            </div>)
            let body = [];
            for (const [field, value] of Object.entries(info)) {
                console.log(field);
                console.log(value);
                body.push(<tr>
                    <td style={right}>
                        {field}
                    </td>
                    <td style={left}>
                        {value}
                    </td>
                </tr>);
            }
            console.log(body);
            table.push(<tbody>{body}</tbody>)
        }

        return (
            <div className="Home">
                <Container fluid='lg' style={{ 'padding-top': '1rem' }}>
                    <h1 style={left}>{tableBody['Basic']['Full Name']}</h1>
                    <Row>
                        <Col>
                            <Table borderless>
                                 {table}
                            </Table>
                        </Col>
                        <Col>
                            <Card >
                                <Card.Header>Career Summary</Card.Header>
                                <Table borderless style={{'margin-bottom': '0rem'}}>
                                    <tbody>
                                        <tr>
                                            <td style={right}>
                                                Worked at WeWork for
                                            </td>
                                            <td style={left}>
                                                {yearsWorked} years
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={right}>
                                                Next Work Aniversary
                                            </td>
                                            <td style={left}>
                                                {aniversary}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default connect(mapStateToProps)(AboutMe)
