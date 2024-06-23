import React, { useState, useEffect, useContext } from "react";
import { MdAccountCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import { FiltersortContext } from "../context/FiltersortContext";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaHeart, FaRegHeart } from 'react-icons/fa';



const Navbar = () => {
  const navigate = useNavigate();
  const { search, setSearch, setCategory } = useContext(FiltersortContext);
  const [searchIcon, setSearchIcon] = useState(false);
  const [user, setUser] = useState(null);
  const [openAccount, setOpenAccount] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const url = `${window.API_URL}/user`;
        const token = localStorage.getItem("token")
        const response = await axios.get(url, {
          headers : {
            Authorization : `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const logOut = async () => {
    localStorage.removeItem('token'); 
    setUser(null);
    alert("LogOut SuccessFully")
    navigate("/");
  };

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const handleCategory = (category) => {
    setCategory(category.toLowerCase());
  };

  

  return (
    <div>
      <div className="flex justify-between px-5 min-w-screen bg-black items-center">
        <h1 className="flex justify-left pl-5 text-5xl py-4 font-serif font-semibold tracking-wide text-white">
          THE OTHER SIDE
        </h1>
        <div className="space-x-3 flex">
          <FaFacebookSquare className="text-4xl text-blue-600" />
          <FaSquareInstagram className="text-4xl text-pink-600" />
          <IoLogoYoutube className="text-4xl text-red-600" />
          <FaSquareXTwitter className="text-4xl text-white" />
        </div>
      </div>
      <nav className="bg-gray-300 flex items-center justify-between px-12 h-16 bg-red-600">
        <div className="text-lg flex gap-x-8 font-semibold">
          <h1 onClick={() => handleCategory("all news")} className="cursor-pointer hover:text-black text-white">
            All News
          </h1>
          <h1 onClick={() => handleCategory("politics")} className="cursor-pointer hover:text-black text-white">
            Politics
          </h1>
          <h1 onClick={() => handleCategory("social media")} className="cursor-pointer hover:text-black text-white">
            Social Media
          </h1>
          <h1 onClick={() => handleCategory("science")} className="cursor-pointer hover:text-black text-white">
            Science
          </h1>
          <h1 onClick={() => handleCategory("sports")} className="cursor-pointer hover:text-black text-white">
            Sports
          </h1>
          <h1 onClick={() => handleCategory("business")} className="cursor-pointer hover:text-black text-white">
            Business
          </h1>
          <h1 onClick={() => handleCategory("technology")} className="cursor-pointer hover:text-black text-white">
            Technology
          </h1>
        </div>

        <div className="flex space-x-4 items-center">
          <Link to='/likeArticle' > <FaHeart/></Link>
          <IoIosSearch className="cursor-pointer text-2xl" onClick={() => setSearchIcon(!searchIcon)} />
          {searchIcon && (
            <div className="absolute space-x-8 right-0 h-16 flex items-center justify-center z-10 backdrop-blur-sm w-full">
              <input
                className="w-[500px] my-1 px-2 focus:outline-0 rounded-lg tracking-widest py-2"
                placeholder="Search Article..."
                type="search"
                onChange={handleSearch}
              />
              <RxCross2 onClick={() => setSearchIcon(!searchIcon)} className="text-2xl text-white cursor-pointer" />
            </div>
          )}
          <div>
            {user ? (
              <div className="relative">
                <div className="flex items-center gap-x-2 cursor-pointer" onClick={() => setOpenAccount(!openAccount)}>
                  <div className="w-12 h-12 rounded-full bg-blue-300">
                    <img src={user.image} className="w-full h-full rounded-full" alt="" />
                  </div>
                  <h1 className="text-xl">{user.username}</h1>
                  {openAccount ? <IoIosArrowDown /> : <IoIosArrowUp />}
                </div>
                {openAccount && (
                  <div className="z-10 absolute top-12 bg-slate-200 w-40 rounded-xl flex flex-col text-xl font-normal tracking-wide items-center">
                    <Link to={`/addArticle`} className="py-3 hover:bg-slate-400 w-full text-center rounded-xl cursor-pointer">
                      Add Article
                    </Link>
                    <Link to={`/myArticle`} className="py-3 hover:bg-slate-400 w-full text-center rounded-xl cursor-pointer">
                      My Articles
                    </Link>
                    <Link to={`/updateUser/${user._id}`} className="py-3 hover:bg-slate-400 w-full text-center rounded-xl cursor-pointer">
                      Edit Profile
                    </Link>
                    <h1 onClick={logOut} className="py-3 hover:bg-slate-400 w-full text-center rounded-xl cursor-pointer">
                      Log Out
                    </h1>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-x-10">
                <Link
                  to="/account"
                  className="cursor-pointer font-medium tracking-wider text-xl gap-x-1 flex items-center hover:text-red-300"
                >
                  <MdAccountCircle className="text-2xl" /> <h1>Account</h1>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
