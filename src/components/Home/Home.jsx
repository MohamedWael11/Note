import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Notes from "../Notes/Notes";

function Home() {
  const [successMsg,setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const[notes,setNotes] = useState([])
  const addNote =async(values)=>{
    setSuccessMsg('')
    setErrorMsg('')
  try{
   const {data} = await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`,values,{
    headers:{
      token:"3b8ny__"+localStorage.getItem('userToken')
    } })
    console.log(data)
    setSuccessMsg('Note added')
    formik.resetForm()
    getNote()
  }
  catch(error){
  console.log(error)
  setErrorMsg(error.response.data.msg)
  }
  }

  const getNote =async(values)=>{
   
  try{
   const {data} = await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`,{
    headers:{
      token:"3b8ny__"+localStorage.getItem('userToken')
    } })
    console.log(data)
    setNotes(data?.notes)
  
  }
  catch(error){
  console.log(error)
  
  }
  }

  const deleteNote =async(noteId)=>{
 
  try{
   const {data} = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,{
    headers:{
      token:"3b8ny__"+localStorage.getItem('userToken')
    } })
    // console.log(data)
    let updateNotes = notes.filter(note=>note._id!==noteId)
  setNotes(updateNotes)
  
  }
  catch(error){
  console.log(error)
  
  }
  }

  const formik = useFormik({
    initialValues:{
    title: "",
    content: ""
    },
    onSubmit:addNote
  })
  useEffect(()=>{
   getNote()
  },[])
  return (
    <div 
     
      className="bg-white p-8 rounded-2xl shadow-xl   mx-auto w-[90%]  md:w-[60%] my-11"
    >
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center ">Welcome Note App</h2>

      

<div>
  <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-auto" type="button">
    Add Note
  </button>
  <ul className="list-none mt-10">
   {notes.map((note)=>
   <li key={note._id}><Notes noteId={note._id} noteTitle={note.title} noteContent={note.content} deleteNote={deleteNote} getNote={getNote}/></li>
  )}
  </ul>
  <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative p-4 w-full max-w-md max-h-full">
      <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Add Note
          </h3>
          
          <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          
        </div>
        <div className="p-4 md:p-5">
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <p className="text-green-700  font-semibold my-10">{successMsg}</p>
          <p className="text-red-600  font-semibold my-10">{errorMsg}</p>
            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
              <input value ={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="title..."  />
            </div>
            <div>
              <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
              <textarea value ={formik.values.content} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="content" id="content" placeholder="•content" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  />
            </div>
            <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add task</button>

          </form>
        </div>
      </div>
    </div>
  </div>
</div>


      {/* <ul className="list-none p-0">
        <li 
          className="flex justify-between items-center bg-gray-100 p-3 mb-4 rounded-lg shadow-sm hover:bg-gray-200 transition duration-200"
        >
          <span className="text-lg text-gray-700">Task 1</span>
          
          <div className="icons flex gap-2">
          <button className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition">
           <i className="fas fa-trash"></i>
          </button>
          <button className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition">
          <i className="fa-solid fa-pen-to-square"></i>
           </button>
          </div>
        </li>

      </ul> */}

    
    </div>
  );
}

export default Home;
