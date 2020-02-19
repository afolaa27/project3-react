import React, {Component} from 'react'
import GoalList from '../GoalList'



class GoalContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			goals:[],
			editModalOpen: false,
			goalToEdit:{
				title : "",
				description : '',
				deadline : '',
				id: '',
				before_deadline: ''
			}
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

		    if(deleteJson.status == 200){
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

	render(){
			return(
			<div> 
				<React.Fragment>
					<GoalList goals={this.state.goals} deleteGoal={this.deleteGoal}/>
				</React.Fragment>
			</div>
			)
		}
}


export default GoalContainer