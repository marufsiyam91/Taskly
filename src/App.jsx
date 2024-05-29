import { useState } from "react";
import Form from "./Components/Form"
import Sidebar from "./Components/Sidebar"
import { GoTasklist } from "react-icons/go";




function App() {

  const [showSidebar, setShowSidebar] = useState(false)


  return (
    <>
      <div className="h-[80px] flex flex-col items-center pt-3 relative">
        <button onClick={() => (setShowSidebar(true))} className="block smd:hidden top-6 right-6 absolute text-3xl"><GoTasklist /></button>
        <h1 className="font-primary text-2xl font-bold">Taskly</h1>
        </div>

    <div className="flex">
      <div className={showSidebar ? '2xl:w-1/5 xl:w-1/4 md:w-1/3 sm:w-1/2 esm:w-[80%] w-full smd:rounded-tr-2xl border-t smd:border-l-0 border-l rounded-tl-2xl smd:rounded-tl-none smd:border-r smd:relative fixed top-0 right-0 z-10' : '2xl:w-1/5 xl:w-1/4 md:w-1/3 sm:w-1/2 esm:w-[80%] smd:rounded-tr-2xl border-t smd:border-l-0 border-l rounded-tl-2xl smd:rounded-tl-none smd:border-r smd:relative fixed top-0 right-[-1000%] smd:right-0 z-10'}>
        <Sidebar closeSidebar={setShowSidebar}/>
      </div>
      <div className="w-full esm:w-[90%] sm:w-[80%] smd:w-1/2 md:w-2/3 xl:w-3/4 2xl:w-4/5 py-10 px-4 md:px-8">
        <Form/>
      </div>
    </div>
    </>
  )
}

export default App
