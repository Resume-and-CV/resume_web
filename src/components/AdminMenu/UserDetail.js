import React from 'react'

const UserDetail = ({ user, onEdit, onDelete }) => {
  if (!user) {
    return null
  }

  const keysToDisplay = ['username', 'type', 'expiration_date_from_users'] // Add the keys of the properties you want to display

  const displayNames = {
    username: 'Username',
    type: 'Type',
    expiration_date_from_users: 'Expiration Date',
  } // Add the display names for the keys

  const formatDate = (date) => {
    return date
      ? new Date(date).toLocaleDateString('fi-FI')
      : 'No date provided'
  }

  return (
    <div>
      <h3>User Detail</h3>

      <ul>
        {keysToDisplay.map((key) => (
          <li key={key}>
            <strong>{displayNames[key] || key}:</strong>{' '}
            {key.includes('date') || key.includes('At')
              ? formatDate(user[key])
              : user[key]}
          </li>
        ))}
      </ul>

      <h3>User's Link</h3>

      <ul>
        <li>
          <strong>Link:</strong>{' '}
          {user.link ? (
            <a href={user.link} target="_blank" rel="noopener noreferrer">
              {user.link.length > 20
                ? `${user.link.substring(0, 20)}...`
                : user.link}
            </a>
          ) : (
            'No link provided'
          )}
          <br />
          <strong>Expiration Date:</strong>{' '}
          {formatDate(user.expiration_from_expiringlinks)}
          <br />
        </li>
      </ul>

      <button onClick={() => onEdit(user)}>Edit</button>
      <button onClick={() => onDelete(user)}>Delete</button>
    </div>
  )
}

export default UserDetail
