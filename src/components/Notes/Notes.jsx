import React, { useState } from "react";
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
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      content: noteContent,
    },
    onSubmit: updateNote,
    validationSchema: validation,
  });

  const handleCloseUpdate = () => {
    setModal(false);
    formik.resetForm();
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    await deleteNote(noteId);
    setIsDeleting(false);
    setConfirmDelete(false);
  };

  return (
    <div className="relative bg-white border border-gray-200 rounded-xl p-5 pr-16 shadow-sm hover:shadow-md transition h-full flex flex-col">
      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onClick={() => setConfirmDelete(true)}
          className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-lg flex items-center justify-center transition"
          title="Delete"
          type="button"
        >
          <i className="fas fa-trash text-sm"></i>
        </button>

        <button
          onClick={() => setModal(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white w-8 h-8 rounded-lg flex items-center justify-center transition"
          title="Edit"
          type="button"
        >
          <i className="fa-solid fa-pen-to-square text-sm"></i>
        </button>
      </div>

      <h3 className="text-blue-700 font-semibold text-sm uppercase tracking-wide mb-1">
        Title
      </h3>
      <p className="text-gray-800 font-medium mb-3 break-words">{noteTitle}</p>

      <h3 className="text-blue-700 font-semibold text-sm uppercase tracking-wide mb-1">
        Content
      </h3>
      <p className="text-gray-600 break-words flex-1">{noteContent}</p>

      {/* ================= Update Modal ================= */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center p-4 md:p-5 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Update Note
              </h3>
              <button
                onClick={handleCloseUpdate}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Update task
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ================= Delete Confirmation Modal ================= */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-sm w-full max-w-sm p-6 text-center">
            <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <i className="fas fa-trash text-red-600"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Delete this note?
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              This action can't be undone. Are you sure you want to delete "
              {noteTitle}"?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition disabled:opacity-60"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}