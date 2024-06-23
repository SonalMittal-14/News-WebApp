import RegistrationPage from "./RegistrationPage/RegistrationPage";
import {Routes,Route} from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import { useNavigate } from "react-router-dom";
import { MdHome } from "react-icons/md";

const Account = () => {

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  }
  

  return (
    <div className="font-[sans-serif] text-gray-800 bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4">
      <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
        <div className="max-md:order-1 flex flex-col justify-center space-y-8 max-md:mt-16 min-h-full bg-gradient-to-r from-red-300 to-red-200 text-black lg:px-8 px-4 py-4">
            <button onClick={goHome}> <MdHome className="text-3xl mt-"/></button>
          <div>
            <h4 className="text-black text-lg font-semibold">Create Your Account</h4>
            <p className="text-[13px] text-black mt-2">Welcome to our registration page! Get started by creating your account.</p>
          </div>
          <div>
            <h4 className="text-black text-lg font-semibold">Simple & Secure Registration</h4>
            <p className="text-[13px] text-black mt-2">Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.</p>
          </div>
        </div>
        

        <Routes>
          <Route path="/register" element={<RegistrationPage/>} />
          <Route path="/" element={<LoginPage/>} />
        </Routes>


      </div>
    </div>
  )
}

export default Account