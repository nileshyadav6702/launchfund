import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';

const CampaignDetails = () => {
  const url = "https://launchfund.onrender.com"
  const [campaigndetail,setcampaindetail]=useState('')
  const { id } = useParams();

  async function getcampaigndata(){
    try{
      const response=await axios.get(`${url}/campaign/get/${id}`)
      if(response.data){
        setcampaindetail(response.data.data)
      }
    }
    catch(err){
      console.log('error occured')
    }
  }
   useEffect(()=>{
    getcampaigndata()
   },[])
  return (
    <div className="min-h-screen   text-gray-900">
      <Navbar />
      {campaigndetail ? (
        <div className="py-20 px-6 sm:px-12 lg:px-16 mt-10 flex sm:flex-col lg:flex-row gap-[50px]">
          <div className="w-[100%] lg:w-[50%] bg-gray-400 h-[50vh] rounded-2xl overflow-hidden">
            <img
              src={`${campaigndetail.image}`}
              alt="image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[100%] lg:w-[50%] p-4 rounded-2xl overflow-hidden">
            <span className="text-green-800 font-bold mb-5 text-1xl">
              FUNDING
            </span>
            <h1 className="text-[#1f0733] text-5xl font-bold leading-14 mb-2">
              {campaigndetail.title.toUpperCase()}
            </h1>
            <p className="text-[#5B595D] text-1xl font-semibold">
              {campaigndetail.description}
            </p>
            <div className="mt-5 mb-5 flex flex-row items-center gap-[10px]">
              <div className="rounded-full bg-green-400 w-[40px] h-[40px]  flex items-center justify-center text-[20px]">
                {campaigndetail.creator.name[0].toUpperCase()}
              </div>
              <h1 className="text-[#1f0733] font-semibold text-[15px]">
                {campaigndetail.creator.name.toUpperCase()}
              </h1>
            </div>
            <div>
              <div className="w-full flex flex-row justify-between">
                <p className="text-[#1f0733] font-semibold text-[18px]">
                  ₹{campaigndetail.currentAmount.toLocaleString()} INR
                </p>
                <p className="text-[#1f0733] font-semibold text-[18px]">
                  {campaigndetail.backers.length} Backers
                </p>
              </div>
              <div className="mt-2 w-full h-2 bg-gray-400 rounded-3xl">
                <div
                  style={{
                    width: `${
                      ((campaigndetail.currentAmount
                        ? campaigndetail.currentAmount
                        : 0) /
                        campaigndetail.goalAmount) *
                      100
                    }%`,
                  }}
                  className={` h-2 rounded-3xl bg-green-700`}
                ></div>
              </div>
              <div className=" mt-2 w-full flex flex-row justify-between">
                <p className="text-[#1f0733] font-semibold text-[18px]">
                  {Math.floor(
                    (campaigndetail.currentAmount / campaigndetail.goalAmount) *
                      100
                  )}
                  % of ₹{campaigndetail.goalAmount}
                </p>
              </div>
              <button className="w-full bg-[#1F0733] hover:bg-[#3a2b47] cursor-pointer text-white p-4 mt-3 rounded-md text-center text-[18px]">
                Donate
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {campaigndetail ? (
        <div className="px-18">
          <h1 className="text-2xl text-[#1f0733] font-semibold">
            Comments({campaigndetail.comments.length})
          </h1>
          <div>
            {campaigndetail.comments.map((user) => (
              <div className="mt-5 mb-5 flex flex-row items-center gap-[10px]">
                <div className="rounded-full bg-green-400 w-[40px] h-[40px]  flex items-center justify-center text-[20px]">
                  {user.name[0].toUpperCase()}
                </div>
                <div className='flex flex-col'>
                <h1 className="text-[#1f0733] font-semibold text-[15px]">
                  {user.name.toUpperCase()}
                </h1>
                <p>{user.content}</p>
                </div>
              </div>
            ))}
          </div>
          {localStorage.getItem('token')?<div className="w-full flex flex-row px-6 py-10 gap-2">
            <input
              className="grow py-3 px-4 border-2 rounded-md text-[16px] font-semibold"
              placeholder="Enter your comment here..."
              type="text"
            />
            <button className="px-3 py-3 bg-green-400 rounded-md border-2 text-[18px] cursor-pointer hover:bg-green-500 font-semibold text-black">
              Submit
            </button>
          </div>:null}
        </div>
      ) : null}
      <Footer />
    </div>
  );
}

export default CampaignDetails
