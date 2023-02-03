const Error = ({message}) => {
    return ( 
        <div className="Error">

            <div>Hmmmmm.....There was an error<br/>
                 Please try again later as we are fixing the issue<br/>
                 {message}

            </div>
        </div>
     );
}
 
export default Error;