import React from "react";
import { reviews } from "../../utils";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  return (
    <section className="text-white bg-[url('/images/grafBg.png')] bg-cover bg-center w-full">
      <div className="flex flex-col MAX_W mainPX">
        <header className="font-bold text-[2rem] py-[20px] mx-auto">
          Amazing Succes Stories
        </header>

        <div className="flex gap20px justify-between">
          <div>prev</div>

          <div className="w-full">
            {reviews.map((review, i) => {
              return (
                <ReviewCard review={review}/>
              );
            })}
          </div>

          <div>prev</div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
