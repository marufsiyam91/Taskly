import { useContext, useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { TaskContext } from '../Contexts/TaskContext';
import { IoIosRemoveCircle } from 'react-icons/io';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { FiEdit } from "react-icons/fi";
import { MdSaveAs } from "react-icons/md";



const TaskModal = ({ selectedTask, closeModal }) => {
    const { dispatch } = useContext(TaskContext);

    const [isEditing, setIsEditing] = useState(false)
    const [collectedValue, setCollectedValue] = useState({
        title: selectedTask.title,
        description: selectedTask.description,
        category: selectedTask.category,
        dueDate: selectedTask.dueDate,
        completed: false,
        priority: selectedTask.priority,
        id: selectedTask.id
    })

    const handleChange = (e) => {
        const {name, value} = e.target;

        setCollectedValue(prevValue => ({...prevValue, [name]: value}))
    }

    const handleClickSubmit = (e) => {
        e.preventDefault()

        setIsEditing(prevValue => !prevValue)

        isEditing && dispatch({type: 'updateTask', payload:collectedValue})
    }

    useEffect(() => {
        console.log(collectedValue)
    }, [collectedValue])

    const handleTask = () => {
        dispatch({ type: selectedTask.completed ? 'deleteTask' : 'completeTask', payload: selectedTask.id });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className={selectedTask.completed ? 'relative bg-green-100 px-3 sm:px-6 pb-3 pt-6 sm:pt-8 sm:pb-4 rounded-lg w-full sm:w-[550px] m-4' : 'relative bg-blue-200 px-3 sm:px-6 pb-3 pt-6 sm:pt-8 sm:pb-4 rounded-lg w-[550px] m-4'}>
                <div className={`absolute w-8 h-8 rounded-br-full top-0 left-0 ${selectedTask.priority === 'Low' && 'bg-green-300' || selectedTask.priority === 'Medium' && 'bg-blue-400' || selectedTask.priority === 'High' && 'bg-red-500'}`} ></div>
                <button onClick={closeModal} className="absolute -top-12 right-[50%] translate-x-[50%] text-4xl text-white">
                    <AiOutlineCloseCircle />
                </button>


                {
                    !isEditing 
                    ?
                    (
                       <>
                             <h2 className="text-3xl font-bold mb-2 font-outfit text-black">{selectedTask.title}</h2>
                            <p className="font-primary text-black text-2xl">Category: {selectedTask.category}</p>
                            <p className="text-black text-2xl font-primary">Due date: <span className="text-red-500 text-2xl font-outfit">{selectedTask.dueDate}</span></p>
                            <div className=" font-primary text-slate-800 text-2xl bg-white mt-2 p-2 rounded-md">
                                <u>Description:</u>
                                <p className="text-xl font-semobold font-outfit">{selectedTask.description}</p>
                            </div>
                       </>
                    )
                    :
                    (
                        <form className='flex flex-col gap-3 mt-6'>
                            <input className='p-3 rounded-md' onChange={handleChange} type="text" name='title' value={collectedValue.title}/>
                            <select
                            className="p-3 rounded-md"
                            value={collectedValue.category}
                            name='category'
                            onChange={handleChange}
                            >
                                <option value="">All Categories</option>
                                <option value="Work">Work</option>
                                <option value="Personal">Personal</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Fitness">Fitness</option>
                                <option value="Education">Education</option>
                                <option value="Finance">Finance</option>
                                <option value="Hobbies">Hobbies</option>
                            </select>
                            <input className="font-primary border p-3 rounded-md" onChange={handleChange} type="date" name="dueDate" value={collectedValue.dueDate}/>
                            <textarea className='p-3 rounded-md overflow-scroll hideScroll' onChange={handleChange} rows={6} name="description" value={collectedValue.description}></textarea>
                            <div>
                                <label>Priority:</label>
                                <label className="flex items-center gap-2 font-primary">
                                    Low
                                    <input type="radio" name="priority" value="Low" checked={collectedValue.priority === 'Low'}  onChange={handleChange}/>
                                </label>
                                <label className="flex items-center gap-2 font-primary">
                                    Medium
                                    <input type="radio" name="priority" value="Medium" checked={collectedValue.priority === 'Medium'}  onChange={handleChange}/>
                                </label>
                                <label className="flex items-center gap-2 font-primary">
                                    High
                                    <input type="radio" name="priority" value="High" checked={collectedValue.priority === 'High'}  onChange={handleChange}/>
                                </label>
                            </div>
                        </form>
                    )
                }


                <button onClick={handleTask} className={!selectedTask.completed ? 'text-green-500 text-2xl absolute top-2 right-3 cursor-pointer' : 'text-red-500 text-2xl absolute top-2 right-3 cursor-pointer'}>
                    {selectedTask.completed ? <IoIosRemoveCircle /> : <IoCheckmarkCircle />}
                </button>

                <button onClick={handleClickSubmit} className='absolute top-2 right-12 text-xl'>
                    {isEditing ?  <MdSaveAs /> : <FiEdit />}
                </button>
            </div>
        </div>
    );
}

export default TaskModal;