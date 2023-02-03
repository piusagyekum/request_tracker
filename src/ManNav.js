import { Link } from "react-router-dom";

const  ManNav= () => {
    return ( 
        <ul className="navigation">
    
            <Link to ="/ManAllRequests">
                <div className="nav-item" >
                    <div className="all"></div>
                    <li>All Requests</li>
                </div>
            </Link>

            <Link to="/ManPendingRequests">
                <div className="nav-item">
                    <div className="pending"></div>
                    <li>Pending Requests</li>
                </div>
            </Link>
            
            <Link to="/ManApprovedRequests">
                <div className="nav-item">
                    <div className="approved"></div>
                    <li>Approved Requests</li>
                </div>
            </Link>
            
            

            <Link to="/ManRejectedRequests">
                <div className="nav-item">
                    <div className="rejected"></div>
                    <li>Rejected Requests</li>
                </div>
            </Link>


  
   
</ul>
     );
}
 
export default ManNav ;