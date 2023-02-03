import { Link } from "react-router-dom";

const Navigation = () => {
    return ( 
<ul className="navigation">
    
    <Link to ="/AllRequests">
        <div className="nav-item" >
            <div className="all"></div>
            <li>All Requests</li>
        </div>
    </Link>

    <Link to="/PendingRequests">
        <div className="nav-item">
            <div className="pending"></div>
            <li>Pending Requests</li>
        </div>
    </Link>
    
    <Link to="/ApprovedRequests">
        <div className="nav-item">
            <div className="approved"></div>
            <li>Approved Requests</li>
        </div>
    </Link>
    
    

    <Link to="/RejectedRequests">
        <div className="nav-item">
            <div className="rejected"></div>
            <li>Rejected Requests</li>
        </div>
    </Link>

    <Link to="/NewRequest">
        <div className="nav-item">
            <div className="new"></div>
            <li>New Request</li>
        </div>
    </Link>

   
</ul>



     );
}
 
export default Navigation;