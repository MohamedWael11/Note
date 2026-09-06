

function Home() {
  return (
    <div 
  
      className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center max-w-md mx-auto"
    >
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">مرحبا بك في تطبيق المهام</h2>

      <div className="mb-6">
        <input 
          type="text" 
          placeholder="أضف مهمة جديدة"
          className="p-3 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <button 
          className="w-full bg-blue-500 text-white py-3 rounded-lg mt-4 hover:bg-blue-600 transition duration-300"
        >
          إضافة مهمة
        </button>
      </div>

      <ul className="list-none p-0">
        <motion.li 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex justify-between items-center bg-gray-100 p-3 mb-4 rounded-lg shadow-sm hover:bg-gray-200 transition duration-200"
        >
          <span className="text-lg text-gray-700">مهمة مثال</span>
          <button className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition">
            حذف
          </button>
        </motion.li>
      </ul>

      <button className="w-full bg-red-500 text-white py-3 rounded-lg mt-6 hover:bg-red-600 transition duration-300">
        تسجيل خروج
      </button>
    </div>
  );
}

export default Home;
