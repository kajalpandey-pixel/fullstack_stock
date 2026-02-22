
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
            const enterUsername = prompt("Enter you username: ") ;  

             if(enterUsername && enterUsername.trim() !== ""){
                 localStorage.setItem("username"  , enterUsername) ;

                 setUserName(enterUsername)  ;
             }
          }
            
        
     }, []) 
      
     

  return (
    <>
        <Header/>
        <br/>
        <br/>

        <Dashboard/>
    </>
  )
}

export default App
