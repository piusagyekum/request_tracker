import { useEffect,useState } from "react";
import { useHistory } from "react-router-dom";
import api from "./api/api";
import ProgressBarr from "./ProgressBar";
import Pagination from "./Pagination";

const AdminRequests = ({title,rank,stat,setProfile}) => {
    const token = localStorage.getItem("token")
    const roleId = localStorage.getItem("roleId")
    const [requests,setRequests]=useState("");
    const history = useHistory();
    const[error,setError]=useState(false);

    const[records,setRecords]=useState(true);
    const[isPending,setIsPending]=useState(true);

    const[fullDetails,setFullDetails]=  useState(false);
    const[selectedRequest,setSelectedRequest]=useState(null);




    const[currentPage,setCurrentPage]=useState(1);
    const postsPerPage= 10;
    
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = requests.slice(firstPostIndex,lastPostIndex);

    useEffect(()=>{

    setRecords("");
       

    if(!token){
        console.log("User not logged in");
        history.push("/")
    }
    else{
       
          
                    api.get(`GetAllRequests${rank}/?stat=${stat}`,{
                    headers:{ "Authorization": `Bearer ${token}`},
                
                    params:{"stat" :`${stat}` }
                    
                    
                    })
                    .then(response=>{

                        console.log(response)
                    
                        
                        if(response.data.code!=="0"){
                          
                            
                            setRecords(false)
                            setIsPending(false)
                            setError(false)
                        }
                        else{

                            setRequests(response.data.responseData);
                            console.log("requests ready")
                            setIsPending(false);
                            setRecords(true)
                            setError(false)
                        }
                        
                    })
                    .catch(error=>{
                        setRecords(true)
                        setIsPending(false)
                        setError(true)
                        console.log(error)
                        console.log("error made")
                    
                    })
        
      
}},[stat,rank,roleId,token,history])
    return ( 
        <div className="AdminRequests" onClick={()=>{setProfile(false)}}>
            
     
        
        
        <table >
            <thead>
                <tr>
                    <th colspan="5" style={{
                        backgroundColor:"var(--primary)",
                        borderRadius:"10px 10px 0 0",
                        lineHeight:"2.5rem",
                        border:"none",
                        textAlign:"center",
                        color:"white"
                    }}>{title}</th>
                </tr>
                <tr className="heading">
                    <th>REQ ID</th>
                    <th>REQUESTER</th>
                    <th>CATEGORY</th>
                    <th>DESCRIPTION</th>
                    <th>STATUS</th>
                </tr>
                
            </thead>
            <tbody>
        {isPending?<div>loading...</div>:""}  
        {records?"":<div>No records to display</div>}
        {error?<div>Error</div>:""}

        {requests&&currentPosts.map(request=>(
        <>
                <tr key={request.requestId} className="tr"   
                onClick={() => {
                    setSelectedRequest(request)
                    setFullDetails(true)
                }}
                >
                    <td>{request.requestId}</td>
                    <td>{request.name}</td>
                    <td>{request.category}</td>
                    <td>{request.description.substring(0, 10)}</td>

                    <td style={{fontSize:"13px"}}>
                        {
                            // manager was wrongly spelt in the api
                            request.manangerReview==="Rejected"? <div style={{width:"100px",height:"10px",backgroundColor:"red",borderRadius:"15px"}}></div>:
                            request.adminReview==="Rejected"? <div style={{width:"100px",height:"10px",backgroundColor:"red",borderRadius:"15px"}}></div>:
/* check response for seeadmin */  
                            request.adminReview==="See Admin"? <div style={{width:"100px",height:"10px",backgroundColor:"pink",borderRadius:"15px"}}></div>:
                            request.manangerReview==="Pending" && request.adminReview==="Pending"? <ProgressBarr percent={10}/>:
                            request.manangerReview==="Approved" && request.adminReview === "Approved"? <div style={{width:"100px",height:"10px",backgroundColor:"green",borderRadius:"15px"}}></div>:
                            request.manangerReview==="Approved" && request.adminReview === "Pending"? 
                            
                            <div style={{width:"100px",height:"10px",backgroundColor:"#9e9e9e93",borderRadius:"15px"}}>
                                <div style={{width:"70px",height:"10px",backgroundColor:"yellow",borderRadius:"15px"}}></div>
                            </div>:
                            
                            " Status Unknown"
                        }

                        {
                            request.manangerReview==="Rejected"? <div>Rejected by Manager</div>:
                            request.adminReview==="Rejected"? <div>Rejected by Admin</div> :
                            request.adminReview==="See Admin"?<div>Suspended</div> :
                            request.manangerReview==="Pending"&& request.adminReview==="Pending"? <div>Awaiting approval</div>:
                            request.manangerReview==="Approved" && request.adminReview === "Approved"? <div>Admin Approved</div>:
                            request.manangerReview==="Approved" && request.adminReview === "Pending"? <div>Manager Approved</div>:
                            ""                       
                        }


                    </td>

                  

                   
                </tr>
                {selectedRequest === request&& fullDetails &&(
                <div className="Popup-main">
                    <div className="full">
                        <table>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td>Request ID</td>
                                    <td>{request.requestId}</td>
                                </tr>
                                <tr>
                                    <td>Requester</td>
                                    <td>{request.name}</td>
                                </tr> 
                               
                                <tr>
                                    <td>Department</td>
                                    <td>{request.department}</td>
                                </tr>

                                <tr>
                                    <td>Request Category</td>
                                    <td>{request.category}</td>
                                </tr>
                                <tr>
                                    <td>Request Description</td>
                                    <td>{request.description}</td>
                                </tr>

                                <tr>
                                    <td>Request made on</td>
                                    <td>{request.dateTime.substring(0,10)} @ {request.dateTime.substring(11,16)}</td>
                                </tr>
                                <tr>
                                    <td>Manager Review by {request.manager}</td>
                                    <td>{request.manangerReview}</td>
                                </tr>
                                {request.manangerReview==="Rejected"?
                                    <tr>
                                    <td>Reason for Rejection</td>
                                    <td>{request.reason}</td>
                                    </tr>:
                                    ""
                                }
                                {request.mangApprovedDate?
                                <tr>
                                    <td>Manager Review Date</td>
                                    <td>{request.mangApprovedDate.substring(0,10)} @ {request.mangApprovedDate.substring(11,16)}</td>
                                </tr>
                                :""
                                }
                                <tr>
                                    <td>Admin Review</td>
                                    <td>{request.adminReview}</td>
                                </tr>
                                {request.adminReview==="Rejected"?
                                    <tr>
                                    <td>Reason for Rejection</td>
                                    <td>{request.reason}</td>
                                    </tr>:
                                    ""
                                }
                                  {request.adminApprovedDate?
                                <tr>
                                    <td>Admin Review Date</td>
                                    <td>{request.adminApprovedDate.substring(0,10)} @ {request.adminApprovedDate.substring(11,16)}</td>
                                </tr>
                                :""
                                }
                                <tr>
                                <td colSpan="2" style={{textAlign:"right"}}>
                                       <button className="close" onClick={()=>{setFullDetails(false)}}>Close</button>
                                </td>
                               
                                </tr>
                               
                            </tbody>
                        </table>
                    </div>

                </div>
               )}
                </>
             ))}
 
            </tbody>
          
        </table>
        <Pagination 
        totalPosts={requests.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
         />







    
        </div>
     );
}
 
export default AdminRequests;