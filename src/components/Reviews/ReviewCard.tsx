import React from 'react'
import { AnimatePresence } from 'framer';

type reviewCardProps = {
  review: {
  gender?: string,
  name?: string,
  lastName?: string,
  programFollowed?: string[] | null,
  text?: string,
  howItWas?: string,
  beforeImage?: string,
  afterImage?: string,
  stars?: string,
  }
}

const ReviewCard = ({review} : reviewCardProps) => {
  const programs = review.programFollowed ?? [];

  return (
     <div className="flex flex-col gap20px">
        {/* NAME */}
        <div className="flex items-center gap20px">
          <h1 className="text-[2rem]">{review.name}</h1>
          <span className="w-full h-[2px] bg-white"></span>
        </div>

        <div className="flex max-lg:flex-col gap20px">
          {/* IMAGES */}
          <div className="flex gap-[10px] w-[50%] max-lg:w-full">
            {[{ src: review.beforeImage, label: "Before" }, { src: review.afterImage, label: "After" }].map((img, idx) => (
              <div key={idx} className="relative flex-1 aspect-[3/5]">
                <img src={img.src} alt={img.label}
                  className="w-full h-full object-cover object-center rounded-[7px]"
                />
                <span className={`absolute text-[20px] bottom-[30px] ${img.label === "Before" ? "left-[-5px] rounded-r-[10px]" : "right-[-5px] rounded-l-[10px]"} bg-black px-[10px] py-[5px]`}
                >
                  {img.label}
                </span>
              </div>
            ))}
          </div>

          {/* Review Text */}
          <div className="relative w-[50%] flex flex-col justify-between gap20px p-[30px] 
                max-lg:w-full max-lg:gap-[30px]">
            
            <p className="relative text-[20px] xl:text-[24px] flex flex-col gap-[10px] reviewText6 italic">
              {review.text} <br />
              <span className="text-[17px] xl:text-[20px] font-light text-[#a7a6a6]">
                {review.howItWas}
              </span>
              <img className="absolute w-[35px] top-[-18px] left-[-30px]" src="/icons/qms.png" alt="" />
              <img className="absolute w-[35px] bottom-[-20px] right-[-5px]" src="/icons/qms.png" alt="" />
            </p>

            <p className="">
              <span className="font-semibold text-[20px]">{review.name}</span> earned {review.gender === 'male' ? 'his' : 'her'} results by following {<br/>}

              <span className="">
                {programs?.length === 1 ? 'the ' : ''}
                {programs?.map((pr, i) => (
                  <span key={i} className="font-semibold text-mainOrange mr-[3px]">
                    {pr}
                    {i === programs.length - 2 && programs.length > 1 && <span className="text-white"> & </span>}
                  </span>
                ))}{' '}
                {programs.length === 1 ? 'training program' : 'training programs'}.
              </span>
            </p>
          </div>
        </div>
      </div>
  )
  }

export default ReviewCard