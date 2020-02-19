import React, {Component} from 'react'
import { Form, Button, Label, Header, Segment, Modal } from 'semantic-ui-react'

function EditGoal(props) {
		return(
			
				<Modal open={props.open} closeIcon={true} onClose={props.closeModal}>
					<Modal.Content>
						

					<Form onSubmit={props.handleSubmitEditForm}>
					<Label>Title:</Label>
							<Form.Input 
							type='text'
							name='title'
							placeholder='Enter title'
							value={props.goalToEdit.title}
							onChange={props.handleEditChange}
							/>
					<Label>Description:</Label>
							<Form.Input 
							type='textArea'
							name='description'
							placeholder='Enter description'
							value={props.goalToEdit.description}
							onChange={props.handleEditChange}
							/>
					<Label>Deadline:</Label>
							<Form.Input 
							type='date'
							name='deadline'
							placeholder='Enter deadline'
							value={props.goalToEdit.deadline}
							onChange={props.handleEditChange}
							/>
					<Label>Reminder:</Label>
							<Form.Input 
							type='number'
							name='before_deadline'
							placeholder='before deadline'
							value={props.goalToEdit.before_deadline}
							onChange={props.handleEditChange}
							/>
					<Modal.Actions>

						<Button type="Submit" >Update </Button>
					</Modal.Actions>
					</Form>
					</Modal.Content>
				</Modal>
			
		)
	
}

export default EditGoal

