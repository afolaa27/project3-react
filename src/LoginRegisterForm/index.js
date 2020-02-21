import React, {Component} from 'react'
import {Form,Button, Label, Card} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

class LoginRegisterForm extends Component{
	constructor(props){
		super(props)

		this.state={
			email : '',
			password : '',
			username: '',
			action : 'login'
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
	handleSubmit=(event)=>{
		if(this.state.action==='register'){
			this.props.register(this.state)
		}else{
			this.props.login(this.state)
		}
	}
	render(){
			return(
			<div className="LoginRegisterForm" className="login" > 
				<Card centered={true} className='formCard'>
					
				<Form onSubmit ={this.handleSubmit} >
					{
						this.state.action === 'register'
						?
						<React.Fragment >
							<label>Username</label>
							<Form.Input className='input'
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
					<label>Email</label>
							<Form.Input className='input'
							type='text'
							name='email'
							placeholder='Enter email'
							value={this.state.email}
							onChange={this.handleChange}
							/>
					<label>Password</label>
							<Form.Input className='input' 
							type='password'
							name='password'
							placeholder='Enter password'
							value={this.state.password}
							onChange={this.handleChange}
							/>
					<Button type ="Submit">
					{
						this.state.action==="register"? "Register":"Login"
					}
					</Button>
				</Form>
				{
					this.state.action ==='register'
					?
					<small> if you have an account Log in <span className="link" onClick={this.switchForm}>here</span>.</small>
					:
					<small> dont have an account Sign up <span className="link" onClick={this.switchForm}>here</span>!</small>
				}
				{
					this.props.wrongInfo
					?
					<small style={{color:'red'}}>Your Credentials Are Wrong !</small>
					:
					null
				}
				{
					this.props.wrongInfoReg
					?
					<small style={{color:'red'}}>Try new details!</small>
					:
					<small style={{color:'green'}}>You successfully signed up now login!</small>
				}
				</Card>
			</div>
			)
		}
}
export default LoginRegisterForm


