import React from 'react'

import { Card, Button } from 'semantic-ui-react'

function GoalList(props) {

	const goals = props.goals.map((goal)=>{
		const currentDate = new Date()
		const date = currentDate.getDate()
		return(

			<Card key={goal.id} centered={true}>
				<Card.Content>
					<Card.Header>
						Tittle : {goal.title}
					</Card.Header>
					<Card.Description>
						{goal.Description}
					</Card.Description>
					<Card.Content>
						{goal.deadline}
					</Card.Content>
					<Card.Content>
						{goal.before_deadline}
					</Card.Content>
				</Card.Content>
				<Card.Content extra>
				<Button onClick={()=> props.deleteGoal(goal.id)}>Delete</Button>
				<Button onClick={()=> props.editGoal(goal.id)}>Edit</Button>
				</Card.Content>

			</Card>
			)
	})
	return(
		<Card.Group>
			{goals}
		</Card.Group>
		)
}

export default GoalList