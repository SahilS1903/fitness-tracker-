import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { Line } from 'react-chartjs-2'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faDumbbell, 
  faChartLine, 
  faCalendarAlt, 
  faPlus,
  faHeartbeat,
  faWeight,
  faRedoAlt
} from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
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
      toast.success('Workout added successfully!')
      setWorkoutData({ muscleGroup: '', exercise: '', sets: '', repsPerSet: [], weightPerSet: [] })
      setFilteredExercises([])
      fetchPastWorkouts()
    } catch (error) {
      console.error('Error adding workout:', error.response?.data || error.message)
      toast.error('Failed to add workout. Please try again.')
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
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4
        },
        {
          label: 'Average Reps per Set',
          data: repData,
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4
        },
        {
          label: 'Average Weight per Set (kg)',
          data: weightData,
          borderColor: '#f97316',
          backgroundColor: 'rgba(249, 115, 22, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4
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
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: `Workout Progress for ${analyticsExercise}`,
        font: {
          size: 18,
          weight: 'bold'
        },
        color: '#374151'
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.2)'
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(156, 163, 175, 0.2)'
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12
          }
        }
      }
    },
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: 6,
        hoverRadius: 8,
        borderWidth: 2,
        backgroundColor: '#fff'
      }
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const slideIn = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  const slideInFromBottom = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const inputClasses = "mt-1 block w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out hover:border-gray-300 hover:bg-white";
  
  const selectClasses = "mt-1 block w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out hover:border-gray-300 hover:bg-white appearance-none cursor-pointer";

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8 py-8"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          variants={slideIn} 
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="relative">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent mb-4">
              Workout Analytics
            </h1>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-orange-400/20 rounded-full blur-3xl -z-10"></div>
          </div>
          <p className="text-gray-600 text-xl font-medium">Track your fitness journey and analyze your progress</p>
          
          {/* Quick Stats Cards */}
          {pastWorkouts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 max-w-2xl mx-auto">
              <motion.div 
                className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-6 rounded-2xl border border-blue-300/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold text-blue-700 mb-1">{pastWorkouts.length}</div>
                <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Total Workouts</div>
                <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{width: '90%'}}></div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-green-50 via-green-100 to-green-200 p-6 rounded-2xl border border-green-300/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold text-green-700 mb-1">
                  {pastWorkouts.reduce((sum, workout) => sum + workout.sets, 0)}
                </div>
                <div className="text-sm font-semibold text-green-600 uppercase tracking-wide">Total Sets</div>
                <div className="mt-2 w-full bg-green-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 p-6 rounded-2xl border border-orange-300/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold text-orange-700 mb-1">{allExercises.length}</div>
                <div className="text-sm font-semibold text-orange-600 uppercase tracking-wide">Unique Exercises</div>
                <div className="mt-2 w-full bg-orange-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{width: '60%'}}></div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
        
        {/* Workout Input Form */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 mb-8"
          variants={slideIn} 
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faPlus} className="text-blue-600 text-lg" />
            </div>
            Add New Workout
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div variants={slideInFromBottom} transition={{ delay: 0.5, duration: 0.5 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FontAwesomeIcon icon={faHeartbeat} className="mr-2 text-blue-500" />
                  Muscle Group
                </label>
                <select
                  name="muscleGroup"
                  value={workoutData.muscleGroup}
                  onChange={handleMuscleGroupChange}
                  className={selectClasses}
                  required
                >
                  <option value="">Select Muscle Group</option>
                  {Object.keys(exerciseData).map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div variants={slideInFromBottom} transition={{ delay: 0.6, duration: 0.5 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FontAwesomeIcon icon={faDumbbell} className="mr-2 text-orange-500" />
                  Exercise
                </label>
                <select
                  name="exercise"
                  value={workoutData.exercise}
                  onChange={handleExerciseChange}
                  className={`${selectClasses} ${!workoutData.muscleGroup ? 'bg-gray-100 cursor-not-allowed' : ''}`}
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
              </motion.div>

              <motion.div variants={slideInFromBottom} transition={{ delay: 0.7, duration: 0.5 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FontAwesomeIcon icon={faRedoAlt} className="mr-2 text-green-500" />
                  Number of Sets
                </label>
                <input
                  type="number"
                  name="sets"
                  value={workoutData.sets}
                  onChange={handleInputChange}
                  placeholder="Enter number of sets"
                  className={inputClasses}
                  required
                  min="1"
                  max="20"
                />
              </motion.div>
            </div>

            {workoutData.sets && parseInt(workoutData.sets) > 0 && (
              <motion.div 
                className="mt-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FontAwesomeIcon icon={faWeight} className="mr-2 text-purple-500" />
                  Set Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Array.from({ length: parseInt(workoutData.sets) }, (_, index) => (
                    <motion.div 
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <h5 className="font-medium text-gray-700 mb-3 text-center">Set {index + 1}</h5>
                      <div className="space-y-3">
                        <input
                          type="number"
                          value={workoutData.repsPerSet[index] || ''}
                          onChange={(e) => handleRepsChange(index, e.target.value)}
                          placeholder="Reps"
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          min="1"
                        />
                        <input
                          type="number"
                          value={workoutData.weightPerSet[index] || ''}
                          onChange={(e) => handleWeightChange(index, e.target.value)}
                          placeholder="Weight (kg)"
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          min="0"
                          step="0.1"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div 
              className="flex justify-center"
              variants={fadeIn} 
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <motion.button
                type="submit"
                className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-orange-500 text-white font-bold py-4 px-10 rounded-2xl shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-white/20 focus:outline-none focus:ring-4 focus:ring-blue-300/50 transition-all duration-300 transform hover:scale-105 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #f97316 100%)',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-800 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span className="relative flex items-center text-white font-bold text-lg tracking-wide">
                  <FontAwesomeIcon icon={faPlus} className="mr-3 transition-transform group-hover:rotate-90" />
                  Add Workout
                  <FontAwesomeIcon icon={faDumbbell} className="ml-3 transition-transform group-hover:scale-110" />
                </span>
                
                <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        {/* Past Workouts */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 mb-8"
          variants={slideIn} 
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-green-600 text-lg" />
            </div>
            Past Workouts
          </h3>
          
          <motion.div 
            className="mb-6"
            variants={slideInFromBottom} 
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date to View Workouts
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className={`${inputClasses} max-w-xs`}
            />
          </motion.div>

          {selectedDate && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {pastWorkouts
                .filter(workout => new Date(workout.date).toDateString() === new Date(selectedDate).toDateString())
                .map((workout, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <FontAwesomeIcon icon={faDumbbell} className="text-blue-600" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-800">{workout.exercise}</h4>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Muscle Group:</span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {workout.muscleGroup}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Sets:</span>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-bold">
                            {workout.sets}
                          </span>
                        </div>
                        
                        <div className="mt-4">
                          <h5 className="text-sm font-semibold text-gray-700 mb-2">Reps per Set:</h5>
                          <div className="grid grid-cols-2 gap-2">
                            {workout.repsPerSet.map((reps, idx) => (
                              <div key={idx} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                                <span className="text-xs text-gray-600">Set {idx + 1}:</span>
                                <span className="text-sm font-bold text-gray-800">{reps} reps</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h5 className="text-sm font-semibold text-gray-700 mb-2">Weight per Set:</h5>
                          <div className="grid grid-cols-2 gap-2">
                            {workout.weightPerSet.map((weight, idx) => (
                              <div key={idx} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                                <span className="text-xs text-gray-600">Set {idx + 1}:</span>
                                <span className="text-sm font-bold text-gray-800">{weight} kg</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <span className="text-xs text-gray-500">
                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                            {new Date(workout.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          )}
          
          {selectedDate && pastWorkouts.filter(workout => new Date(workout.date).toDateString() === new Date(selectedDate).toDateString()).length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400 text-3xl" />
              </div>
              <h4 className="text-xl font-semibold text-gray-700 mb-2">No workouts found</h4>
              <p className="text-gray-500 text-lg mb-4">No workouts found for {new Date(selectedDate).toLocaleDateString()}.</p>
              <p className="text-gray-400 text-sm">Try selecting a different date or add a new workout above!</p>
            </motion.div>
          )}

          {!selectedDate && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-500 text-3xl" />
              </div>
              <h4 className="text-xl font-semibold text-gray-700 mb-2">Select a date to view workouts</h4>
              <p className="text-gray-500 text-lg">Choose a date above to see your workout history for that day.</p>
            </motion.div>
          )}
        </motion.div>

        {/* Analytics Section */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
          variants={slideIn} 
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faChartLine} className="text-purple-600 text-lg" />
            </div>
            Workout Analytics
          </h3>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mb-6"
            variants={slideInFromBottom} 
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Exercise for Analytics
              </label>
              <select
                value={analyticsExercise}
                onChange={(e) => setAnalyticsExercise(e.target.value)}
                className={selectClasses}
              >
                <option value="">Choose an exercise to analyze</option>
                {allExercises.map((exercise) => (
                  <option key={exercise} value={exercise}>
                    {exercise}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <motion.button 
                onClick={fetchAnalytics} 
                className={`relative overflow-hidden px-8 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 group ${
                  !analyticsExercise 
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-60' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 hover:shadow-xl transform hover:scale-105'
                }`}
                disabled={!analyticsExercise}
                whileHover={analyticsExercise ? { scale: 1.05 } : {}}
                whileTap={analyticsExercise ? { scale: 0.95 } : {}}
                style={analyticsExercise ? { 
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                } : {}}
              >
                {analyticsExercise && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
                
                <span className="relative flex items-center font-bold tracking-wide">
                  <FontAwesomeIcon icon={faChartLine} className="mr-2 transition-transform group-hover:scale-110" />
                  Show Analytics
                </span>
                
                {analyticsExercise && (
                  <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                )}
              </motion.button>
            </div>
          </motion.div>
          
          {analyticsData && (
            <motion.div 
              className="mt-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                Progress Chart for {analyticsExercise}
              </h4>
              <div className="w-full h-96 md:h-[500px]">
                <Line 
                  data={prepareChartData()} 
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      legend: {
                        position: 'top',
                        labels: {
                          usePointStyle: true,
                          padding: 20,
                          font: {
                            size: 12,
                            weight: 'bold'
                          }
                        }
                      }
                    },
                    elements: {
                      line: {
                        tension: 0.4
                      },
                      point: {
                        radius: 6,
                        hoverRadius: 8
                      }
                    }
                  }} 
                />
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-600 text-xl" />
                    <div className="text-3xl font-bold text-blue-600">{analyticsData.length}</div>
                  </div>
                  <div className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Total Sessions</div>
                  <div className="mt-3 w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <FontAwesomeIcon icon={faRedoAlt} className="text-green-600 text-xl" />
                    <div className="text-3xl font-bold text-green-600">
                      {analyticsData.reduce((sum, item) => sum + item.sets, 0)}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-green-700 uppercase tracking-wide">Total Sets</div>
                  <div className="mt-3 w-full bg-green-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <FontAwesomeIcon icon={faDumbbell} className="text-orange-600 text-xl" />
                    <div className="text-3xl font-bold text-orange-600">
                      {analyticsData.reduce((sum, item) => 
                        sum + item.repsPerSet.reduce((repSum, reps) => repSum + reps, 0), 0
                      )}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-orange-700 uppercase tracking-wide">Total Reps</div>
                  <div className="mt-3 w-full bg-orange-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{width: '70%'}}></div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
          
          {!analyticsData && analyticsExercise && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FontAwesomeIcon icon={faChartLine} className="text-purple-500 text-3xl" />
              </div>
              <h4 className="text-xl font-semibold text-gray-700 mb-2">Ready to analyze</h4>
              <p className="text-gray-500 text-lg mb-4">Click "Show Analytics" to view your progress data for {analyticsExercise}</p>
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </motion.div>
          )}

          {!analyticsData && !analyticsExercise && allExercises.length > 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FontAwesomeIcon icon={faChartLine} className="text-gray-400 text-3xl" />
              </div>
              <h4 className="text-xl font-semibold text-gray-700 mb-2">Choose an exercise to analyze</h4>
              <p className="text-gray-500 text-lg">Select an exercise from the dropdown above to view detailed analytics and progress charts.</p>
            </motion.div>
          )}

          {allExercises.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FontAwesomeIcon icon={faDumbbell} className="text-yellow-500 text-3xl" />
              </div>
              <h4 className="text-xl font-semibold text-gray-700 mb-2">No workout data yet</h4>
              <p className="text-gray-500 text-lg mb-4">Add some workouts using the form above to start seeing analytics!</p>
              <p className="text-gray-400 text-sm">Your progress charts will appear here once you have workout data.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default WorkoutDetails