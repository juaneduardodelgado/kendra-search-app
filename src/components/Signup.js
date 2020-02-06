import React, { Component } from 'react';
import { FormText, FormGroup, FormControl, FormLabel, Button } from "react-bootstrap";
import { Auth } from "aws-amplify";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	email: "",
    	password: "",
    	confirmPassword: "",
    	confirmationCode: "",
    	newUser: null,
      signUpFailed: false
    };
  }

  validationForm() {
  	return (
  		this.state.email.length > 0 &&
  		this.state.password.length >0 &&
  		this.state.password === this.state.confirmedPassword);
  }

  validateConfirmationForm() {
  	return this.state.confirmationCode.length >0;
  }

  handleChange = event => {
  	this.setState({
  		[event.target.id]: event.target.value
  	});
  }

  handleSubmit = async event => {
  	event.preventDefault();
    let user = {};
    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password,
        attributes: {
                  email: this.state.email
        }
      });
      user = newUser;
      this.setState({newUser});
    } catch(e) {
      if(e.name === 'UserLambdaValidationException') {
        this.setState({signUpFailed: true})
      } else {
        alert(e.message + " " + user + " is not valid");
      }
    }
  }

  handleConfirmationSubmit = async event => {
  	event.preventDefault();
    console.log("starting confirmation");
    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      console.log("Sign-up confirmation");
      await Auth.signIn(this.state.email, this.state.password);
      console.log("Signed-in to the App");
      console.log(typeof this.props.userHasAuthenticated);
      this.props.userhasauthenticated(true);
      this.props.history.push("/");
    } catch(e) {
      console.log(e);
      alert(e.meeage);
    }
  }

  componentDidCatch(error, info) {
    this.setState({hasError: true});
  }

  render() {
  	return (
  			<div className="Signup">
  				{this.state.newUser === null && this.state.signUpFailed == false? 
  					this.renderForm() :
            (this.state.signUpFailed? this.renderInvalidDomainPage():
              this.renderConfirmationForm())
  					}
  			</div>
  		);
  }

  renderConfirmationForm(){
    return (
       <div className="Home">
       	<div className="col-md-4">
       		<form onSubmit={this.handleConfirmationSubmit}>
       			<FormGroup controlId="confirmationCode" >
       				<FormControl
       					autoFocus
       					type="tel"
       					value={this.state.confirmationCode}
       					onChange={this.handleChange}
       					/>
       				<FormText>Please check your email for the code.</FormText>
       			</FormGroup>
       			<Button type="submit">
       				Verify
       			</Button>
       		</form>
       	</div>
       </div>
    );
  }

  renderInvalidDomainPage(){
    return (
       <div className="Home">
        <div className="col-md-4">
          <span>Signup through the specified domain is not allowed</span>
        </div>
       </div>
    );
  }

  renderForm(){
  	return (
  		<div className="Home">
  			<div className="col-md-4">
  				<form onSubmit={this.handleSubmit}>
  					<FormGroup controlId="email" >
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
  							type="password"
  							value={this.state.password}
  							onChange={this.handleChange}
  						/>
  					</FormGroup>
  					<FormGroup controlId="confirmPassword" >
  						<FormLabel>Confirm Password</FormLabel>
  						<FormControl
  							type="password"
  							value={this.state.confirmPassword}
  							onChange={this.handleChange}
  						/>
  					</FormGroup>
  					<Button type="submit">
  						Signup
  					</Button>
  				</form>
  			</div>
  		</div>
  	);
  }
}