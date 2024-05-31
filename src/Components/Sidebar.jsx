import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../Contexts/TaskContext";
import { TbListDetails } from "react-icons/tb";
import { IoCheckmarkCircle } from "react-icons/io5";
import { IoIosRemoveCircle } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import TaskModal from "./TaskModal";
import TaskImage from '../assets/task image.png'

const Sidebar = ({ closeSidebar }) => {
    const { state: { tasks }, dispatch } = useContext(TaskContext);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };


    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === "" || task.category === selectedCategory)
    );

    useEffect(() => {
        if (selectedTask) {
            const updatedTask = tasks.find(task => task.id === selectedTask.id);
            if (updatedTask) {
                setSelectedTask(updatedTask);
            } else {
                closeModal();
            }
        }
    }, [tasks, selectedTask]);

    const handleTask = (task) => {
        dispatch({ type: task.completed ? 'deleteTask' : 'completeTask', payload: task.id });
    };

    return (
        <aside className="relative w-full h-[100vh] smd:h-[calc(100vh-81px)]">
            <button onClick={() => closeSidebar(false)} className="absolute text-3xl top-1 right-1 block smd:hidden"><IoIosCloseCircle /></button>
            <div className="w-full h-full">
                {tasks.length === 0 ? (
                    <div className="w-full h-full bg-red-100 smd:rounded-tl-none esm:rounded-tl-2xl smd:rounded-tr-2xl px-4 pt-10 smd:pt-4">
                        <h1 className="font-primary text-slate-800 font-semibold text-xl">No task has been yet</h1>
                        <img className="max-w-[80%] mx-auto mt-12" src={TaskImage} alt="" />
                    </div>
                ) : (
                    <div className="w-full h-full bg-blue-200 smd:rounded-tl-none esm:rounded-tl-2xl smd:rounded-tr-2xl px-4 pt-10 smd:pt-4 flex flex-col gap-3">
                        <input
                            className="p-3 rounded-md font-primary"
                            type="text"
                            placeholder="Search by title"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <select
                            className="p-3 rounded-md mb-4 font-primary"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
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
                        <div className="w-full h-full overflow-scroll hideScroll flex flex-col gap-3 pb-3">
                            {filteredTasks.map(task => (
                                // <div className={task.completed ? `relative w-full bg-green-50 rounded-md p-3 pr-6 shadow-sm hover:shadow-md transition duration-300 border-[3px] border-t-transparent border-r-transparent border-l-transparent ${task.priority === 'Low' && 'border-green-300 hover:border-t-green-300 hover:border-r-green-300 hover:border-l-green-300' || task.priority === 'Medium' && 'border-blue-400 hover:border-t-blue-400 hover:border-r-blue-400 hover:border-l-blue-400' || task.priority === 'High' && 'border-red-500 hover:border-t-red-500 hover:border-r-red-500 hover:border-l-red-500' }` : `relative w-full bg-white rounded-md p-3 pr-6 shadow-sm hover:shadow-md transition duration-300 border-[3px] border-t-transparent border-r-transparent border-l-transparent ${task.priority === 'Low' && 'border-green-300 hover:border-t-green-300 hover:border-r-green-300 hover:border-l-green-300' || task.priority === 'Medium' && 'border-blue-400 hover:border-t-blue-400 hover:border-r-blue-400 hover:border-l-blue-400' || task.priority === 'High' && 'border-red-500 hover:border-t-red-500 hover:border-r-red-500 hover:border-l-red-500' } `} key={task.id}>
                                <div className={task.completed ? `relative w-full bg-green-50 rounded-md p-3 pr-6 shadow-sm hover:shadow-md transition duration-300 border-b-4 border-b-white ${task.priority === 'Low' && 'hover:border-b-green-300' || task.priority === 'Medium' && 'hover:border-b-blue-400' || task.priority === 'High' && 'hover:border-b-red-500' }` : `relative w-full bg-white rounded-md p-3 pr-6 shadow-sm hover:shadow-md transition duration-300 border-b-4 border-b-white ${task.priority === 'Low' && 'hover:border-b-green-300' || task.priority === 'Medium' && 'hover:border-b-blue-400' || task.priority === 'High' && 'hover:border-b-red-500' }`} key={task.id}>
                                    <h2 className="text-2xl font-outfit font-semibold mb-2">{task.title}</h2>
                                    <p className="text-xl font-outfit font-medium">Due date: <span className="text-red-500">{task.dueDate}</span></p>
                                    <button onClick={() => handleTaskClick(task)} className="absolute top-2 right-3 text-xl cursor-pointer"><TbListDetails /></button>
                                    <button onClick={() => handleTask(task)} className={!task.completed ? 'text-green-500 text-2xl absolute bottom-2 right-3 cursor-pointer' : 'text-red-500 text-2xl absolute bottom-2 right-3 cursor-pointer'}>
                                        {task.completed ? <IoIosRemoveCircle /> : <IoCheckmarkCircle />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {isModalOpen && <TaskModal selectedTask={selectedTask} closeModal={closeModal} />}
        </aside>
    );
}

export default Sidebar;
