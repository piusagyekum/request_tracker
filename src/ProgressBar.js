import "react-step-progress-bar/styles.css";

import { ProgressBar } from "react-step-progress-bar";

const ProgressBarr = ({percent}) => {


  
    return ( 
        <div>
    <ProgressBar 

className="my-progress-bar"
// steps={steps} 
      // activeStep={currentStep} 

      height={10} 
      width={100} 
       barColor="#00ff00"
      // labelFontSize={14}

      // percent={`${percent}`}

      percent={`${percent}`}
      fillBackground="linear-gradient(to right, #fefb72, #ffa500)"
     
        />
       
        </div>
     );
}
 
export default ProgressBarr;