import personService from './services/person'
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  const notiStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  return (
    <div style={notiStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch] = useState('')
  const [ searchResult, setSearchResult] = useState([])
  const [ message, setMessage] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(response => {
      setPersons(response)
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

    const listCheck = persons.filter(person => person.name.toLowerCase().includes(newName.toLowerCase()))
    if (listCheck.length === 1) {
      const newContact = {...listCheck[0], number: newNumber}
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(listCheck[0].id, newContact)
        .then(updatedPerson => {
          let updatedList = persons.filter(p => p.id !== updatedPerson.id)
          updatedList = [...updatedList, updatedPerson]
          setPersons(updatedList)
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${newName}`)
        })
        .catch(error => {
          setMessage(`Information of ${newName} has already been removed from server`)
          setPersons(persons.filter(p => p.id !== listCheck[0].id))
        })
      }
    }
    else {

      personService.saveAdded(data).then(response => {
        setMessage(`Added ${data.name}`)
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setSearchResult(searchResult.concat(data))
      })

    }
  }

  const toggleDelete = id => {
    const del = searchResult.filter(person => id === person.id)
    const remain = searchResult.filter(person => id !== person.id)
    if (window.confirm(`Delete ${del[0].name}?`)) {
        personService.deletePerson(id).then(response => setPersons(remain))
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
      <Notification message={message}/>
      <Filter searchHandler={handleSearchChange}/>
      <h3>add a new</h3>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        newNumber={newNumber}/>
      <h3>Numbers</h3>
      <Persons searchResult={searchResult}
               toggleDelete={toggleDelete}/>
    </div>
  )
}

export default App