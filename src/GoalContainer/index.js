import React, {Component} from 'react'
import GoalList from '../GoalList'
import NewGoalForm from '../NewGoalForm'
import EditGoal from '../EditGoal'
import {Button} from 'semantic-ui-react'
import '../index.css'


class GoalContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			goals:[],
			editModalOpen: false,
			addModalOpen: false,
			goalToEdit:{
				title : '',
				description : '',
				deadline : '',
				id: '',
				before_deadline: ''
			},
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
		  this.closeAddModal()
	}
	editGoal = async (idGoalToEdit) =>{
		const goalToEdit = this.state.goals.find((goal)=>goal.id === idGoalToEdit)
	
		this.setState({
			editModalOpen:true,
			goalToEdit : {
				...goalToEdit
			}
		})
	}
	/*closeModal=()=>{
		this.setState({
			idGoalToEdit:-1
		})
	}*/
	handleEditChange=(event)=>{
		this.setState({
			goalToEdit:{
				...this.state.goalToEdit,
				[event.target.name]: event.target.value
			}
		})
	}
	handleSubmitEditForm=(e)=>{
		e.preventDefault()
		this.updateGoal()
	}
	updateGoal= async ()=>{
		try{
		    const updateResponse = await fetch(
		    	process.env.REACT_APP_API_URL+'/api/v1/goals/'+ this.state.goalToEdit.id,
		    	{
		    		method:'PUT',
		    		body : JSON.stringify(this.state.goalToEdit),
		    		credentials: 'include',
		    		headers:{
		    			'Content-Type' : 'application/json'
		    		}
		    	}

		    	)
		    const updateJson = await updateResponse.json();
		    if(updateResponse.status ===200){
		    	const newGoalUpdated = this.state.goals.map((goal)=>{
		    		if(goal.id === updateJson.data.id){
		    			return updateJson.data
		    		}else{
		    			return goal
		    		}
		    	})
		    	this.setState({
		    		goals : newGoalUpdated
		    	})
		    	this.closeModal()
		    }
		  }
		    catch(err){
		      console.error(err)
		  }
	}
	closeModal=()=>{
		this.setState({
			editModalOpen:false
		})
	}
	closeAddModal=()=>{
		this.setState({
			addModalOpen:false
		})
	}
	openAddModal=()=>{
		this.setState({
			addModalOpen:true
		})
	}
	render(){
			return(
			<div> 
				<React.Fragment>
					<div className='head'>
						<h1>My Goals</h1>
					</div>
					<GoalList goals={this.state.goals} deleteGoal={this.deleteGoal} editGoal={this.editGoal}/>
					<div className='addGoal'>
						
						<Button style={{boxShadow:'0 6px 8px -6px black'}} onClick={this.openAddModal}>Add Goal</Button>
					</div>
					{
					this.state.addModalOpen
					?
					<NewGoalForm createGoal={this.createGoal} 
					open={this.state.addModalOpen}
					closeModal={this.closeAddModal}
					/>
					:
					null
					}
					{
						this.state.idGoalToEdit !==-1
						?
						<EditGoal 
						open={this.state.editModalOpen}
						goalToEdit={this.state.goalToEdit}
						updateGoal={this.updateGoal}
						closeModal={this.closeModal}
						handleEditChange={this.handleEditChange}
						handleSubmitEditForm={this.handleSubmitEditForm}
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