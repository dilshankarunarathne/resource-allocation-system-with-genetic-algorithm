import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    fetch('/api/schedule')
      .then(response => response.json())
      .then(data => setSchedule(data));
  }, []);

  if (!schedule) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Generated Schedule</h1>
      <table>
        <thead>
          <tr>
            <th>Class #</th>
            <th>Grade</th>
            <th>Dept</th>
            <th>Course</th>
            <th>Is Lab</th>
            <th>Room</th>
            <th>Instructor</th>
            <th>Meeting Time</th>
            <th>Day</th>
          </tr>
        </thead>
        <tbody>
          {schedule.classes.map((cls, index) => (
            <tr key={index}>
              <td>{cls.id}</td>
              <td>{cls.course.grade}</td>
              <td>{cls.dept}</td>
              <td>{cls.course.name} ({cls.course.number}, {cls.course.maxNumbOfStudents})</td>
              <td>{cls.course.isLab.toString()}</td>
              <td>{cls.room.number} ({cls.room.seatingCapacity})</td>
              <td>{cls.instructor}</td>
              <td>{cls.meetingTime}</td>
              <td>{cls.day}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
