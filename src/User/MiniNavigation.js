import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link, useHistory } from "react-router-dom"

const MiniNavigation = () => {
  const roleId = localStorage.getItem("roleId")
  const history = useHistory()

  const [open, setOpen] = useState(false)

  const menu = (
    <FontAwesomeIcon
      icon={faBars}
      size="2x"
      style={{ marginRight: "5px", cursor: "pointer" }}
      onClick={() => {
        setOpen(!open)
      }}
    />
  )

  const close = (
    <FontAwesomeIcon
      icon={faXmark}
      size="2x"
      style={{ marginRight: "5px", cursor: "pointer" }}
      onClick={() => {
        setOpen(!open)
      }}
    />
  )

  const logout = () => {
    localStorage.clear()

    history.push("/")
    console.log(`User logged out successfully`)
  }

  return (
    <div className="MiniNavigation">
      <div className="logo"></div>

      {open ? close : menu}

      {open && (
        <ul
          className="MiniNavigationLinks"
          onClick={() => {
            setOpen(!open)
          }}
        >
          <Link to="/AllRequests">
            <div className="nav-item">
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

          <Link to="/ChangePassword">
            <div className="nav-item">
              <div className="change"></div>
              <li>Change Password</li>
            </div>
          </Link>

          <Link to="/">
            <div className="nav-item" onClick={logout}>
              <div className="logout"></div>
              <li>Logout</li>
            </div>
          </Link>
        </ul>
      )}
    </div>
  )
}

export default MiniNavigation
