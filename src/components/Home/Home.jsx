import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Notes from "../Notes/Notes";

function Home() {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [notes, setNotes] = useState([]);
  const [modal, setModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addNote = async (values) => {
    setSuccessMsg("");
    setErrorMsg("");
    setIsSubmitting(true);
    try {
      const { data } = await axios.post(
        `https://note-sigma-black.vercel.app/api/v1/notes`,
        values,
        {
          headers: {
            token: "3b8ny__" + localStorage.getItem("userToken"),
          },
        }
      );
      setIsSubmitting(false);
      setSuccessMsg("Note added");
      formik.resetForm();
      getNote();
      setTimeout(() => {
        setModal(false);
        setSuccessMsg("");
      }, 1200);
    } catch (error) {
      setIsSubmitting(false);
      setErrorMsg(error.response?.data?.msg || "Something went wrong");
    }
  };

  const getNote = async () => {
    try {
      const { data } = await axios.get(
        `https://note-sigma-black.vercel.app/api/v1/notes`,
        {
          headers: {
            token: "3b8ny__" + localStorage.getItem("userToken"),
          },
        }
      );
      setNotes(data?.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,
        {
          headers: {
            token: "3b8ny__" + localStorage.getItem("userToken"),
          },
        }
      );
      let updateNotes = notes.filter((note) => note._id !== noteId);
      setNotes(updateNotes);
    } catch (error) {
      console.log(error);
    }
  };

  const validation = Yup.object().shape({
    title: Yup.string().required("title is required"),
    content: Yup.string().required("content is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: addNote,
    validationSchema: validation,
  });

  const openModal = () => {
    setSuccessMsg("");
    setErrorMsg("");
    formik.resetForm();
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setSuccessMsg("");
    setErrorMsg("");
    formik.resetForm();
  };

  useEffect(() => {
    getNote();
  }, []);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl mx-auto w-[90%] md:w-[60%] my-11 border border-gray-100">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
        Welcome Note App
      </h2>

      <div>
        <button
          onClick={openModal}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-auto"
          type="button"
        >
          Add Note
        </button>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none mt-10 p-0 items-stretch">
          {notes.map((note) => (
            <li key={note._id} className="h-full">
              <Notes
                noteId={note._id}
                noteTitle={note.title}
                noteContent={note.content}
                deleteNote={deleteNote}
                getNote={getNote}
              />
            </li>
          ))}
        </ul>
        {notes.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No notes yet. Add your first one!
          </p>
        )}

        {modal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  Add Note
                </h3>
                <button
                  onClick={closeModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
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
                {successMsg && (
                  <p className="text-green-700 bg-green-50 border border-green-200 rounded-lg text-sm font-medium py-2 px-3 mb-4 text-center">
                    {successMsg}
                  </p>
                )}
                {errorMsg && (
                  <p className="text-red-700 bg-red-50 border border-red-200 rounded-lg text-sm font-medium py-2 px-3 mb-4 text-center">
                    {errorMsg}
                  </p>
                )}

                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900"
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="title..."
                    />
                    {formik.errors.title && formik.touched.title && (
                      <p className="text-red-600 text-sm mt-1">
                        {formik.errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="content"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Content
                    </label>
                    <textarea
                      value={formik.values.content}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="content"
                      id="content"
                      placeholder="content..."
                      rows={4}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    {formik.errors.content && formik.touched.content && (
                      <p className="text-red-600 text-sm mt-1">
                        {formik.errors.content}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      "Add task"
                    )}
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

export default Home;