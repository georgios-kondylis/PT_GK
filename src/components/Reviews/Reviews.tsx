import React from 'react'
import { reviews } from '../../utils'

const Reviews = () => {
  return (
    <section className="bg-mainDark text-white py-10">
      <div className="max-w-[1440px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">What People Are Saying</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <div key={i} className="bg-[#1e1e1e] p-6 rounded-2xl shadow-lg flex flex-col gap-4">
              {/* User info */}
              <div className="flex items-center gap-4">
                <img
                  src={r.afterImage}
                  alt={`${r.name} ${r.lastName}`}
                  className="w-14 h-14 rounded-full object-cover border-2 border-yellow-400"
                />
                <div>
                  <h3 className="font-semibold text-lg">{r.name} {r.lastName}</h3>
                  <p className="text-sm text-gray-400">
                    {r.programFollowed.join(', ')}
                  </p>
                </div>
              </div>

              {/* Review text */}
              <div className="text-sm text-gray-300">
                <p className="mb-2">“{r.text}”</p>
                <p className="italic text-gray-400">"{r.howItWas}"</p>
              </div>

              {/* Before/After Images */}
              <div className="flex gap-2">
                <img
                  src={r.beforeImage}
                  alt="Before"
                  className="w-1/2 h-32 object-cover rounded-md"
                />
                <img
                  src={r.afterImage}
                  alt="After"
                  className="w-1/2 h-32 object-cover rounded-md"
                />
              </div>

              {/* Star rating */}
              <div className="flex gap-[2px] pt-1">
                {Array.from({ length: Number(r.stars) }, (_, index) => (
                  <span key={index} className="text-yellow-400 text-lg">★</span>
                ))}
                {Array.from({ length: 5 - Number(r.stars) }, (_, index) => (
                  <span key={index} className="text-gray-600 text-lg">★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews
