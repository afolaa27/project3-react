import React from 'react'

import { Card, Button } from 'semantic-ui-react'
import '../index.css'

function GoalList(props) {
	let color = ''
	let due=false
	const goals = props.goals.map((goal)=>{
	let before_due = goal.deadline.substring(4, 7)
	let deadline_int = parseInt(before_due, 10);
	const currentDate = new Date()
	const date = currentDate.getDate()

	if (goal.deadline.substring(4, 7) <= date){
		color ='red'
		due = true
	}
	else if(before_due == date+goal.before_deadline){
		color='yellow'
		due=false
	}else{
		color=''
		due=false
		
	}


	return(
		<div className='goalList' >
		<Card key={goal.id} centered={true} color={color} style ={{backgroundColor: color}}>
			<Card.Content>
				<Card.Header>
					{goal.title}
				</Card.Header>
				<Card.Description>
					{goal.description}
				</Card.Description>
				<Card.Content>
					Due: {goal.deadline.substring(0, 16)}
				</Card.Content>
				<Card.Content>
					{
						due?
						<p>Your Goal is Due Now</p>
					:
					<p>you will be reminded {goal.before_deadline} day{
						goal.before_deadline > 1?"s": null
					 } before deadline </p>

					
					}
				</Card.Content>
			</Card.Content>
			<Card.Content extra>
			<div className='buttonBox'>
			<Button onClick={()=> props.deleteGoal(goal.id)}>Delete</Button>
			<Button onClick={()=> props.editGoal(goal.id)}>Edit</Button>
			</div>
			</Card.Content>

		</Card>
		</div>
		)
	})
	return(
		<Card.Group >
			{goals}
		</Card.Group>
	)
}

export default GoalList