import { useEffect, useState } from "react";
import api from "./api/api";
import { useHistory } from "react-router-dom";
import Popup from "./Popup";
import Pagination from "./Pagination";
import ProgressBarr from "./ProgressBar";
import { useReducer } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";




const AdminPendingRequests = ({title,rank,stat,setProfile}) => {
    const roleId=localStorage.getItem("roleId")
    const history = useHistory();
    
    const token = localStorage.getItem("token");
    const [requests,setRequests] =useState("");

    const[openReject,setOpenReject]=useState(false);
    const[openApprove,setOpenApprove]=useState(false);
    const[openSeeAdmin,setOpenSeeAdmin]=useState(false);

    const[reason,setReason]= useState("");
    const[rejectPopup,setRejectPopup]=useState(false)
    const[approveSuccess,setApproveSucess]=useState(false)
    const[fullDetails,setFullDetails]=  useState(false)

    const[error,setError]=useState(false);

    const[records,setRecords]=useState(true);

    //for table loading
    const[isPending,setIsPending]=useState(true);
    //for command loading
    const[isLoading,setIsLoading]=useState(false)

    const[reducerValue,forceUpdate]=useReducer(x=>x+1,0)


    const[selectedRequest,setSelectedRequest]=useState(null)
    
    
   

    // Pagination
    const[currentPage,setCurrentPage]=useState(1);
    const postsPerPage=10;
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = requests.slice(firstPostIndex,lastPostIndex);

    useEffect(()=>{
        const numberOfRequests = requests.length;

        requests && localStorage.setItem("numberOfRequests",numberOfRequests)
        console.log(numberOfRequests)

    },[requests])
   

    
    
    
    
    
    
    const approve = (id)=>{
        setIsLoading(true)
        console.log(id)
        api.post(`ApproveRequest?id=${id}`,null,{
            headers:{"Authorization":`Bearer ${token}`},
            params:{"id":`${id}`},
        })
        .then(res=>{
            
            console.log(`Request Approved`)
            setIsLoading(false)
            forceUpdate();
            
            setOpenApprove(false)
            

            //comment settimeout
            // setTimeout(()=>{
                
            //     if(roleId==="2"){
            //         history.push("/AdminApprovedRequests")
            //     }
            //     else{
            //             history.push("/ManApprovedRequests")
            //     }            
            // }
            // ,1000)
           
               
    })
        .catch(err=>{
            console.log(err)
            setIsLoading(false)
        })
    }




    const reject = (id,{reason})=>{
        setIsLoading(true)
       
        api.post(`RejectRequest?id=${id}&reason=${reason}`,null,{
            headers:{"Authorization":`Bearer ${token}`,            
                     "Content-Type":"application/json"
            },

            params:{"id":`${id}`, "reason":`${reason}`}
        })
        .then(res=>{
            setReason("")
          

           
           
            console.log(`Request Rejected`)
            setIsLoading(false) 
            forceUpdate();
                     
            setOpenReject(false)
            
            
    //         if(roleId==="2"){
                
    //             history.push("/AdminPendingRequests")

    //         }
    //         else{
         

    //             history.push("/ManPendingRequests")
    //         }
     })
        .catch(err=>{
            setIsLoading(false)

            console.log(err)
        })
    }

    const seeAdmin = (id,{token})=>{
        setIsLoading(true)
        api.post(`SeeAdminRequest?id=${id}`,null,{
            headers:{"Authorization":`Bearer ${token}`},
            params:{"id":`${id}`}
        })
        .then(res=>{
            setIsLoading(false)


            forceUpdate();

            setOpenSeeAdmin(false);
            
        })
        .catch(err=>{
            setIsLoading(false)

            console.log(err)
        })
    }



    useEffect(()=>{

        setRecords("");

        if(!token){
            history.push("/")
        }
        else{
        

        api.get(`GetAllRequests${rank}/?stat=${stat}`,{
            headers:{
                "Authorization": `Bearer ${token}`,
                "Content-Type":"application/json"
            },
        
            params:{"stat" :`${stat}`    }
        })
        .then(response=>{
            if(response.data.code!=="0"){
                          
                setRequests("")
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
    }
    },[rank,history,stat,token,reducerValue])


// --------------------------------------------------------------------------------------------


    return ( 
        <div className="AdminPendingRequests" style={{cursor: isLoading?"wait":""}} onClick={()=>setProfile(false)}>
        
            <table >
            <thead>
                <tr>
                    <th colSpan="5" style={{
                        backgroundColor:"var(--primary)",
                        borderRadius:"10px 10px 0 0",
                        lineHeight:"2.5rem",
                        border:"none",
                        textAlign:"center",
                        color:"white"
                    }}>{title}</th>
                </tr>
                {/* <tr className="search-row">
                    <th colSpan="5" className="search">  
                        <input type="text"
                        placeholder="Search for requests or users"
                        />

                        <input type="date"
                        placeholder="Start date"
                        />

                        <input type="date"
                        placeholder="End date"
                        />
                        <button>Search</button>

                         <FontAwesomeIcon icon={faMagnifyingGlass}/> 


                    </th>
                    
                   
                </tr> */}
                
                <tr className="heading">
                    <th>REQ ID</th>
                    <th>REQUESTER</th>
                    <th>CATEGORY</th>
                    <th>DESCRIPTION</th>
                    <th>STATUS</th>
                    
                </tr>
                 
                
            </thead>
            <tbody>
        {isPending?<td>loading...</td>:""}  
        {records?"":<td>No records to display</td>}
        {error?<td>Error</td>:""}

        {requests && currentPosts.map(request=>(
              <>
              <tr 
                key={request.requestId} 
                className="tr"  
                onClick={() => {
                setSelectedRequest(request)
                setFullDetails(true)
                }}>
                    <td>{request.requestId}</td>
                    <td>{request.name}</td>
                    <td>{request.category}</td>
                    <td>{request.description.substring(0, 10)}...</td>
                    <td style={{fontSize:"13px"}}>
                    {
                            // manager was wrongly spelt in the api
                            request.manangerReview==="Rejected"? <div style={{width:"100px",height:"10px",backgroundColor:"red",borderRadius:"15px"}}></div>:
                            request.adminReview==="Rejected"? <div style={{width:"100px",height:"10px",backgroundColor:"red",borderRadius:"15px"}}></div>:
 
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


                               







                                <tr  onClick={()=>setFullDetails(false)}>
                                {roleId==="2"?
                                <td colSpan="2" className="buttons">
                                    <button className="approve" onClick={()=>{setOpenApprove(!openApprove)}}>Approve</button>
                                    {request.adminReview==="See Admin"?"":
                                     <button className="seeadmin" onClick={()=>{setOpenSeeAdmin(!openSeeAdmin)}}>See Admin</button>
                                    }
                                    <button className="reject" onClick={()=> setOpenReject(!openReject)}>Reject</button>
                                    <button className="close" onClick={()=>{setFullDetails(false)}}>Close</button>
                                </td>
                                :
                                <td colSpan="2" className="buttons">
                                    <button className="approve" onClick={()=>{setOpenApprove(!openApprove)}}>Approve</button>
                                    <button className="reject" onClick={()=> setOpenReject(!openReject)}>Reject</button>
                                    <button className="close" onClick={()=>{setFullDetails(!fullDetails)}}>Close</button>
                                </td>

                                }
                               
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
               )}


                

          
                   
              
            { selectedRequest === request && openReject?
                    
                    <div className="Popup-main">
                        <div className="Popup-sub">
                            <div style={{display:"flex",justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid grey", padding:"5px 0  10px 0"}}>
                                    <div className="logo"></div>
                                    <h3>RequestTracker</h3>
                            </div>

                            <textarea placeholder="Reason for Rejection...." value={reason} onChange={(e)=>setReason(e.target.value)}></textarea>

                            <div className="options">
                                <button className="proceed" onClick={()=>reject(request.requestId,{reason})} style={{cursor: isLoading?"wait":""}}>Proceed</button>
                                <button className="proceed" onClick={()=>{setOpenReject(false)}}>Cancel</button>
                            </div>
                        </div>
                    </div>

                :""}
                   
             
              
                {selectedRequest === request&& openSeeAdmin?
                    
                 <Popup info="Are you sure you want to suspend this request" isLoading={isLoading}
                 yes={()=>{seeAdmin(request.requestId,{token})}} cancel={()=>setOpenSeeAdmin(false)}/>


                :""} 

                
                {selectedRequest === request && openApprove?
                    
                    <Popup info="Are you sure you want to approve this request" isLoading={isLoading}
                    yes={()=>{approve(request.requestId)}} cancel={()=>setOpenApprove(false)}/>
   
   
                   :""} 


            {rejectPopup?
                <div className="Popup-main">
                    <div className="Popup-sub">
         
                        <div style={{display:"flex",justifyContent:"space-around", alignItems:"center", borderBottom:"1px solid grey", padding:"5px 0  10px 0"}}>
                                        <div className="logo"></div>
                                        <h2>RequestTracker</h2>
                        </div>

                        <div className="info">Request rejected successfully</div>
                        <button className="ok" onClick={()=>{
                            if(roleId==="2"){
                            history.push("/AdminRejectedRequests")}
                            else{
                                history.push("/ManRejectedRequests")
                            }
                        }
                        }>OK</button>
                    

                    </div>
                </div>
            : ""}
          

              
              
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
 
export default AdminPendingRequests;