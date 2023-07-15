import { useState } from "react";
import api from "../api/api";
import { useHistory } from "react-router-dom";
import InfoPopup from "../InfoPopup";

const NewRequest = () => {
    const[categoryId,setCategory]=useState("");
    const[description,setDescription]=useState("");
    const history=useHistory();

    const[newRequestSuccess,setNewRequestSuccess]=useState(false)
    const[isLoading,setIsLoading]=useState(false)



    const employeeId=localStorage.getItem("id");

    // const deptId = localStorage.getItem("deptId");

    const submit = (e) => {
        setIsLoading(true)
        e.preventDefault();
        const details={employeeId,categoryId,description}
        
        api.post("MakeRequest", details)
        .then(response=>{
            setIsLoading(false)
            setNewRequestSuccess(true)
            setDescription("");
            setCategory("")

            console.log(response)
            // history.push("/PendingRequests")

            

        })
        .catch(err=>{console.log(err)
            setIsLoading(false)
        })
        
     

    }





    return ( 
        <div className="NewRequest" style={{cursor: isLoading?"wait":""}}>
            <form onSubmit={submit} >
                <table >
                            <thead>
                                <tr>
                                    <th style={{
                                        backgroundColor:"var(--primary)",
                                        borderRadius:"10px 10px 0 0",
                                        lineHeight:"2.5rem",
                                        border:"none",
                                        textAlign:"center",
                                        color:"white"
                                    }}>NEW REQUEST</th>
                                </tr>
                                            
                            </thead>
                            <tbody>
                            <tr>
                                    <td>
                                        <select  required value={categoryId} onChange={(e)=>setCategory(e.target.value)}>
                                            <option disabled selected value="">Category</option>
                                            <option value="1">Repairs</option>
                                            <option value="2">Transportation Reimbursement</option>
                                            <option value="3">Other Reimbursements</option>
                                            <option value="4">Others</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <textarea required placeholder="Describe your request...." value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                                    </td>
                                </tr>

                                <tr>
                                    <td style={{display:"flex",justifyContent:"space-around"}}>
                                        <button  onClick={()=>{
                                            setDescription("");
                                            setCategory("")
                                    }}>Reset</button>                                                                       
                                        <input style={{cursor: isLoading?"wait":""}} type= "submit" />
                                    </td>
                                </tr>
                            
                            

                            </tbody>
                    </table>
                </form>
                {newRequestSuccess?
                    <InfoPopup info="Request Made Sucessfully" ok={()=>setNewRequestSuccess(false)}/>
                    :""
                
            }
        </div>
     );
}
 
export default NewRequest;