import Navigation from "./User/Navigation"
import Header from "./User/header"
import Requests from "./User/Requests"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import MiniNavigation from "./User/MiniNavigation"
import AdminRequests from "./AdminRequests"
import { useState } from "react"

import Login from "./Login"
import NewRequest from "./User/NewRequest"
import AdminNavigation from "./AdminNavigation"
import AdminPendingRequests from "./AdminPendingRequests"
import ManNav from "./ManNav"
import GetUsers from "./GetUsers"
import AddUser from "./AddUser"
import ChangePassword from "./ChangePassword"

import Table from "./test"
import Test from "./test"
import AdminMiniNavigation from "./AdminMiniNavigation"
import ChangePassword2 from "./ChangePassword2"

function App() {
  const [profile, setProfile] = useState(false)

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>

          <Route exact path="/AllRequests">
            <Header profile={profile} setProfile={setProfile} />
            <Navigation setProfile={setProfile} />
            <MiniNavigation />
            <Requests
              title="ALL REQUESTS"
              stat="5"
              rank="Employee"
              setProfile={setProfile}
            />
          </Route>

          <Route exact path="/PendingRequests">
            <Header profile={profile} setProfile={setProfile} />
            <Navigation setProfile={setProfile} />
            <MiniNavigation />
            <Requests
              title="PENDING REQUESTS"
              stat="1"
              rank="Employee"
              setProfile={setProfile}
            />
          </Route>

          <Route exact path="/RejectedRequests">
            <Header profile={profile} setProfile={setProfile} />
            <Navigation setProfile={setProfile} />
            <MiniNavigation />
            <Requests
              title="REJECTED REQUESTS"
              rank="Employee"
              stat="3"
              setProfile={setProfile}
            />
          </Route>

          <Route exact path="/NewRequest">
            <Header profile={profile} setProfile={setProfile} />
            <Navigation setProfile={setProfile} />
            <MiniNavigation />
            <NewRequest setProfile={setProfile} />
          </Route>

          <Route exact path="/ApprovedRequests">
            <Header profile={profile} setProfile={setProfile} />
            <Navigation setProfile={setProfile} />
            <MiniNavigation />
            <Requests
              title="APPROVED REQUESTS"
              rank="Employee"
              stat="2"
              setProfile={setProfile}
            />
          </Route>

          {/* --------------------ADMIN ROUTES---------------------------------- */}
          <Route exact path="/AdminApprovedRequests">
            <Header profile={profile} setProfile={setProfile} />
            <AdminNavigation />
            <AdminMiniNavigation />
            <AdminRequests
              title="APPROVED REQUESTS"
              rank="Admin"
              stat="2"
              status="Approved"
              setProfile={setProfile}
            />
          </Route>

          <Route exact path="/AdminRejectedRequests">
            <Header profile={profile} setProfile={setProfile} />
            <AdminNavigation setProfile={setProfile} />
            <AdminMiniNavigation />
            <AdminRequests
              title="REJECTED REQUESTS"
              rank="Admin"
              stat="3"
              setProfile={setProfile}
            />
          </Route>

          <Route exact path="/AdminAllRequests">
            <Header profile={profile} setProfile={setProfile} />
            <AdminNavigation setProfile={setProfile} />
            <AdminMiniNavigation />
            <AdminRequests
              title="ALL REQUESTS"
              rank="Admin"
              stat="5"
              setProfile={setProfile}
            />
          </Route>

          <Route exact path="/AdminPendingRequests">
            <Header profile={profile} setProfile={setProfile} />
            <AdminNavigation setProfile={setProfile} />
            <AdminMiniNavigation />

            <AdminPendingRequests
              title="PENDING REQUESTS"
              rank="Admin"
              stat="1"
              setProfile={setProfile}
            />
          </Route>

          <Route exact path="/AdminSuspendedRequests">
            <Header profile={profile} setProfile={setProfile} />
            <AdminNavigation setProfile={setProfile} />
            <AdminMiniNavigation />
            <AdminPendingRequests
              title="SUSPENDED REQUESTS"
              rank="Admin"
              stat="4"
              setProfile={setProfile}
            />
          </Route>

          <Route exact path="/GetUsers">
            <Header profile={profile} setProfile={setProfile} />
            <AdminNavigation setProfile={setProfile} />
            <AdminMiniNavigation />
            <GetUsers setProfile={setProfile} />
          </Route>

          <Route exact path="/AddUser">
            <Header profile={profile} setProfile={setProfile} />
            <AdminNavigation setProfile={setProfile} />
            <AdminMiniNavigation />
            <AddUser setProfile={setProfile} />
          </Route>

          {/* --------------------Manager routes-------------------------------------------- */}

          <Route exact path="/ManApprovedRequests">
            <Header profile={profile} setProfile={setProfile} />
            <ManNav setProfile={setProfile} />
            <AdminMiniNavigation />
            <AdminRequests
              title="APPROVED REQUESTS"
              rank="Manager"
              stat="2"
              setProfile={setProfile}
            />
          </Route>

          <Route exact path="/ManRejectedRequests">
            <Header profile={profile} setProfile={setProfile} />
            <ManNav setProfile={setProfile} />
            <AdminMiniNavigation />
            <AdminRequests
              title="REJECTED REQUESTS"
              rank="Manager"
              stat="3"
              setProfile={setProfile}
            />
          </Route>

          <Route exact path="/ManAllRequests">
            <Header profile={profile} setProfile={setProfile} />
            <ManNav setProfile={setProfile} />
            <AdminMiniNavigation />
            <AdminRequests
              title="ALL REQUESTS"
              rank="Manager"
              stat="5"
              setProfile={setProfile}
            />
          </Route>

          <Route exact path="/ManPendingRequests">
            <Header profile={profile} setProfile={setProfile} />
            <ManNav setProfile={setProfile} />
            <AdminMiniNavigation />
            <AdminPendingRequests
              title="PENDING REQUESTS"
              rank="Manager"
              stat="1"
              setProfile={setProfile}
            />
          </Route>

          {/* ----------------------------------Other Routes------------------------------ */}
          <Route exact path="/ChangePassword">
            <Header profile={profile} setProfile={setProfile} />
            {/* <AdminMiniNavigation/> */}

            <ChangePassword setProfile={setProfile} />
          </Route>

          <Route exact path="/AdminChangePassword">
            <Header profile={profile} setProfile={setProfile} />
            {/* <AdminMiniNavigation/> */}

            <ChangePassword2 setProfile={setProfile} />
          </Route>

          {/* --------------------------------DELETE------------------------------------- */}

          <Route exact path="/test">
            <Header />
            <Test />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
