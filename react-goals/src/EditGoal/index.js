import React, {Component} from 'react'
import { Form, Button, Label, Header, Segment } from 'semantic-ui-react'

class EditGoal extends Component {
	constructor(){
		super()
		this.state={
			title : '',
			description : '',
			deadline : '',
			before_deadline : '',
			owner : ''
		}
	}
	componentDidMount (){
		this.setState({
			title : this.props.goalToEdit.title,
			description : this.props.goalToEdit.description,
			deadline : this.props.goalToEdit.deadline,
			before_deadline : this.props.goalToEdit.before_deadline,
			owner : this.props.goalToEdit.owner
		})
	}
	handleChange = (event) =>{
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit = (event)=>{
		event.preventDefault()
		this.props.updateGoal(this.state)
	}

	render(){
		return(
			<Segment> 
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
					<Button type="Submit" >Update </Button>

				</Form>
			</Segment>
		)
	}
}

export default EditGoal

