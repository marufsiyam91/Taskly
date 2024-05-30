import { useContext, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { TaskContext } from '../Contexts/TaskContext';
import { IoIosRemoveCircle } from 'react-icons/io';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { FiEdit } from "react-icons/fi";
import { MdSaveAs } from "react-icons/md";



const TaskModal = ({ selectedTask, closeModal }) => {
    const { dispatch } = useContext(TaskContext);

    const [isEditing, setIsEditing] = useState(false)

    const handleTask = () => {
        dispatch({ type: selectedTask.completed ? 'deleteTask' : 'completeTask', payload: selectedTask.id });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className={selectedTask.completed ? 'relative bg-green-100 px-3 sm:px-6 py-4 pt-6 sm:py-8 rounded-lg w-full sm:max-w-[550px] m-4' : 'relative bg-slate-300 px-3 sm:px-6 py-4 pt-6 sm:py-8 rounded-lg max-w-[550px] m-4'}>
                <button onClick={closeModal} className="absolute -top-12 right-[50%] translate-x-[50%] text-4xl text-white">
                    <AiOutlineCloseCircle />
                </button>
                <h2 className="text-3xl font-bold mb-2 font-primary text-black">{selectedTask.title}</h2>
                <p className="font-primary text-black text-2xl">Category: {selectedTask.category}</p>
                <p className="text-black text-2xl font-primary">Due date: <span className="text-red-500 text-2xl font-outfit">{selectedTask.dueDate}</span></p>
                <div className="mb-4 font-primary text-slate-800 text-2xl bg-white mt-2 p-2 rounded-md">
                    <u>Description:</u>
                    <p className="text-xl font-semobold font-outfit">{selectedTask.description}</p>
                </div>
                <button onClick={handleTask} className={!selectedTask.completed ? 'text-green-500 text-2xl absolute top-2 right-3 cursor-pointer' : 'text-red-500 text-2xl absolute top-2 right-3 cursor-pointer'}>
                    {selectedTask.completed ? <IoIosRemoveCircle /> : <IoCheckmarkCircle />}
                </button>

                <button>
                <FiEdit />
                <MdSaveAs />
                </button>
            </div>
        </div>
    );
}

export default TaskModal;
