import React, {Component} from 'react'
import GoalList from '../GoalList'
import NewGoalForm from '../NewGoalForm'
import EditGoal from '../EditGoal'



class GoalContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			goals:[],
			editModalOpen: false,
			goalToEdit:{
				title : '',
				description : '',
				deadline : '',
				id: '',
				before_deadline: ''
			},
			idGoalToEdit: -1
		}
	}
	componentDidMount(){
		this.getGoals()
	}
	getGoals = async () =>{
		try{
		    const goalResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/goals/', {
		    	credentials:'include'
		    })
		    const goalJson = await goalResponse.json()

		    this.setState({
		    	goals : goalJson.data
		    })
		  }
		    catch(err){
		      console.error(err)
		  }
	}
	deleteGoal = async(id)=>{
		try{
		    const deleteResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/goals/'+ id,{
		    	method : 'DELETE',
		    	credentials : 'include'
		    })
		    const deleteJson = await deleteResponse.json();

		    if(deleteJson.status === 200){
		    	this.setState({
		    		goals : this.state.goals.filter(goal=>goal.id !==id)
		    	})
		    }else{
		    	throw new Error('Could not delete this goal')
		    }
		  }
		    catch(err){
		      console.error(err)
		  }
	}
	createGoal = async (goalToAdd)=>{
		try{
		    const createResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/goals/',{
		    	method: 'POST',
		    	body: JSON.stringify(goalToAdd),
		    	credentials: 'include',
		    	headers:{
		    		'Content-Type': 'application/json'
		    	}
		    })
		    console.log(createResponse);
		    const createJson = await createResponse.json()
		    console.log(createResponse.status);
		    if(createResponse.status === 201){
		    	this.setState({
		    		goals:[...this.state.goals, createJson.data]
		    	})
		    }
		  }
		    catch(err){
		      console.error(err)
		  }
	}
	editGoal = async (idGoalToEdit) =>{
		this.setState({
			idGoalToEdit : idGoalToEdit
		})
	}
	closeModal=()=>{
		this.setState({
			idGoalToEdit:-1
		})
	}

	render(){
			return(
			<div> 
				<React.Fragment>
					<GoalList goals={this.state.goals} deleteGoal={this.deleteGoal} editGoal={this.editGoal}/>
					<NewGoalForm createGoal={this.createGoal}/>
					{
						this.state.idGoalToEdit !==-1
						?
						<EditGoal 
						goalToEdit={this.state.goals.find((goal)=> goal.id === this.state.idGoalToEdit)}
						updateGoal={this.updateGoal}
						closeModal={this.closeModal}
						/>
						:
						null
					}
				</React.Fragment>
			</div>
			)
		}
}


export default GoalContainer