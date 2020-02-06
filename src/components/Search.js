import React, { Component } from 'react';
import { Card, FormText, FormGroup, FormControl, FormLabel, Button } from "react-bootstrap";
import { API } from 'aws-amplify';
import './Search.css';


  const Res = ({results}) => (  <div>
	    {results.map(
	    	result => (
		      <div className="result" key={result.document_title}>{result.document_title}</div>
		      )
	    	)
	}
	  </div>
	);

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
		    input: "",
		    results: []
		};
	}

	validationForm() {
	  	return (
	  		this.state.shit.length > 0);
	  }

	submitSearch = async event => {
		event.preventDefault();
	    try {
		let results = await API.get('searchApi', '/search', {
			'queryStringParameters': {
				'kendraQuery': this.state.input
			}
		});
			this.setState({ results })

		results.forEach(function (arrayItem) {
		    var x = arrayItem.document_title;
		});

	    this.props.history.push("/Search");

	    } catch(e) {
	      alert(e.meeage);
	    }
	    return false;
	}

  handleChange = event => {
  	this.setState({
  		input: event.target.value
  	});
  }

  printResults() {
  	let r = '<div>'
  	this.state.results.forEach(function (arrayItem) {
		var x = arrayItem.document_title;
		r = r + '<div> '+ x + '</div>';
	});
	r = r+ '</div>'
	return r;
  }

	render() {
    return (
       <div className="Home">
       	<header style={styles.header}>
	    	<p style={styles.headerTitle}>Kendra Search</p>
	    </header>
       	<div className="col-lg-9 col-centered">
       		<form onSubmit={this.submitSearch}>
       			<FormGroup controlId="searQuery" >
       				<FormLabel><h2>Search Query</h2></FormLabel>
       				<FormControl className = "form-control-lg"
       					autoFocus
       					type="input"
       					defaultValue={this.state.input}
       					onChange={this.handleChange}
       					/>
       				<FormText className="formText">Enter a Search Query</FormText>
       			</FormGroup>
       			<Button type="submit">
       				Search
       			</Button>
       		</form>
       		<br/>
       		<div>
				{this.state.results.map(result => 
					<div>
						<Card>
							<Card.Body>
								<Card.Title>
									 <a href={result.document_uri}> {result.document_title}</a>
									<Card.Text>
									 {result.document_excerpt}
									<div><br/>
										<a href={result.document_uri}> {result.document_uri} </a>
									</div>
									</Card.Text>
								</Card.Title>
							</Card.Body>
						</Card>
						<br/>
					</div>)}
       		</div>
       	</div>
	</div>

    );
	}
}

const styles = {
  headerTitle: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  },
  header: {
    backgroundColor: 'rgb(0, 132, 255)',
    padding: 20,
    borderTop: '12px solid rgb(204, 204, 204)'
  }
}


export default Search;