import { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "./api/api";
import InfoPopup from "./InfoPopup";

const AddUser = () => {
    const token = localStorage.getItem("token")
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[departmentId,setDepartmentId]=useState("");
    const[roleId,setRoleId]=useState("");
    const[addUserSuccess,setAddUserSuccess]=useState(false)
    const[isLoading,setIsLoading]=useState(false)

    const history=useHistory();

    const submit=(e)=>{
        setIsLoading(true)
        e.preventDefault();
        const details = {name,email,departmentId,roleId};
        console.log(details)
        
        
        api.post("AddUser",details,{
            headers:{"Authorization":`Bearer ${token}`}
        })
        .then(res=>{
            setIsLoading(false)
            console.log(res)
            setAddUserSuccess(true);

           
                
                setName("")
                setDepartmentId("")
                setEmail("")
                setRoleId("")


    })
        .catch(err=>{
            console.log(err)
            setIsLoading(false)
        })

       
    }
    return ( 
        <div className="AddUser" style={{cursor: isLoading?"wait":""}}>

            {addUserSuccess?<InfoPopup info="User Added Sucessfully" ok={()=>setAddUserSuccess(false)}/>:""}
             <form onSubmit={submit}>
                <table >
                            <thead>
                                <tr>
                                    <th  colSpan="2" style={{
                                        backgroundColor:"var(--primary)",
                                        borderRadius:"10px 10px 0 0",
                                        lineHeight:"2.5rem",
                                        border:"none",
                                        textAlign:"center",
                                        color:"white"
                                    }}>ADD USER</th>
                                </tr>
                                            
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="left-column">Name</td>
                                    <td className="right-column">
                                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                                    </td>
                                    
                                </tr><tr>
                                    <td className="left-column">Email</td>
                                    <td className="right-column">
                                        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                    </td>
                                    
                                </tr>
                                <tr>
                                    <td className="left-column">Department</td>
                                    <td className="right-column">
                                        <select value={departmentId} onChange={(e)=>setDepartmentId(e.target.value)}>
                                            <option disabled selected  value="">Choose option</option>on
                                            <option value="1">BT falcon</option>on
                                            <option value="2">SOC</option>on
                                            <option value="3">Offensive</option>on
                                            <option value="4">Sales</option>on
                                            <option value="5">Infosec</option>on
                                        </select>

                                    </td>
                                    
                                </tr>
                                
                                <tr>
                                    <td className="left-column">Role</td>
                                    <td className="right-column">
                                        <select value={roleId} onChange={(e)=>setRoleId(e.target.value)}>
                                            <option disabled selected  value="">Choose an option</option>
                                            <option value="1" >user</option>on
                                            <option value="3">manager</option>on
                                            <option value="2">admin</option>on
                                        </select>

                                    </td>
                                    
                                </tr>  
  

                                <tr>
                                    <td colSpan="2" className="left-column">
                                        <input type="submit" value={isLoading?"Creating...":"Create User"}
                                        style={{cursor: isLoading?"wait":"pointer"}}/>
                                    </td>
                                </tr>
                            
                            

                            </tbody>
                    </table>
                </form>
        </div>
     );
}
 
export default AddUser;