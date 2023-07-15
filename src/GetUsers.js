import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "./api/api"
import Popup from "./Popup"
import { useReducer } from "react"
import Pagination from "./Pagination"

const GetUsers = () => {
  const token = localStorage.getItem("token")
  const [users, setUsers] = useState("")

  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)

  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 8

  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage
  const currentPosts = users.slice(firstPostIndex, lastPostIndex)

  const [selectedUser, setSelectedUser] = useState(null)

  const cancel = () => {
    setDeleteSuccess(false)
  }

  const handleDelete = (id, { token }) => {
    api
      .delete(`DeleteUser?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { id: `${id}` },
      })
      .then(res => {
        console.log(`User was deleted successfully`)
        setDeleteSuccess(true)

        setTimeout(() => {
          setDeleteSuccess(false)
          forceUpdate()
        }, 1000)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    api
      .get("GetUsers/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        console.log(res)
        setUsers(res.data.responseData)
      })
      .catch(err => console.log(err))
  }, [token, reducerValue])

  return (
    <div className="GetUsers">
      <table>
        <thead>
          <tr
            style={{
              backgroundColor: "var(--primary)",

              lineHeight: "2.5rem",
              color: "white",
            }}
          >
            <th
              colSpan="5"
              style={{
                textAlign: "left",
                paddingLeft: "5px",
                borderRadius: "7px 0 0 0",
              }}
            >
              USERS
            </th>

            <th
              style={{
                borderRadius: "0 7px 0 0",
                textAlign: "left",
                padding: " 0 8px",
              }}
            >
              <Link to="/AddUser">
                <button className="add">ADD USER</button>
              </Link>
            </th>
          </tr>
          <tr className="heading">
            <th>ID</th>
            <th>USER</th>
            <th>EMAIL</th>
            <th>DEPARTMENT</th>
            <th>ROLE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            currentPosts.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td>{user.role}</td>

                <td>
                  <button
                    className="delete"
                    onClick={() => {
                      setSelectedUser(user)
                      setDeleteSuccess(true)
                    }}
                  >
                    Delete
                  </button>
                </td>
                {selectedUser === user && deleteSuccess ? (
                  <Popup
                    info="Are you sure you want to delete this user?"
                    cancel={cancel}
                    yes={() => {
                      handleDelete(user.id, { token })
                    }}
                  />
                ) : (
                  ""
                )}
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination
        totalPosts={users.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  )
}

export default GetUsers
