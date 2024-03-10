import React from 'react'

const UserDetail = ({ user, onEdit, onDelete }) => {
  if (!user) {
    return null
  }

  const keysToDisplay = [
    'user_id',
    'username',
    'type',
    'expiration_date',
    'updatedAt',
    'createdAt',
  ] // Add the keys of the properties you want to display

  const displayNames = {
    user_id: 'User ID',
    username: 'Username',
    type: 'Type',
    expiration_date: 'Expiration Date',
    updatedAt: 'Updated At',
    createdAt: 'Created At',
  } // Add the display names for the keys

  return (
    <div>
      <h3>User Detail</h3>

      <ul>
        {keysToDisplay.map((key) => (
          <li key={key}>
            <strong>{displayNames[key] || key}:</strong>{' '}
            {key.includes('date') || key.includes('At')
              ? new Date(user[key]).toLocaleDateString('fi-FI')
              : user[key]}
          </li>
        ))}
      </ul>

      <button onClick={() => onEdit(user)}>Edit</button>
      <button onClick={() => onDelete(user)}>Delete</button>
    </div>
  )
}

export default UserDetail
