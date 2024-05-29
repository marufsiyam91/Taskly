import { createContext, useReducer } from "react";



export const TaskContext = createContext(null)

const initialValue = {
    tasks: []
}


const reducer = (state, action) => {
    switch (action.type) {
        case 'addTask' :
            return {
                ...state,
                tasks: [...state.tasks, {...action.payload, id:Date.now()}]
            }
        default :
        return state
    }
}


const TaskContextProvider = ({children}) =>  {

    const [state, dispatch] = useReducer(reducer, initialValue)

    return (
        <TaskContext.Provider value={{state, dispatch}}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContextProvider