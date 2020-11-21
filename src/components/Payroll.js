import React, { Component } from 'react'
import './Home.css'
import { connect } from 'react-redux'
import config from '../config'
import { Container, Table, Row, Col, Card, ListGroup } from 'react-bootstrap'
import request from '../lib/http'
import moment from 'moment';
const mapStateToProps = state => {
    return { session: state.session }
}

class Payroll extends Component {
    constructor(props) {
        super(props);
        this.state = { payroll: [] }
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
                    uri: `${config.employeeUri}/${empNo}/salary/`,
                    resolveWithFullResponse: true,
                })
                const payroll = JSON.parse(response.body)['salaries'];
                this.setState({ payroll })
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    render() {
        const table = []
        // Heading
        table.push(<thead>
            <tr>
                <th>Yearly Salary</th>
                <th>From Date</th>
                <th>To Date</th>
            </tr>
        </thead>)
        // Starting body
        const tableBody = []
        const payroll = this.state.payroll || [];
        const oldestDate = payroll[payroll["length"]-1];
        let total = 0;
        console.log(oldestDate);
        payroll.map(income => {
            if(income.toDate === '9999-01-01' ) {
                const start = parseInt(income.fromDate.split('-')[0]);
                const end = moment().year();
                console.log(parseInt(income.salary));
                total = total + parseInt(income.salary) * (end-start);
            }
            else {
                console.log(parseInt(income.salary)+total);

                total = total + parseInt(income.salary)
            }
            tableBody.push(<tr>
                <td>${income.salary}</td>
                <td>{income.fromDate}</td>
                <td>{income.toDate == '9999-01-01' ? 'Present' : income.toDate}</td>
            </tr>)
            console.log(total);
        })
        table.push(<tbody>{tableBody}</tbody>)

        return (
            <div className="Home">
                <Container fluid='lg' style={{ 'padding-top': '1rem' }}>
                    <h1 style={{'textAlign': 'left'}}>Paystubs</h1>
                    <h5 style={{'textAlign': 'left'}}>Your Yearly Salary from {oldestDate ? oldestDate.fromDate.split('-')[0] : 'Not Found'} to Present </h5>
                    <Row>
                        <Col>
                            <Table>
                                {table}
                            </Table>
                        </Col>
                        <Col>
                            <Card >
                                <Card.Header>Start Date to date Summary</Card.Header>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Total Salary: ${total}</ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Payroll)
