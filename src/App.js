import React, { useState } from 'react'
import usePersistentState from './usePersistentState'
import { confirmAlert } from 'react-confirm-alert'
import './App.css'

import 'react-confirm-alert/src/react-confirm-alert.css'
import Item from './Components/Item'
import data from './usersData'

function App() {
  const [initialUser] = useState({ name: "", age: "", email: "" })
  const [user, setUser] = useState(initialUser)
  const [users, setUsers] = usePersistentState(data, 'users')

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const userWithId = { id: new Date().getTime().toString(), ...user }
    setUsers([...users, userWithId])
    setUser(initialUser)
  }

  const deleteUser = (id) => {
    confirmAlert({
      title: 'Confirm to delete.',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            setUsers(users.filter((user, i) => id !== i))
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });

  }

  return (
    <div className="container">
      <form className="my-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="email">Age:</label>
          <input
            type="text"
            name="age"
            maxLength="3"
            value={user.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <button>Save User</button>
      </form>

      <div className="titles">
        <h3 className="title-name">Name</h3>
        <h3 className="title-age">Age</h3>
        <h3 className="title-email">Email</h3>
      </div>

      {users.map((user, i) => {
        return <Item
          key={user.id}
          name={user.name}
          age={user.age}
          email={user.email}
          index={i}
          func={deleteUser} />
      })}
    </div>
  );
}

export default App;
