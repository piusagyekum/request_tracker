import { faCircleUser} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useHistory,Link } from "react-router-dom";

const Header = () => {
   const history = useHistory();

   const[profile,setProfile]=useState(false)

   const name = localStorage.getItem("name");

 
   const logout = ()=>{
     
      localStorage.clear();

      history.push("/")
      console.log(`User logged out successfully`)
   }

   

    return ( 
        <div className="header">
         <div style={{display:"flex", alignItems:"center"}}>
                           
            <div className="logo"></div>

         </div>
               
         <h2>Request<span className="white">Tracker</span></h2>

         {/* name and avatar */}
         <div style={{display:"flex", marginRight:"5px", alignItems:"center"}}>
           
            <div className="user"><span className="white">Welcome </span>{name}</div>
                      
            <FontAwesomeIcon icon={faCircleUser} color="white" size="2x" onClick={()=>{setProfile(!profile);
                console.log(profile)}}/>
         </div>
         
         {profile? 
            <div  style={{
               position:"absolute",right:"10px", top:"50px",backgroundColor:"var(--primary)",
               color:"white" , borderRadius:"5px", padding:"10px", cursor:"pointer", width:"200px",
               height:"100px", borderBottom:"2px solid white", zIndex:"3"}}>

                  <div  className="profileOption" onClick={logout}  style={{borderBottom:"1px solid white", fontWeight:"bold",marginBottom:"10px"}}>Logout</div>
                  <Link to="/ChangePassword" style={{textDecoration:"none"}}><div className="profileOption" style={{borderBottom:"1px solid white", fontWeight:"bold", color:"white"}}>Change Password</div></Link>

            </div>
         :""}
            
        </div>
     );
}
 
export default Header;