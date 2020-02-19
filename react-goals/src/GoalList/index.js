import React from 'react'

import { Card, Button } from 'semantic-ui-react'

function GoalList(props) {

	const goals = props.goals.map((goal)=>{
		return(

			<Card key={goal.id} centered={true}>
				<Card.Content>
					<Card.Header>
						{goal.title}
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