import React, { Component } from 'react'
import { connect } from 'react-redux'
import config from '../config'
import { Container, Table, Tab, Tabs, Pagination, Button, ButtonGroup, Modal } from 'react-bootstrap'
import request from '../lib/http'
const mapStateToProps = state => {
    return { session: state.session }
}

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = { employees: [], pagination: 0, tab: 'employee', message: null, show: false, toPromote: {}, title: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    async componentDidMount() {
        if (this.props.session.isLoggedIn) {
            // Call the API server GET /users endpoint with our JWT access token
            console.log(config);
            this.getAllEmployees();
        }
    }

    handleChange(event) {
        this.setState({ title: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.title);
        this.promoteEmployee()
        this.setState({ show: false });
        event.preventDefault();
    }

    async getAllEmployees(offset) {
        let response = null;
        try {
            const empNo = this.props.user.empNo;

            offset = offset ? offset * 10 : 0;
            response = await request({
                method: 'GET',
                uri: `${config.employeeUri}/allEmployees/${offset}/`,
                resolveWithFullResponse: true,
            })
            const employees = JSON.parse(response.body)['employees'];
            console.log(employees);
            this.setState({ employees })
        }
        catch (err) {
            console.log(err);
        }
    }

    onSelect(key) {
        this.setState({ pagination: 0, tab: key })
    }
    handleToUpdate(id) {
        this.setState({ pagination: id });
        this.getAllEmployees(id);
    }

    async createUser(employee) {
        // alert(`${employee.empNo} ${employee.firstName} ${employee.lastName}`)
        const name = `${employee.firstName} ${employee.lastName}`;
        const empNo = employee.empNo;
        const username = `${employee.firstName[0]}${employee.lastName}`.toLowerCase();
        let response = null;
        try {
            response = await request({
                method: 'POST',
                uri: `${config.loginUri}/createUser/`,
                resolveWithFullResponse: true,
                body: {
                    name,
                    empNo,
                    username
                },
                json: true
            })
            const newUser = response.body;
            console.log(newUser);
            alert(`Account was successfully created for ${name}`)
            this.getAllEmployees(this.state.pagination);
        }
        catch (err) {
            console.log(err);
        }
    }

    handleShow(employee) {
        this.setState({ show: true, toPromote: employee });
    }

    async promoteEmployee() {
        // alert(`${empNo} ${newTitle}`)
        let response = null;
        const employee = this.state.toPromote;
        const title = this.state.title;
        const name = `${employee.firstName} ${employee.lastName}`;
        try {
            response = await request({
                method: 'POST',
                uri: `${config.employeeUri}/${employee.empNo}/title`,
                resolveWithFullResponse: true,
                body: {
                    title,
                },
                json: true
            })
            alert(`${name} was promoted to ${title}`);
            this.getAllEmployees(this.state.pagination);
        }
        catch (err) {
            console.log(err);
        }
    }

    createModal() {

        const handleClose = () => this.setState({ show: false });

        const show = this.state.show;
        const toPromote = this.state.toPromote;
        return (
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title> Promote {toPromote.firstName} {toPromote.lastName} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Current Role:
                                <input type="text" value={toPromote.title} readOnly />
                            </label>
                            <label>
                                New Role:
                                <input type="text" value={this.state.title} onChange={this.handleChange} />
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                    </Modal.Body>
                </Modal>
            </>
        );
    }

    render() {
        let active = this.state.pagination;
        let items = [];
        for (let number = 0; number <= 10; number++) {
            items.push(
                <Pagination.Item onClick={() => this.handleToUpdate(number)} key={number} active={number === active}>
                    {number + 1}
                </Pagination.Item>,
            );
        }

        const paginationBasic = (
            <div>
                <Pagination size="sm">{items}</Pagination>
            </div>
        );

        // construct table 
        const employees = this.state.employees;
        const table = [];
        const tableBody = []
        table.push(<thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
            </tr>
        </thead>
        )
        for (const employee of employees) {
            console.log(employee);
            let text = 'Create User';
            let disable = false;

            if ('username' in employee) {
                text = "User Exists"
                disable = true;
            }
            tableBody.push(<tr>
                <td>
                    {employee.firstName}
                </td>
                <td>
                    {employee.lastName}
                </td>
                <td>
                    {employee.title}
                </td>
                <td>
                    <ButtonGroup>
                        <Button onClick={() => this.createUser(employee)} disabled={disable}>{text}</Button>
                        <Button onClick={() => this.handleShow(employee)}>Promote Employee</Button>
                    </ButtonGroup>
                </td>
            </tr>);
        }
        table.push(<tbody>{tableBody}</tbody>)

        const message = this.state.message;
        return (
            <div className="Home">
                <Container fluid='lg' style={{ 'paddingTop': '1rem' }}>
                    {this.createModal()}
                    <Tabs activeKey={this.state.key} onSelect={(key) => this.onSelect(key)}>
                        <Tab eventKey="employee" title="All Employee">
                            <Table borderless>
                                {table}
                            </Table>
                            {paginationBasic}
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Admin)
