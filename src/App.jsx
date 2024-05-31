import { useState } from "react";
import Form from "./Components/Form"
import Sidebar from "./Components/Sidebar"
import { GoTasklist } from "react-icons/go";
import PlaneImage from './assets/plane 2.png'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {

  const [showSidebar, setShowSidebar] = useState(false)


  return (
    <main className="w-full min-h-[100vh] bg-blue-50">

      {/* add react toast message on item added in mobile view */}
        <ToastContainer/>


      <div className="h-[80px] flex flex-col items-center pt-3 relative">
        <button onClick={() => (setShowSidebar(true))} className="block smd:hidden top-6 right-6 absolute text-3xl"><GoTasklist /></button>
        <div className="flex">
          <img className="max-w-14" src={PlaneImage} alt="" />
          <h1 className="font-outfit text-3xl font-bold">Taskly</h1>
        </div>
      </div>

    <div className="flex w-full">
      <div className={showSidebar ? '2xl:w-1/5 xl:w-1/4 md:w-1/3 smd:w-2/5  esm:w-[80%] w-full smd:rounded-tr-2xl border-t smd:border-l-0 border-l esm:rounded-tl-2xl smd:rounded-tl-none smd:border-r smd:relative fixed top-0 right-0 z-10' : '2xl:w-1/5 xl:w-1/4 md:w-1/3 smd:w-2/5  esm:w-[80%] smd:rounded-tr-2xl border-t smd:border-l-0 border-l esm:rounded-tl-2xl smd:rounded-tl-none smd:border-r smd:relative fixed top-0 right-[-2000%] smd:right-0 z-10'}>
        <Sidebar closeSidebar={setShowSidebar}/>
      </div>
      <div className="w-full esm:w-[90%] smd:w-3/5  md:w-2/3 xl:w-3/4 2xl:w-4/5 py-10 px-4 md:px-8">
        <Form/>
      </div>
    </div>
    </main>
  )
}

export default App
