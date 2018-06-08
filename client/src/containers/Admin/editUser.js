import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getOneUser, updateUser, clearUser, deleteOneUser } from '../../actions';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
class EditUser extends PureComponent {

    state = {

        _id:this.props.match.params.id,
        name: '',
        lastname: '',
        email: '',
        password: '',
        course: '',


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



    /*componentWillReceiveProps(nextProps){
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
    }*/

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(updateUser(this.state))

    }

    deleteUser = () => {
        this.props.dispatch(deleteOneUser(this.props.match.params.id))
    }

    componentWillMount(){
        this.props.dispatch(getOneUser(this.props.match.params.id))
    }

    componentWillReceiveProps(nextProps){
        //console.log(nextProps);
        let user = nextProps.user.users;
        this.setState({

                _id: user._id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
                course: user.course,


        })
    }

    componentWillUnmount(){
        this.props.dispatch(clearUser())
    }





    render() {
        console.log(this.props);
       //let users = this.props.user;
        if(this.props.user.login.role === 1) {
            return (

                <div className="rl_container">


                    <form onSubmit={this.submitForm}>
                        <h2>Edit User</h2>

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
                        <button type="submit">Edit User</button>
                        <div className="delete_user">
                            <div className="button"
                            onClick={this.deleteUser}
                            >
                                Delete User
                            </div>
                        </div>


                    </form>


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

export default connect(mapStateToProps)(EditUser)