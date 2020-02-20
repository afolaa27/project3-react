import React, {Component} from 'react'
import LoginRegisterForm from './LoginRegisterForm'
import GoalContainer from './GoalContainer'
import HomeIntro from './HomeIntro'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn : false,
      loggedInUserEmail: null
    }
  }
  register = async(registerInfo)=>{
    const url = process.env.REACT_APP_API_URL + '/api/v1/users/register'
    try{
      const registerResponse = await fetch(url,{
        credentials:'include',
        method : 'POST',
        body: JSON.stringify(registerInfo),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      const registerJson = await registerResponse.json()

    }
    catch(err){
      if(err){
        console.error(err)
      }
    }
  }
  login = async(loginInfo)=>{
    const url = process.env.REACT_APP_API_URL + '/api/v1/users/login'
    try{
        const logResponse = await fetch(url, {
          credentials: 'include',
          method: "POST",
          body: JSON.stringify(loginInfo),
          headers:{
            'Content-Type' : 'application/json'
          }
        })
        const loginJson = await logResponse.json()
        if(logResponse.status ===200){
          this.setState({
            loggedIn: true,
            loggedInUserEmail : loginJson.data.email
          })
        }
      }
        catch(err){
          console.error(err)
      }
  }
  render(){
      return(
        
      <div className="App" style={{backgroundColor: 'lightgrey'}}> 

        
        {
          this.state.loggedIn
          ?
          <GoalContainer/>
          :
          <div>
          <HomeIntro/>
          <LoginRegisterForm register={this.register} login={this.login}/>
          </div>
        }
        
      </div>
      )
    }
  
}

export default App;
