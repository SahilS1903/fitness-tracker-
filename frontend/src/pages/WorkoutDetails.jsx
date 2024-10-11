import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js'
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
)


const exerciseData = {
  Chest: ['Bench Press', 'Push-ups', 'Chest Flyes'],
  Back: ['Pull-ups', 'Rows', 'Deadlifts'],
  Legs: ['Squats', 'Lunges', 'Leg Press'],
  Shoulders: ['Shoulder Press', 'Lateral Raises', 'Front Raises'],
  Arms: ['Bicep Curls', 'Tricep Extensions', 'Hammer Curls'],
  Core: ['Planks', 'Crunches', 'Russian Twists']
};


const WorkoutDetails = () => {
  const { user } = useAuth()
  const [workoutData, setWorkoutData] = useState({
    muscleGroup: '',
    exercise: '',
    sets: '',
    repsPerSet: [],
    weightPerSet: [],
  });
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [pastWorkouts, setPastWorkouts] = useState([])
  const [analyticsExercise, setAnalyticsExercise] = useState('')
  const [allExercises, setAllExercises] = useState([])
  const [analyticsData, setAnalyticsData] = useState(null)
  const [selectedDate, setSelectedDate] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'sets') {
      const newSets = parseInt(value) || 0;
      setWorkoutData(prev => ({
        ...prev,
        [name]: value,
        repsPerSet: Array(newSets).fill(''),
        weightPerSet: Array(newSets).fill('')
      }));
    } else {
      setWorkoutData(prev => ({ ...prev, [name]: value }));
    }
  }

  const handleRepsChange = (index, value) => {
    const newRepsPerSet = [...workoutData.repsPerSet];
    newRepsPerSet[index] = value;
    setWorkoutData(prev => ({ ...prev, repsPerSet: newRepsPerSet }));
  }

  const handleWeightChange = (index, value) => {
    const newWeightPerSet = [...workoutData.weightPerSet];
    newWeightPerSet[index] = value;
    setWorkoutData(prev => ({ ...prev, weightPerSet: newWeightPerSet }));
  }

  const handleMuscleGroupChange = (e) => {
    const selectedMuscleGroup = e.target.value;
    setWorkoutData({
      ...workoutData,
      muscleGroup: selectedMuscleGroup,
      exercise: '', // Reset exercise when muscle group changes
    });
    setFilteredExercises(exerciseData[selectedMuscleGroup] || []);
  };

  const handleExerciseChange = (e) => {
    setWorkoutData({
      ...workoutData,
      exercise: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/workouts', {
        ...workoutData,
        repsPerSet: workoutData.repsPerSet.map(rep => parseInt(rep || 0)),
        weightPerSet: workoutData.weightPerSet.map(weight => parseFloat(weight || 0))
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwttoken')}` }
      })
      // console.log('Workout added:', response.data)
      setWorkoutData({ muscleGroup: '', exercise: '', sets: '', repsPerSet: [], weightPerSet: [] })
      fetchPastWorkouts()
    } catch (error) {
      console.error('Error adding workout:', error.response?.data || error.message)
    }
  }

  const fetchPastWorkouts = async () => {
    try {
      const response = await axios.get('/api/workouts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwttoken')}` }
      });
      setPastWorkouts(response.data);
    } catch (error) {
      console.error('Error fetching past workouts:', error);
    }
  };

  const fetchAnalytics = async () => {
    if (!analyticsExercise) return;
    try {
      const response = await axios.get(`/api/workouts/analytics?exercise=${analyticsExercise}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwttoken')}` }
      });
      setAnalyticsData(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const prepareChartData = () => {
    if (!analyticsData) return null;

    const dates = analyticsData.map(item => item.date);
    const setData = analyticsData.map(item => item.sets);
    const repData = analyticsData.map(item => {
      const totalReps = item.repsPerSet.reduce((sum, reps) => sum + reps, 0);
      return totalReps / item.sets; // Average reps per set
    });
    const weightData = analyticsData.map(item => {
      const totalWeight = item.weightPerSet.reduce((sum, weight) => sum + weight, 0);
      return totalWeight / item.sets; // Average weight per set
    });

    return {
      labels: dates,
      datasets: [
        {
          label: 'Sets',
          data: setData,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: 'Average Reps per Set',
          data: repData,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        },
        {
          label: 'Average Weight per Set',
          data: weightData,
          borderColor: 'rgb(54, 162, 235)',
          tension: 0.1
        }
      ]
    };
  };

  const getUniqueExercises = (workouts) => {
    const exercises = workouts.map(workout => workout.exercise)
    return [...new Set(exercises)].sort()
  }

  useEffect(() => {
    fetchPastWorkouts()
  }, [])

  useEffect(() => {
    setAllExercises(getUniqueExercises(pastWorkouts))
  }, [pastWorkouts])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Workout Progress for ${analyticsExercise}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Workout Details</h1>
      
      {/* Workout Input Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <select
            name="muscleGroup"
            value={workoutData.muscleGroup}
            onChange={handleMuscleGroupChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Muscle Group</option>
            {Object.keys(exerciseData).map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          <select
            name="exercise"
            value={workoutData.exercise}
            onChange={handleExerciseChange}
            className="border p-2 rounded"
            required
            disabled={!workoutData.muscleGroup}
          >
            <option value="">Select Exercise</option>
            {filteredExercises.map((exercise) => (
              <option key={exercise} value={exercise}>
                {exercise}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="sets"
            value={workoutData.sets}
            onChange={handleInputChange}
            placeholder="Number of Sets"
            className="border p-2 rounded"
            required
            min="1"
          />
        </div>
        {workoutData.sets && parseInt(workoutData.sets) > 0 && (
          <div className="mt-4 grid grid-cols-4 gap-4">
            {Array.from({ length: parseInt(workoutData.sets) }, (_, index) => (
              <React.Fragment key={index}>
                <input
                  type="number"
                  value={workoutData.repsPerSet[index] || ''}
                  onChange={(e) => handleRepsChange(index, e.target.value)}
                  placeholder={`Reps for Set ${index + 1}`}
                  className="border p-2 rounded"
                  required
                  min="1"
                />
                <input
                  type="number"
                  value={workoutData.weightPerSet[index] || ''}
                  onChange={(e) => handleWeightChange(index, e.target.value)}
                  placeholder={`Weight for Set ${index + 1}`}
                  className="border p-2 rounded"
                  required
                  min="0"
                  step="0.1"
                />
              </React.Fragment>
            ))}
          </div>
        )}
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
          Add Workout
        </button>
      </form>

      {/* Past Workouts */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Past Workouts</h2>
        <div className="mb-4">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border p-2 rounded"
          />
        </div>
        {selectedDate && (
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {pastWorkouts
              .filter(workout => new Date(workout.date).toDateString() === new Date(selectedDate).toDateString())
              .map((workout, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{workout.exercise}</h3>
                    <p><strong>Muscle Group:</strong> {workout.muscleGroup}</p>
                    <p><strong>Sets:</strong> {workout.sets}</p>
                    <p><strong>Reps per Set:</strong></p>
                    <ul className="list-disc pl-5">
                      {workout.repsPerSet.map((reps, idx) => (
                        <li key={idx}>Set {idx + 1}: {reps} reps</li>
                      ))}
                    </ul>
                    <p><strong>Weight per Set:</strong></p>
                    <ul className="list-disc pl-5">
                      {workout.weightPerSet.map((weight, idx) => (
                        <li key={idx}>Set {idx + 1}: {weight} kg</li>
                      ))}
                    </ul>
                    <p><strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
          </div>
        )}
        {selectedDate && pastWorkouts.filter(workout => new Date(workout.date).toDateString() === new Date(selectedDate).toDateString()).length === 0 && (
          <p>No workouts found for the selected date.</p>
        )}
      </div>

      {/* Analytics Section */}
      <div>
        <h2 className="text-xl font-bold mb-2">Workout Analytics</h2>
        <div className="flex gap-4 mb-4">
          <select
            value={analyticsExercise}
            onChange={(e) => setAnalyticsExercise(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select an exercise</option>
            {allExercises.map((exercise) => (
              <option key={exercise} value={exercise}>
                {exercise}
              </option>
            ))}
          </select>
          <button 
            onClick={fetchAnalytics} 
            className="bg-green-500 text-white p-2 rounded"
            disabled={!analyticsExercise}
          >
            Show Analytics
          </button>
        </div>
        {analyticsData && (
          <div className="mt-4 w-full xl:w-3/4  md:min-h-96 h-56">
            <Line data={prepareChartData()} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  )
}

export default WorkoutDetails