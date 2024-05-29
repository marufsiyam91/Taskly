import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../Contexts/TaskContext";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import { IoCheckmarkCircle } from "react-icons/io5";
import { IoIosRemoveCircle } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";



const Sidebar = ({closeSidebar}) => {
    const { state: { tasks }, dispatch } = useContext(TaskContext);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        // Save tasks to localStorage whenever the tasks state changes
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

    // Filter tasks based on the search query and selected category
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

    return (
        <aside className="relative h-[100vh] smd:h-[calc(100vh-81px)]">
            <button onClick={() => closeSidebar(false)} className="absolute text-3xl top-1 right-1 block smd:hidden"><IoIosCloseCircle /></button>
            <div className="w-full h-full">
                {
                    tasks.length === 0 
                    ? (
                        <div className="w-full h-full bg-red-50 smd:rounded-tl-none rounded-tl-2xl  smd:rounded-tr-2xl  px-4 pt-10 smd:pt-4">
                            <h1 className="font-primary font-semibold text-xl">No task has been yet</h1>
                        </div>
                    )
                    : (
                        <div className="w-full h-full bg-blue-100 smd:rounded-tl-none rounded-tl-2xl smd:rounded-tr-2xl  px-4 pt-10 smd:pt-4 flex flex-col gap-3">
                            <input 
                                className="p-3 rounded-md" 
                                type="text" 
                                placeholder="Search by title" 
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <select 
                                className="p-3 rounded-md mb-4" 
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
                            <div className="w-full h-full overflow-scroll hideScroll flex flex-col gap-3">

                                {
                                    filteredTasks.map(task => (
                                        <div className={task.completed ? 'relative w-full bg-green-50 rounded-md p-3 pr-6' : 'relative w-full bg-white rounded-md p-3 pr-6'} key={task.id} >
                                            <h2 className="text-2xl font-outfit font-semibold mb-2">{task.title}</h2>
                                            <p className="text-xl font-outfit font-medium">Due date: {task.dueDate}</p>
                                            <button onClick={() => handleTaskClick(task)} className="absolute top-2 right-3 text-xl cursor-pointer"><TbListDetails /></button>
                                            <button onClick={() => dispatch({type: task.completed ? 'deleteTask' : 'completeTask', payload:task.id})} className={!task.completed ? 'text-green-500 text-2xl absolute bottom-2 right-3  cursor-pointer' : 'text-red-500 text-2xl absolute bottom-2 right-3  cursor-pointer'}>{task.completed ?  <IoIosRemoveCircle/> : <IoCheckmarkCircle/>}</button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className={selectedTask.completed ? 'relative bg-green-100 px-6 py-8 rounded-lg max-w-[550px]' : 'relative bg-slate-300 px-6 py-8 rounded-lg max-w-[550px]'}>
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
                        <button onClick={() => dispatch({type: selectedTask.completed ? 'deleteTask' : 'completeTask', payload:selectedTask.id})} className={!selectedTask.completed ? 'text-green-500 text-2xl absolute top-2 right-3  cursor-pointer' : 'text-red-500 text-2xl absolute top-2 right-3  cursor-pointer'}>{selectedTask.completed ?  <IoIosRemoveCircle/> : <IoCheckmarkCircle/>}</button>
                    </div>
                </div>
            )}
        </aside>
    );
}

export default Sidebar;
