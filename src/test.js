import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

function Test() {

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
        <tr className="heading">
                    <th colSpan="2">
                        <input type="search"
                        placeholder="Search for requests or users"
                       
                        
                        />
                    </th>
                    <th>
                        <input type="date"
                        placeholder="Start date"
                        />

                        <input type="date"
                        placeholder="End date"
                        />

                       


                        


                    </th>
        </tr>
        </tbody>
      </table>
      <div>
       
      </div>


      <button><FontAwesomeIcon icon={faMagnifyingGlass} color="orange" /></button>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </div>
  );
}

export default Test;
