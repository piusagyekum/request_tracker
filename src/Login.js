import api from "./api/api";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Error from "./Error";


const Login = () => {
    
    
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const history = useHistory();
    const [invCred,setInvCred] = useState(false);
    const [adminPopup,setAdminPopup]=useState(false)
    const [manPopup,setManPopup]=useState(false)
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState(false)
    const [errorMessage, setErrorMessage]=useState("")
    const [accountType,setAccountType]= useState(0);

   

    const submit =(e)=>{
        setIsLoading(true)
        e.preventDefault();
        const info = {email,password}
        
        api.post("Login",info)

        .then(response=>{
            
                                    setIsLoading(false)
                                    //CHANGE TO ROLE AND DISPLAY PAGE ACCORDINGLY
                                

                                    
                                        setInvCred(false);
                                        
                                        
                                        
                                        localStorage.setItem("token", response.data.responseData.token);
                                        localStorage.setItem("id", response.data.responseData.id);
                                        localStorage.setItem("name", response.data.responseData.name);
                                        localStorage.setItem("email", response.data.responseData.email);
                                        localStorage.setItem("role", response.data.responseData.role);
                                        localStorage.setItem("deptId", response.data.responseData.deptId);
                                        localStorage.setItem("roleId", response.data.responseData.roleId);
                                        localStorage.setItem("status", response.data.responseData.status);
                                        

                                        
                                        
                                        const status = localStorage.getItem("status")

                                    
                                        if(status==="Active"){

                                        
                                                const roleId=localStorage.getItem("roleId")
                                                    
                                                if(roleId==="2"){
                                                    
                                                        setAdminPopup(true)
                                                    
                                                }
                                                else if(roleId==="3"){
                                                
                                                    setManPopup(true)
                                                
                                                } 
                                                    
                                                    else{
                                                
                                                    
                                                    history.push('/PendingRequests')
                                                    
                                                
                                                }

                                        }
                                        else{
                                            history.push("/ChangePassword")

                                        }

                                    
                                    
                                    
                                    
    })
    .catch((error)=>{
       
        setIsLoading(false)
        setInvCred(true)
        console.log(error)
    
    })
    }

    return (  
    <div className="Login" style={{cursor: isLoading?"wait":""}}>

     
        
        {adminPopup||manPopup?"":<div className="container">

                        {/* <img src="./images/lady.png" alt="lady"/> */}
                        <form onSubmit={submit}>

                            <div style={{display:"flex",justifyContent:"space-around", alignItems:"center"}}>
                            <div className="logo"></div>
                            <h1>RequestTracker</h1>
                            </div>

                        {invCred===true?<label className="errMessage">Invalid Credentials</label>: ""}
                            
                            <label htmlFor="">Email</label>
                        
                            <input 
                            type="email" 
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e)=>{
                                setEmail(e.target.value.toLowerCase())
                                setInvCred(false)
                                

                            }}
                            />
                            
                            <label >Password</label>
                        
                            <input type="password" 
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e)=>{
                                setPassword(e.target.value)
                                setInvCred(false)}
                            }
                            />

                            <input type="submit" 
                            value={isLoading?"Loging in...":"Login"}
                            style={{cursor:isLoading?"wait":""}}/>

                                </form>

                            

                </div>}


            {adminPopup? <div className="adminPopup">
                            <div className="popup">
                            
                            <div style={{display:"flex",justifyContent:"space-around", alignItems:"center"}}>
                            <div className="logo"></div>
                            <h1>RequestTracker</h1>
                            </div>
                                <h4>Account Select</h4>
                                <label> Login as:</label>

                                <button onClick={()=>{
                                    setAccountType(1)
                                    console.log(`account type ${accountType}`)
                                    localStorage.setItem("accountType",accountType)
                                    
                                    
                                    history.push("/PendingRequests")
                                    
                                    
                                }}>User</button>

                                <button onClick={()=>{
                                    setAccountType(2)
                                    localStorage.setItem("accountType",accountType)
                                    console.log(`account type ${accountType}`);

                                    history.push("/AdminPendingRequests")
                                }}>Admin</button>

                                <button onClick={()=>setAdminPopup(false)}>Cancel</button>

                                
                            </div>

                        </div>:""}  
                        
                  {manPopup? <div className="adminPopup">
                            <div className="popup">
                            
                                <div style={{display:"flex",justifyContent:"space-around", alignItems:"center"}}>
                                <div className="logo"></div>
                                <h1>RequestTracker</h1>
                                </div>
                                    <h4>Account Select</h4>
                                    <label> Login as:</label>

                                    <button onClick={()=>history.push("/PendingRequests")}>User</button>
                                    <button onClick={()=>history.push("/ManPendingRequests")}>Manager</button>
                                    <button onClick={()=>setManPopup(false)}>Cancel</button>


                                
                            </div>

                        </div>:""}

                       
    </div>






        );
}
export default Login;