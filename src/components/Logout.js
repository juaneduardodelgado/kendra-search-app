import React, { Component } from "react";
import { FormGroup, FormControl, FormLabel, Button } from "react-bootstrap";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length>0;
    }

    handleChange = event => {
        this.setState({
                [event.target.id]: event.target.value
            });
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log("Submitted",this.state.email,this.state.password);
    }

    render() {
        return (
            <div className="Home">
                <div className="col-md-4"> 
                    <form >
                        <FormGroup controlId="email">
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                autoFocus
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="password" >
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                value={this.state.password}
                                onChange={this.handleChange}
                                type="password"
                            />
                        </FormGroup>
                        <Button onClick={this.handleSubmit}>
                        Login
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}