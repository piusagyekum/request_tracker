import { useState } from "react";

const Popup = ({info, cancel,yes,isLoading}) => {
    
    console.log("popup rendered")
    
    return ( 
        <div className="Popup-main">
            <div className="Popup-sub">
                <div style={{display:"flex",justifyContent:"space-around", alignItems:"center", borderBottom:"1px solid grey", padding:"5px 0  10px 0"}}>
                                <div className="logo"></div>
                                <h3>RequestTracker</h3>
                </div>
                <div className="info">{info}</div>

                <div className="buttons">
                    <button onClick={cancel}>Cancel</button>
                    <button onClick={yes} style={{cursor: isLoading?"wait":""}}>Yes</button>
                </div>
              
            </div>
        </div>
     );
}
 
export default Popup;