import React from 'react';
import Course from "./components/Course";

const Program = ({courses}) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course id = {0} courses = {courses}/>
      <Course id = {1} courses = {courses}/>
    </div>
  )
}

const App = ({courses}) => {

  return (
    <div>
      <Program courses = {courses} />
    </div>
  )
}

export default App