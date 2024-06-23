import React , {useEffect , useState} from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useNavigate , Link } from "react-router-dom";
const Article = ({ article , handleDelete }) => {
  const navigate = useNavigate();

  const maxLength = 25;
  const title =
    article.title.length > maxLength
      ? `${article.title.slice(0, maxLength)}...`
      : article.title;

      const [isAuthorized , setisAuthorized] = useState(false);


  const navigateArticleDetails = async (id) => {
           
    const url = `${window.API_URL}/isAuthorized`
    const token = localStorage.getItem("token")
    const isAuth = await axios.get(url , {
        headers : {
          Authorization : token
        }
    }) 


    if([201,202,401].includes(isAuth.status)){
        alert(isAuth.data.message);
        navigate("/account");
    }
    else if(isAuth.status === 200){
        navigate(`/articleDetails/${id}`);
    }
}

  return (
    <div onClick={() => navigateArticleDetails(article._id)}  className={`border cursor-pointer border-gray-200 w-[450px] rounded-xl bg-gray-200`}>
      <div className={`relative overflow-hidden w-[450px] h-72 rounded-xl`}>
        <img
          src={article.image}
          className={`w-[450px] h-72 absolute `}
          alt=""
        />
        <div className="flex flex-col text-white  px-4 pt-3 absolute bottom-0 h-20 w-full">
        
          <h1 className="text-3xl font-semibold"> {title}</h1>
          <div className="flex">
            <h1>{article.author}</h1>
            <h1>{new Date(article.createdAt).toLocaleString()}</h1>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Article;
