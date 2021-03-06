import React, { Component } from 'react';

import { Interactions } from 'aws-amplify';
import { ChatFeed, Message } from 'react-chat-ui'

class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
		    input: '',
		    finalMessage: '',
		    messages: [
	    	new Message({
		        id: 1,
		        message: "Hello, how can I help you today?",
      			})
		    ]
		}
	}
	_handleKeyPress = (e) => {
    	if (e.key === 'Enter') {
     	this.submitMessage()
    	}
  	}
  	onChange(e) {
    	const input = e.target.value
    	this.setState({
      		input
    	})
  	}
  	async submitMessage() {
    	const { input } = this.state
    	if (input === '') return
    	const message = new Message({
    		id: 0,
    		message: input,
    	})
    	let messages = [...this.state.messages, message]

	    this.setState({
    		messages,
    		input: ''
    	})
    	const response = await Interactions.send("KendraBot", input)

      if(response.message.charAt(0) === "[") {
        const responseMessageArr = JSON.parse(response.message.replace(/'/g, '"'));

        for (var i=0; i< responseMessageArr.length; i++) {
          if (i === 0) {
            const responseMessage = new Message({
            id:i+1,
            message: "I have found the following documents: "
          })
            messages = [...this.state.messages, responseMessage]
            this.setState({ messages })
          }
          const docTitle = responseMessageArr[i].document_title;
          const docExcerpt = responseMessageArr[i].document_excerpt;
          const docLink = responseMessageArr[i].document_uri;
          const messageText = "Title: " + docTitle +"\n Excerpt: "+ docExcerpt + "\n URI: "+ docLink;
          const responseMessage = new Message({
            id:i+2,
            message: messageText
          })
          messages = [...this.state.messages, responseMessage]
          this.setState({ messages })
        }
      } else {

      const responseMessage = new Message({
        id: 1,
        message: response.message
      })

      messages = [...this.state.messages, responseMessage]
      this.setState({ messages })

      }

    	if (response.dialogState === 'Fulfilled') {
    		if (response.intentName === 'SearchIntent') {
        	const finalMessage = response.message
        	this.setState({ finalMessage })
    		}
    	}
	}
	render() {
    	return (
      		<div className="App">
	        	<header style={styles.header}>
	          		<p style={styles.headerTitle}>Kendra Search Bot</p>
	        	</header>
  	        	<div style={styles.messagesContainer}>
  		        	<h2>Welcome to Kendra Search!</h2>
    			        <ChatFeed
    			          messages={this.state.messages}
    			          hasInputField={false}
    			          bubbleStyles={styles.bubbleStyles}
    			        />
  			        <input
  		         	onKeyPress={this._handleKeyPress}
  		        	onChange={this.onChange.bind(this)}
  		        	style={styles.input}
  		        	value={this.state.input}/>
  			    </div>
	    	</div>
	    );
	}
}

const styles = {
  bubbleStyles: {
    text: {
      fontSize: 16,
    },
    chatbubble: {
      borderRadius: 30,
      padding: 10
    }
  },
  headerTitle: {
    color: 'white',
    fontSize: 22
  },
  header: {
    backgroundColor: 'rgb(0, 132, 255)',
    padding: 20,
    borderTop: '12px solid rgb(204, 204, 204)'
  },
  messagesContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    alignItems: 'center'
  },
  input: {
    fontSize: 16,
    padding: 10,
    outline: 'none',
    width: 350,
    border: 'none',
    borderBottom: '2px solid rgb(0, 132, 255)'
  }
}

export default Chat;