import Navigation from "./User/Navigation";
import Header from "./User/header"
import Requests from "./User/Requests";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MiniNavigation from "./User/MiniNavigation";
import AdminRequests from "./AdminRequests";

import Login from "./Login"
import NewRequest from "./User/NewRequest";
import AdminNavigation from "./AdminNavigation";
import AdminPendingRequests from "./AdminPendingRequests";
import ManNav from "./ManNav";
import GetUsers from "./GetUsers";
import AddUser from "./AddUser";
import ChangePassword from "./ChangePassword";

import Table from "./test";


function App() {





  return (
    <Router>
      <div className="App">
        <Switch>

       

          <Route exact path="/">
            <Login/>
          </Route>

        
          <Route exact path="/AllRequests">
            <Header/>
            <Navigation/>
            <MiniNavigation/>
            <Requests  title="ALL REQUESTS" stat="5"  rank="Employee"/>
          </Route>

          <Route exact path="/PendingRequests">
            <Header/>
            <Navigation/>
            <MiniNavigation/>
            <Requests title="PENDING REQUESTS" stat="1" rank="Employee"/>
          </Route>

          <Route exact path="/RejectedRequests">
            <Header/>
            <Navigation/>
            <MiniNavigation/>
            <Requests  title="REJECTED REQUESTS"  rank="Employee" stat="3" status=""/>
          </Route>


          <Route exact path="/NewRequest">
            <Header/>
            <Navigation/>
            <MiniNavigation/>
            <NewRequest/>
          </Route>

       <Route exact path="/ApprovedRequests">
            <Header/>
            <Navigation/>
            <MiniNavigation/>
            <Requests  title="APPROVED REQUESTS" rank="Employee" stat="2"/>
          </Route>

      
      {/* --------------------ADMIN ROUTES---------------------------------- */}
          <Route exact path="/AdminApprovedRequests">
            <Header/>
            <AdminNavigation/>
            <AdminRequests title="APPROVED REQUESTS" rank="Admin" stat="2" status="Approved"/>
          </Route>

          <Route exact path="/AdminRejectedRequests">
            <Header/>
            <AdminNavigation/>
            <AdminRequests title="REJECTED REQUESTS" rank="Admin" stat="3"/>
            </Route> 

          <Route exact path="/AdminAllRequests">
            <Header/>
            <AdminNavigation/>
            <AdminRequests title="ALL REQUESTS" rank="Admin" stat="5"/>
          </Route>


          <Route exact path="/AdminPendingRequests">
            <Header/>
            <AdminNavigation/>
            <AdminPendingRequests rank="Admin" stat="1"/>
          </Route>

          <Route exact path="/AdminSuspendedRequests">
            <Header/>
            <AdminNavigation/>
            {/* CHECK SEE ADMIN STAT */}
            <AdminRequests title="SUSPENDED REQUESTS" rank="Admin" stat="4"/>
            </Route>
         
          <Route exact path="/GetUsers">
            <Header/>
            <AdminNavigation/>
            <GetUsers/>
          </Route>

          <Route exact path="/AddUser">         
          <Header/>
          <AdminNavigation/>
          <AddUser/>
          </Route>
          

        
        {/* --------------------Manager routes-------------------------------------------- */}

        <Route exact path="/ManApprovedRequests">
            <Header/>
            <ManNav/>
            <AdminRequests title="APPROVED REQUESTS" rank="Manager" stat="2"/>
          </Route>

          <Route exact path="/ManRejectedRequests">
            <Header/>
            <ManNav/>
            <AdminRequests title="REJECTED REQUESTS" rank="Manager" stat="3"/>
            </Route>

          <Route exact path="/ManAllRequests">
            <Header/>
            <ManNav/>
            <AdminRequests title="ALL REQUESTS" rank="Manager" stat="5"/>
            </Route>


          <Route exact path="/ManPendingRequests">
          <Header/>
            <ManNav/>
            <AdminPendingRequests rank="Manager" stat="1"/>
          </Route>


          {/* ----------------------------------Other Routes------------------------------ */}
          <Route exact path="/ChangePassword">
            <Header/>
           
            <ChangePassword/>

          </Route>




          {/* --------------------------------DELETE------------------------------------- */}

        <Route exact path="/test">
          <Header/>
          {/* <Table/> */}

        </Route>

        
    
      
        
        
      


      </Switch>
      
      </div>
    </Router>
   
  );

}


export default App;
