import { useReducer } from "react"
import "./App.css"

function App() {
  const myHabits = {
    habits: [
      {
        id: 1,
        name: "Read",
        completed: false,
      },
    ],
  }

  function handleHabits(state, action) {
    switch (action.type) {
      case "DELETE_HABIT":
        return {
          ...state,
          habits: state.habits.filter(
            (habit) => habit.id !== action.payload.id
          ),
        }
      case "COMPLETED":
        return {
          ...state,
          habits: state.habits.map((habit) => {
            if (habit.id === action.payload.id) {
              return { ...habit, completed: !habit.completed }
            }
            return habit
          }),
        }
      case "ADD_HABIT":
        if (action.payload.name === "") return state
        return {
          ...state,
          habits: [...state.habits, action.payload],
        }
      default:
        return state
    }
  }
  const [currentHabits, dispatch] = useReducer(handleHabits, myHabits)
  currentHabits.habits = currentHabits.habits.sort((a, b) => b.id - a.id)

  return (
    <div className='cardHabits'>
      <h1>Habits</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          dispatch({
            type: "ADD_HABIT",
            payload: {
              id: currentHabits.habits[0] ? currentHabits.habits[0].id + 1 : 1,
              name: e.target.elements.habit.value,
              completed: false,
            },
          })

          e.target.reset()
        }}
      >
        <input type='text' name='habit' placeholder='Write a new habit' />
        <button type='submit'>New Habit</button>
      </form>
      <ul>
        {currentHabits.habits.map((habit) => (
          <li key={habit.id}>
            <div>
              <input
                type='checkbox'
                checked={habit.completed}
                onChange={() => {
                  dispatch({ type: "COMPLETED", payload: habit })
                }}
              />
              <span className={habit.completed ? "completed" : ""}>
                {habit.name.toUpperCase()}
              </span>
            </div>
            <button
              onClick={() => dispatch({ type: "DELETE_HABIT", payload: habit })}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
