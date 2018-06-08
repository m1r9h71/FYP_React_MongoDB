import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getUsers, userRegister } from '../../actions';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
class Register extends PureComponent {

    state = {
        name: '',
        lastname: '',
        email: '',
        password: '',
        course: '',
        isInvited: [],
        error: ''
    }

    componentWillMount(){
        this.props.dispatch(getUsers())
    }

    handleInputEmail = (event) => {
        this.setState({email:event.target.value})
    }

    handleInputPassword = (event) => {
        this.setState({password:event.target.value})
    }

    handleInputName = (event) => {
        this.setState({name:event.target.value})
    }

    handleInputLastname = (event) => {
        this.setState({lastname:event.target.value})
    }

    handleInputCourse = (event) => {
        this.setState({course:event.target.value})
    }



    componentWillReceiveProps(nextProps){
        if(nextProps.user.register === false){
            this.setState({error:'Error! Please try again'})
        }else{
            this.setState({
                name: '',
                lastname: '',
                email: '',
                password: '',
                course: '',

            })
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({error: ''});

        this.props.dispatch(userRegister({
            email:this.state.email,
            password: this.state.password,
            name: this.state.name,
            lastname: this.state.lastname,
            course: this.state.course,
        }, this.props.user.users))

    }

    showUsers = (user) => (
        user.users ?
            user.users.map(item => (
                <tr key={item._id}>
                    <td><Link to={`/user/edit-user/${item._id}`}>{item.name}</Link></td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                    <td>{item.course}</td>

                </tr>
            ))

            :null
    )


    render() {
            let user = this.props.user;
        if(this.props.user.login.role === 1) {
            return (

                <div className="rl_container">
                    <form onSubmit={this.submitForm}>
                        <h2>Add User</h2>

                        <div className="form_element">
                            <input
                                type="text"
                                placeholder="Enter Name"
                                value={this.state.name}
                                onChange={this.handleInputName}

                            />
                        </div>
                        <div className="form_element">
                            <input
                                type="text"
                                placeholder="Enter Surname"
                                value={this.state.lastname}
                                onChange={this.handleInputLastname}

                            />
                        </div>
                        <div className="form_element">
                            <input
                                type="text"
                                placeholder="Enter Course"
                                value={this.state.course}
                                onChange={this.handleInputCourse}

                            />
                        </div>

                        <div className="form_element">
                            <input
                                type="text"
                                placeholder="Enter Email"
                                value={this.state.email}
                                onChange={this.handleInputEmail}

                            />
                        </div>
                        <div className="form_element">
                            <input
                                type="password"
                                placeholder="Enter Password"
                                value={this.state.password}
                                onChange={this.handleInputPassword}

                            />
                        </div>
                        <button type="submit">Add User</button>
                        <div className="error">
                            {this.state.error}
                        </div>

                    </form>

                    <div className="current_users">
                        <h4>Current Users: </h4>
                        <table>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Course</th>
                            </tr>
                            </thead>
                            <tbody>

                            {this.showUsers(user)}
                            </tbody>
                        </table>
                    </div>
                </div>

            );
        }else {
            return <Redirect to="/user" />
        }
    }
}

function mapStateToProps(state){
    return {
        user:state.user
    }
}

export default connect(mapStateToProps)(Register)