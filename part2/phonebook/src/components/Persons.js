import React from 'react'

const Persons = ({searchResult, toggleDelete}) => {
  return (
    <div>
      {searchResult.map(person => 
      <div key={person.name}>
        {person.name} {person.number}
        <button onClick={() => toggleDelete(person.id)}>delete</button>
      </div>)}
    </div>
  )
}

export default Persons