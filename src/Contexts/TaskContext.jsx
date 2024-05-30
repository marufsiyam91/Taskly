import { createContext, useEffect, useReducer } from "react";

export const TaskContext = createContext(null);

const initialValue = {
    tasks: JSON.parse(localStorage.getItem("tasks")) || []
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'addTask':
            return {
                ...state,
                tasks: [...state.tasks, { ...action.payload, id: Date.now() }]
            };
        case 'completeTask':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload ? { ...task, completed: true } : task
                )
            };
        case 'deleteTask':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };
        case 'updateTask':
            return {
                ...state,
                tasks: state.tasks.map(task => 
                    task.id === action.payload.id ? {task:action.payload} : task
                )
            }
        case 'loadTasks':
            return {
                ...state,
                tasks: action.payload
            };
        default:
            return state;
    }
};

const TaskContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialValue);


    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            dispatch({ type: 'loadTasks', payload: JSON.parse(savedTasks) });
            console.log("Tasks loaded from localStorage:", JSON.parse(savedTasks));
        }
    }, []);


    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
        console.log("Tasks saved to localStorage:", state.tasks);
    }, [state.tasks]);



    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContextProvider;
