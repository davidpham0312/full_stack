import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch] = useState('')
  const [ searchResult, setSearchResult] = useState([])

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const handleSearchChange = (event) =>{
    setNewSearch(event.target.value)
  }
  const addPerson = (event) => {
    event.preventDefault()
    const data = {
      name: newName,
      number: newNumber
    }
    const listCheck = persons.map(person => person.name)
    if (listCheck.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(data))
      setSearchResult(searchResult.concat(data))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  useEffect(() => {
    const results = persons.filter(person => person.name.toLowerCase().includes(newSearch));
      setSearchResult(results)
    }, [persons,newSearch]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchHandler={handleSearchChange}/>
      <h3>add a new</h3>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        newNumber={newNumber}/>
      <h3>Numbers</h3>
      <Persons searchResult={searchResult}/>
    </div>
  )
}

export default App