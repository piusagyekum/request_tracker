import { faCircleUser} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useHistory,Link } from "react-router-dom";

const Header = ({setProfile,profile}) => {
   const history = useHistory();

   

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

         {/* name and avatar container */}
         <div className="name" style={{display:"flex", marginRight:"5px", alignItems:"center"}}>
           
            <div className="user"><span className="white">Welcome </span>{name}</div>
                      
            <FontAwesomeIcon icon={faCircleUser} color="white" size="2x" onClick={()=>{setProfile(!profile);
                console.log(profile)}}/>
         </div>
         
         {profile? 
            <div 
            style={{
               position:"absolute",right:"10px", top:"50px",backgroundColor:"var(--primary)",
               color:"white" , borderRadius:"5px", padding:"10px", cursor:"pointer", width:"200px",
               height:"100px", borderBottom:"2px solid white", zIndex:"3"}} onClick={()=>setProfile(false)}>

                  <div  className="profileOption" onClick={logout}  style={{ fontWeight:"bold",marginBottom:"10px", height:"28px", padding:"4px 4px", borderRadius:"3px"}} >Logout</div>
                  <Link to="/ChangePassword" style={{textDecoration:"none"}}><div className="profileOption" style={{fontWeight:"bold", color:"white", height:"28px", padding:"4px 4px", borderRadius:"3px"}}>Change Password</div></Link>

            </div>
         :""}
            
        </div>
     );
}
 
export default Header;