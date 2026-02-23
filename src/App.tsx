
import { useEffect, useState } from 'react';
import './App.css'
import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header'

function App() {
     
      const [username , setUserName] = useState("") ;
      
      
     useEffect(()=>{
          const user = localStorage.getItem("username") ; 
          if(user){
            setUserName(user) ; 
          }    
          else {
            let enterUsername = prompt("Enter you username: ") ;  

             while(!enterUsername || enterUsername.trim() === ""){
                enterUsername = prompt("Kindly write your username before accessing") ; 
             }

             const finalUsername = enterUsername.trim() ; 
             localStorage.setItem("username" , finalUsername)  ;
             setUserName(finalUsername) ; 
          }
            
        
     }, [])   

     if(!username){
        return 
        <div style ={{textAlign: "center" , marginTop: "50px"}}>Wait till it loads .... </div>
     }
      
     

  return (
    <>
        <Header/>
        <br/>
        <br/>

        <Dashboard username = {username}/>
    </>
  )
}

export default App ; 
