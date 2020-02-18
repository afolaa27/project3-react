import React, {Component} from 'react'
import {Form, Label} from 'semantic-ui-react'

class LoginRegisterForm extends Component{
	constructor(props){
		super(props)

		this.state={
			email : '',
			password : '',
			username: '',
			action : 'register'
		}

	}
	switchForm = ()=>{
		if (this.state.action === 'login'){
			this.setState({
				action: 'register'
			})
		}else{
			this.setState({action: 'login'})
		}
	}
	handleChange = (event)=>{
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	render(){
			return(
			<div className="LoginRegisterForm"> 
				<Form>
					{
						this.state.action === 'register'
						?
						<React.Fragment>
							<Label>Username:</Label>
							<Form.Input 
							type='text'
							name='username'
							placeholder='Enter Username'
							value={this.state.username}
							onChange={this.handleChange}
							/>

						</React.Fragment>
						:
						null
					}
					<Label>email:</Label>
							<Form.Input 
							type='text'
							name='email'
							placeholder='Enter email'
							value={this.state.email}
							onChange={this.handleChange}
							/>
					<Label>password:</Label>
							<Form.Input 
							type='password'
							name='password'
							placeholder='Enter password'
							value={this.state.password}
							onChange={this.handleChange}
							/>
				</Form>
			</div>
			)
		}
}
export default LoginRegisterForm


