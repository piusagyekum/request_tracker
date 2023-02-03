const InfoPopup = ({info,ok}) => {
    return ( 
        <div className="Popup-main">
             <div className="Popup-sub">
                <div style={{display:"flex",justifyContent:"space-around", alignItems:"center", borderBottom:"1px solid grey", padding:"5px 0  10px 0"}}>
                                <div className="logo"></div>
                                <h3>RequestTracker</h3>
                </div>
                <div className="info">{info}</div>

                
                    <button className="ok" onClick={ok}>OK</button>
                
              
            </div>
        </div>
     );
}
 
export default InfoPopup;