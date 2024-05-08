import React from 'react'

const Login = () => {
  return (
    <div className="flex justify-center items-center md:p-8 p-5 relative">
    <div className="w-full px-4 md:max-w-md md:px-0">
    <div className="bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign in</h2>
      <form>
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="User ID"
            />
            <span className="absolute top-2 left-3 text-gray-500">
              <i className="far fa-user"></i>
            </span>
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Email"
            />
            <span className="absolute top-2 left-3 text-gray-500">
              <i className="far fa-envelope"></i>
            </span>
          </div>
        </div>
        <div className="mb-6">
          <div className="relative">
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Password"
            />
            <span className="absolute top-2 left-3 text-gray-500">
              <i className="fas fa-lock"></i>
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Sign in
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-gray-600">Or sign in with</p>
        <button className="mt-2 bg-white shadow-md hover:bg-gray-100 px-4 py-2 rounded-lg">
          <i className="fab fa-google text-blue-500"></i>
        </button>
      </div>
    </div>
  </div>
</div>
  )
}

export default Login
