import { useContext, useEffect, useState } from "react"
import { TaskContext } from "../Contexts/TaskContext"


const Form = () => {
    const {state: {tasks}, dispatch} = useContext(TaskContext)

    useEffect(() => {
        console.log(tasks)
    }, [tasks])

    const [taskInfo, setTaskInfo] = useState({
        title: '',
        description: '',
        category: '',
        dueDate: '',
        completed: false,
        priority: 'Medium',
    })


    const handleChange = (e) => {
        const {name, value} = e.target
        setTaskInfo(prevValue => ({...prevValue, [name]: value}))
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        if(taskInfo.title && taskInfo.category && taskInfo.description && taskInfo.dueDate) {
            dispatch({type: 'addTask', payload:taskInfo})

            setTaskInfo({
                title: '',
                description: '',
                category: '',
                dueDate: '',
                completed: false,
                priority: 'Low',
            });
        }
        else{
            alert('you have to provide all the data')
        }

    }





  return (
    <div className="w-4/5 py-10 px-8">
        <form className="flex flex-col gap-3 items-start w-[50%] ">
            <input className="border py-2 px-3 rounded-md w-full font-primary" type="text" name="title" value={taskInfo.title} onChange={handleChange} placeholder="Add a title" required/>
            <textarea className="border rounded-md w-full text-black py-2 px-3 font-primary" rows={10} name="description" value={taskInfo.description} onChange={handleChange} placeholder="Description" required></textarea>
            <select className="border p-2 rounded-md w-full font-primary" name="category" value={taskInfo.category} onChange={handleChange} required>
                    <option value="">Select a category</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Education">Education</option>
                    <option value="Finance">Finance</option>
                    <option value="Hobbies">Hobbies</option>
            </select>
            <input className="font-primary border p-2 rounded-md" type="date" name="dueDate" value={taskInfo.dueDate} onChange={handleChange}/>

            <div className="flex flex-col gap-1">
                    <label className="font-primary mb-1 font-bold">Priority:</label>
                    <label className="flex items-center gap-2 font-primary">
                        Low
                        <input type="radio" name="priority" value="Low" checked={taskInfo.priority === 'Low'}  onChange={handleChange}/>
                    </label>
                    <label className="flex items-center gap-2 font-primary">
                        Medium
                        <input type="radio" name="priority" value="Medium" checked={taskInfo.priority === 'Medium'}  onChange={handleChange}/>
                    </label>
                    <label className="flex items-center gap-2 font-primary">
                        High
                        <input type="radio" name="priority" value="High" checked={taskInfo.priority === 'High'}  onChange={handleChange}/>
                    </label>
                </div>

                <button onClick={handleSubmit} type="submit" className="font-primary border py-1 px-4 rounded-md border-slate-800 text-xl font-semibold">Add Task</button>
        </form>
    </div>
  )
}

export default Form