import { useContext } from "react"
import { TaskContext } from "../Contexts/TaskContext"


const Sidebar = () => {
    const {state: {tasks}} = useContext(TaskContext)




  return (
    <aside className='w-1/5 h-[calc(100vh-80px)] border-t border-r rounded-tr-2xl '>
        <div className="w-full h-full">
            {
                tasks.length === 0 
                ?
                (
                    <div className="w-full h-full bg-red-50 rounded-tr-2xl p-4">
                        <h1 className="font-primary font-semibold text-xl">No task has been yet</h1>
                    </div>
                )
                :
                (
                    <div className="w-full h-full bg-blue-100 rounded-tr-2xl p-4 flex flex-col gap-3">
                        <input className="p-2 rounded-md" type="text" placeholder="Search by title"/>
                        {
                            tasks.map(task => (
                                <div className="w-full bg-white rounded-md p-3" key={task.id}>
                                        <h2>{task.title}</h2>
                                        <p>{task.description}</p>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    </aside>
  )
}

export default Sidebar