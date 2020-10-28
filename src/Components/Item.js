import React from 'react'
import './Item.css'

export default function Item({ name, age, email, func, index }) {
    

    return (
        <div className="item" onClick={() => func(index)}>
            <h3 className="delete">Delete User?</h3>
            <h3 className="item-name">{name}</h3>
            <h3 className="item-age">{age}</h3>
            <h3 className="item-email">{email}</h3>
        </div>
    )
}
