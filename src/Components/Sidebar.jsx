import { useContext, useState } from "react";
import { TaskContext } from "../Contexts/TaskContext";

const Sidebar = () => {
    const { state: { tasks } } = useContext(TaskContext);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    return (
        <aside className='w-1/5 h-[calc(100vh-80px)] border-t border-r rounded-tr-2xl '>
            <div className="w-full h-full">
                {
                    tasks.length === 0 
                    ? (
                        <div className="w-full h-full bg-red-50 rounded-tr-2xl p-4">
                            <h1 className="font-primary font-semibold text-xl">No task has been yet</h1>
                        </div>
                    )
                    : (
                        <div className="w-full h-full bg-blue-100 rounded-tr-2xl p-4 flex flex-col gap-3">
                            <input className="p-2 rounded-md" type="text" placeholder="Search by title" />
                            {
                                tasks.map(task => (
                                    <div className="w-full bg-white rounded-md p-3 cursor-pointer" key={task.id} onClick={() => handleTaskClick(task)}>
                                        <h2>{task.title}</h2>
                                        <p>{task.description}</p>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg">
                        <h2 className="text-xl font-bold mb-2 font-primary">{selectedTask.title}</h2>
                        <p className="font-primary">category: {selectedTask.category}</p>
                        <p className="mb-4 font-primary">description: {selectedTask.description}</p>

                        {selectedTask.image && <img src={URL.createObjectURL(selectedTask.image)} alt="Task" className="mb-4" />}
                        <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </aside>
    );
}

export default Sidebar;
