import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LikedArticle = () => {
  const [likedArticles, setLikedArticles] = useState([]);

 

  // Function to truncate summary to a specified number of words
  const truncateSummary = (summary, maxWords) => {
    const words = summary.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return summary;
  };

  return (
    <div>
      <h1 className='font-semibold text-3xl font-serif pl-12 pt-6'>Liked Articles</h1>
      <div className='flex flex-col space-y-7 items-center mt-6'>
        {likedArticles.length > 0 ? (
          likedArticles.map(article => (
            <div key={article._id} className='bg-red-500 shadow-md p-4 w-[80%] rounded-md'>
              <div className='flex'>
                <img src={article.image} alt="" className='w-60 h-36 object-cover mr-4 rounded-md' />
                <div className='flex flex-col'>
                  <h1 className='text-white font-bold text-xl mb-2'>{article.title}</h1>
                  <h1 className='text-white mb-2'>{article.category}</h1>
                  <h1 className='text-gray-400 mb-2'>{new Date(article.createdAt).toLocaleString()}</h1>
                  <p className='text-gray-300'>{truncateSummary(article.summary, 20)}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No liked articles found.</p>
        )}
      </div>
    </div>
  );
};

export default LikedArticle;
