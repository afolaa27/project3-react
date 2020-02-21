import React, {Component} from 'react'
import {Form, Button, Label, Segment, Modal} from 'semantic-ui-react'


class NewGoalForm extends Component{
	constructor(props){
		super(props)
		this.state={
			title : '',
			description : '',
			deadline : '',
			before_deadline : ''
		}
	}

	handleChange = (event)=>{
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit = (event) =>{
		console.log("ive been hit");
		event.preventDefault()
		this.props.createGoal(this.state)
		this.setState({
			title : '',
			description : '',
			deadline : '',
			before_deadline : '',
			owner : ''
		})
	}
	render(){
			return(
			<Modal open={this.props.open} closeIcon={true} onClose={this.props.closeModal}>
				<Modal.Content>
				<Form onSubmit={this.handleSubmit}>
					<Label>Title:</Label>
							<Form.Input 
							type='text'
							name='title'
							placeholder='Enter title'
							value={this.state.title}
							onChange={this.handleChange}
							/>
					<Label>Description:</Label>
							<Form.Input 
							type='textArea'
							name='description'
							placeholder='Enter description'
							value={this.state.description}
							onChange={this.handleChange}
							/>
					<Label>Deadline:</Label>
							<Form.Input 
							type='date'
							name='deadline'
							placeholder='Enter deadline'
							value={this.state.deadline}
							onChange={this.handleChange}
							/>
					<Label>Reminder:</Label>
							<Form.Input 
							type='number'
							name='before_deadline'
							placeholder='before deadline'
							value={this.state.before_deadline}
							onChange={this.handleChange}
							/>
					<Button type="Submit" >Create Goal</Button>
				</Form>
				</Modal.Content>
			</Modal>
			)
		}
}
export default NewGoalForm