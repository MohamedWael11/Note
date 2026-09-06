import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function Notes({
  noteId,
  noteTitle,
  noteContent,
  deleteNote,
  getNote,
}) {
  const [modal, setModal] = useState(false);
  const updateNote = async (values) => {
    try {
      const { data } = await axios.put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,
        values,
        {
          headers: {
            token: "3b8ny__" + localStorage.getItem("userToken"),
          },
        }
      );
      console.log(data);
      getNote();
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  const validation = Yup.object().shape({
    title: Yup.string().required("title is Required"),
    content: Yup.string().required("content is Required"),
  });
  const formik = useFormik({
    initialValues: {
      title: noteTitle,
      content: noteTitle,
    },
    onSubmit: updateNote,
    validationSchema: validation,
  });
  const handleUpdate =()=>{
    setModal(false)
    formik.resetForm()
  }

  return (
    <div className="flex justify-between items-center bg-gray-100 p-3 mb-4 rounded-lg shadow-sm hover:bg-gray-200 transition duration-200">
      <div className="flex flex-col">
        <h2 className="text-lg text-blue-600 font-semibold">Title:</h2>
        <span>{noteTitle}</span>
        <p className="text-lg text-blue-600 font-semibold">Content: </p>
        <span>{noteContent}</span>
      </div>
      <div className="icons flex gap-2">
        <button className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition">
          <i className="fas fa-trash" onClick={() => deleteNote(noteId)}></i>
        </button>

        <button
          onClick={() => setModal(true)}
          className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition"
          type="button"
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        {/*********************modal****************************************************************************** */}

        {modal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className=" bg-white rounded-lg shadow-sm dark:bg-gray-700 md:w-[50%] w-[70%]">
              <div className="flex p-4 md:p-5 border-b rounded  dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Update Note
                </h3>

                <button
                  onClick={handleUpdate}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      name="title"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="title..."
                    />
                  </div>
                  {formik.errors.title&&formik.touched.title? <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span class="font-medium">{formik.errors.title}</span>
          </div>:''}
                  <div>
                    <label
                      htmlFor="content"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Content
                    </label>
                    <textarea
                      value={formik.values.content}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      name="content"
                      id="content"
                      placeholder="•content"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                  {formik.errors.content&&formik.touched.content? <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span class="font-medium">{formik.errors.content}</span>
          </div>:''}
                  <button
                    type="submit"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update task
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
