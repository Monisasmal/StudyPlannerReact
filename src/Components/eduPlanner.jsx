import React, { useState, useEffect } from "react";
import './eduPlanner.css';

function App() {
  const [subject, setSubject] = useState(""); // To store the input subject name
  const [hours, setHours] = useState(0); // To store the input hours
  const [schedule, setSchedule] = useState([]); // To store the list of subjects with hours

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedSchedule = localStorage.getItem("schedule");
    if (storedSchedule) {
      setSchedule(JSON.parse(storedSchedule)); // Parse and load saved schedule from localStorage
    }
  }, []);

  // Save schedule to localStorage whenever it changes
  useEffect(() => {
    if (schedule.length > 0) {
      localStorage.setItem("schedule", JSON.stringify(schedule)); // Save the schedule in localStorage
    }
  }, [schedule]);

  // Function to add subject and hours to the schedule
  const addSubject = () => {
    if (!subject.trim()) {
      alert("Please enter a subject name!");
      return;
    }

    if (hours <= 0) {
      alert("Please enter a valid number for hours!");
      return;
    }

    setSchedule([...schedule, { name: subject, hours: Number(hours) }]);
    setSubject(""); // Clear subject input
    setHours(0); // Reset hours input
  };

  // Function to increase the study hours of a subject
  const increaseHours = (index) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index].hours += 1;
    setSchedule(updatedSchedule);
  };

  // Function to decrease the study hours of a subject
  const decreaseHours = (index) => {
    const updatedSchedule = [...schedule];
    if (updatedSchedule[index].hours > 0) {
      updatedSchedule[index].hours -= 1;
      setSchedule(updatedSchedule);
    } else {
      alert("Hours cannot be less than 0.");
    }
  };

  return (
    <>
    <div className="App">
      <h1>📙 Education Planner ✍</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Enter subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        
        <input
          type="number"
          placeholder="Enter hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          min="1"
        />
        <button onClick={addSubject}>ADD</button>
      </div>
      
    </div>


{/* for showing localStorage Data */}
    <div className="schedule">
        {schedule.map((item, index) => (
          <div key={index} className="schedule-item">
          {item.name} - {item.hours} hours
            <button onClick={() => increaseHours(index)}>+</button>
            <button onClick={() => decreaseHours(index)}>-</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
