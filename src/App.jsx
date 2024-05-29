import Form from "./Components/Form"
import Sidebar from "./Components/Sidebar"


function App() {

  return (
    <>
      <div className="h-[80px] flex flex-col items-center pt-3">
        <h1 className="font-primary text-2xl font-bold">Taskly</h1>
        <p className="font-primary font-semibold">A comprehensive task management application designed to help users organize and streamline their daily activities with ease.</p>
      </div>

    <div className="flex">
      <Sidebar/>
      <Form/>
    </div>
    </>
  )
}

export default App
