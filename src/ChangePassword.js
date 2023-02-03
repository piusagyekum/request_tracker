import { useState } from "react";
import api from "./api/api";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const ChangePassword = () => {
    const token = localStorage.getItem("token")
    const email = localStorage.getItem("email");

    const history = useHistory();

    const[currentPassword,setCurrentPassword]=useState("");
    const[newPassword,setNewPassword]=useState("");
    const[confirmNewPassword,setConfirmNewPassword]=useState("");
    const [alert,setAlert]=useState(false)
    const [success,setSuccess]= useState(false)

    useEffect(()=>{
        if(!token){
        history.push("/")
        }

    },[token,history])

    const submit=(e)=>{
        e.preventDefault();
        const input ={email,currentPassword,newPassword,confirmNewPassword};
        if(newPassword===confirmNewPassword){
            api.put("ChangePass/",input,{
                headers:{"Authorization":`Bearer ${token}`}
                
            })
            .then(res=>{

            
               
                if(res.data.code==="0"){
                    setSuccess(true)
                    setAlert("Password Changed")
                }
                else{   
                setAlert("Invalid Email or Password");
                }
    
                setTimeout(()=>{
                    localStorage.clear();
                    history.push("/");
                },1000)
            }
                
                
                )
            .catch(err=> {
                console.log(err)
                setAlert("Invalid Email or Password")})
        }
        else{
            setAlert("Password Mismatch")
        }
        
       
        
        
    }

    return (

<div className="ChangePassword">
    <div className="outerForm">
        <form onSubmit={submit }>
       
            <div style={{display:"flex",justifyContent:"space-around", alignItems:"center", borderBottom:"1px solid grey", padding:"5px 0  10px 0"}}>
                                    <div className="logo"></div>
                                    <h2>RequestTracker</h2>
            </div>

            {/* <h3 style={{textAlign:"center",borderBottom:"1px solid var(--primary)",marginBottom:"10px"}}> Change Your Password</h3> */}
            {alert?
                    <label className="alert"
                    style={{backgroundColor: success?"var(--primary)":""}}
                    >{alert}
                    </label>
            :""} 
            <label>Current Password</label>
            <input type="password" required value={currentPassword} onChange={(e)=>{
                setCurrentPassword(e.target.value)
                setAlert("")}}
            />

            <label>New Password</label>
            <input type="text" required value={newPassword} onChange={(e)=>{
                setNewPassword(e.target.value);
                setAlert("");
            }} />

            <label>Confirm New Password</label>
            <input type="text" required value={confirmNewPassword} onChange={(e)=>{
                setConfirmNewPassword(e.target.value)
                setAlert("");
            }}/>

            <input type="submit" value="SUBMIT"/>

        </form>
    </div>
</div>

     );
}
 
export default ChangePassword;


