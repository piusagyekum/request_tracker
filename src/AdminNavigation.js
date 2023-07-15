import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


const AdminNavigation = ({setProfile}) => {
    
    const [numberOfRequests,setNumberOfRequests]= useState(null)

    useEffect(()=>{

        setNumberOfRequests(localStorage.getItem("numberOfRequests")) 

        const handleStorageChange = (event) => {
        if (event.key === 'numberOfRequests') {
              setNumberOfRequests(event.newValue);
        }
    }

     window.addEventListener('storage', handleStorageChange);


        
    },[numberOfRequests])

    

    
    return ( 
    <ul className="navigation" onClick={()=>setProfile(false)}>
    
            <Link to ="/AdminAllRequests">
                <div className="nav-item" >
                    <div className="all"></div>
                    <li>All Requests</li>
                     
                </div>
            </Link>

            <Link to="/AdminPendingRequests">
                <div className="nav-item" style={{position:"relative"}}>
                    <div className="pending"></div>
                    <li>Pending Requests</li>
                    {numberOfRequests==null?"":<div className="notification">{numberOfRequests}</div>}
                </div>
            </Link>
            
            <Link to="/AdminApprovedRequests">
                <div className="nav-item">
                    <div className="approved"></div>
                    <li>Approved Requests</li>
                </div>
            </Link>
            
          

            <Link to="/AdminRejectedRequests">
                <div className="nav-item">
                    <div className="rejected"></div>
                    <li>Rejected Requests</li>
                </div>
            </Link>

            <Link to="/AdminSuspendedRequests">
                <div className="nav-item">
                    <div className="suspended"></div>
                    <li style={{fontSize:"12.5px"}}>Suspended Requests</li>
                </div>
            </Link>

            <Link to="/GetUsers">
                <div className="nav-item">
                    <div className="users"></div>
                    <li>Users</li>
                </div>
            </Link>

  
   
</ul>

     );
}
 
export default AdminNavigation;