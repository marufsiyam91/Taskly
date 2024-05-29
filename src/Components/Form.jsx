import { useEffect } from "react"
import { useState } from "react"


const Form = () => {

    const [taskInfo, setTaskInfo] = useState({
        title: '',
        description: '',
        category: '',
        dueDate: '',
        completed: false,
        priority: 'low',
    })


    const handleChange = (e) => {
        const {name, value} = e.target

        setTaskInfo(prevValue => ({...prevValue, [name]: value}))
    }


    useEffect(() => {
        console.log(taskInfo)
    }, [taskInfo])



  return (
    <div className="w-[70%] mx-auto py-10">
        <form className="flex flex-col gap-3 items-start w-[50%] ">
            <input className="border py-2 px-3 rounded-md w-full" type="text" name="title" value={taskInfo.title} onChange={handleChange} placeholder="Add a title" required/>
            <textarea className="border rounded-md w-full text-black py-2 px-3" rows={10} name="description" value={taskInfo.description} onChange={handleChange} placeholder="Description" required></textarea>
            <select className="border p-2 rounded-md w-full" name="category" value={taskInfo.category} onChange={handleChange} required>
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
                    <label className="flex items-center gap-2">
                        Low
                        <input type="radio" name="priority" value="Low" checked={taskInfo.priority === 'Low'}  onChange={handleChange}/>
                    </label>
                    <label className="flex items-center gap-2">
                        Medium
                        <input type="radio" name="priority" value="Medium" checked={taskInfo.priority === 'Medium'}  onChange={handleChange}/>
                    </label>
                    <label className="flex items-center gap-2">
                        High
                        <input type="radio" name="priority" value="High" checked={taskInfo.priority === 'High'}  onChange={handleChange}/>
                    </label>
                </div>
        </form>
    </div>
  )
}

export default Form