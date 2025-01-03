import React, { useState } from 'react';
import './App.css';

function App() {
  const [schedule, setSchedule] = useState(null);
  const [lecturers, setLecturers] = useState([{ name: '', courses: '' }]);
  const [halls, setHalls] = useState([{ name: '', capacity: '' }]);
  const [batches, setBatches] = useState([{ name: '', size: '', courses: '' }]);

  const handleLecturerChange = (index, event) => {
    const newLecturers = [...lecturers];
    newLecturers[index][event.target.name] = event.target.value;
    setLecturers(newLecturers);
  };

  const handleHallChange = (index, event) => {
    const newHalls = [...halls];
    newHalls[index][event.target.name] = event.target.value;
    setHalls(newHalls);
  };

  const handleBatchChange = (index, event) => {
    const newBatches = [...batches];
    newBatches[index][event.target.name] = event.target.value;
    setBatches(newBatches);
  };

  const addLecturer = () => setLecturers([...lecturers, { name: '', courses: '' }]);
  const addHall = () => setHalls([...halls, { name: '', capacity: '' }]);
  const addBatch = () => setBatches([...batches, { name: '', size: '', courses: '' }]);

  const submitDetails = () => {
    fetch('http://localhost:3000/scheduler/lecturers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lecturers: lecturers.map(l => ({ ...l, courses: l.courses.split(',') })) }),
    });

    fetch('http://localhost:3000/scheduler/halls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ halls: halls.map(h => ({ ...h, capacity: parseInt(h.capacity) })) }),
    });

    fetch('http://localhost:3000/scheduler/batches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ batches: batches.map(b => ({ ...b, size: parseInt(b.size), courses: b.courses.split(',') })) }),
    });

    fetch('http://localhost:3000/scheduler/generate-timetable')
      .then(response => response.json())
      .then(data => setSchedule(data));
  };

  if (!schedule) {
    return (
      <div className="App">
        <h1>Enter Details</h1>
        <h2>Lecturers</h2>
        {lecturers.map((lecturer, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={lecturer.name}
              onChange={event => handleLecturerChange(index, event)}
            />
            <input
              type="text"
              name="courses"
              placeholder="Courses (comma separated)"
              value={lecturer.courses}
              onChange={event => handleLecturerChange(index, event)}
            />
          </div>
        ))}
        <button onClick={addLecturer}>Add Lecturer</button>

        <h2>Halls</h2>
        {halls.map((hall, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={hall.name}
              onChange={event => handleHallChange(index, event)}
            />
            <input
              type="text"
              name="capacity"
              placeholder="Capacity"
              value={hall.capacity}
              onChange={event => handleHallChange(index, event)}
            />
          </div>
        ))}
        <button onClick={addHall}>Add Hall</button>

        <h2>Batches</h2>
        {batches.map((batch, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={batch.name}
              onChange={event => handleBatchChange(index, event)}
            />
            <input
              type="text"
              name="size"
              placeholder="Size"
              value={batch.size}
              onChange={event => handleBatchChange(index, event)}
            />
            <input
              type="text"
              name="courses"
              placeholder="Courses (comma separated)"
              value={batch.courses}
              onChange={event => handleBatchChange(index, event)}
            />
          </div>
        ))}
        <button onClick={addBatch}>Add Batch</button>

        <button onClick={submitDetails}>Submit Details</button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Generated Schedule</h1>
      {Object.keys(schedule).map(batch => (
        <div key={batch}>
          <h2>Batch: {batch}</h2>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Slot</th>
                <th>Course</th>
                <th>Hall</th>
                <th>Lecturer</th>
              </tr>
            </thead>
            <tbody>
              {schedule[batch].map((day, dayIndex) => (
                day.map((slot, slotIndex) => (
                  <tr key={`${dayIndex}-${slotIndex}`}>
                    <td>{dayIndex + 1}</td>
                    <td>{slotIndex + 1}</td>
                    <td>{slot.course}</td>
                    <td>{slot.hall.name}</td>
                    <td>{slot.lecturer.name}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default App;
