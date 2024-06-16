import React, { useState } from 'react'
import Header from '../header/Header'
import UserSettings from './UserSettings'

import styles from './css/AdminMenu.module.css'

const AdminMenu = () => {
  const [showUsers, setShowUsers] = useState(false)

  return (
    <div>
      <Header />
      <div className={styles.mainBox}>
        <h1>This is the admin menu.</h1>
        <div className={styles.menu}>
          <button onClick={() => setShowUsers(true)}>Users</button>
          <button onClick={() => console.log('Menu 1')}>Menu 1</button>
          <button onClick={() => console.log('Menu 2')}>Menu 2</button>
          <button onClick={() => console.log('Menu 3')}>Menu 3</button>
          <button onClick={() => console.log('Menu 4')}>Menu 4</button>
        </div>
        {showUsers && <UserSettings />}
      </div>
    </div>
  )
}

export default AdminMenu
