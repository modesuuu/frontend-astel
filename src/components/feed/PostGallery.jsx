"use client";

import React, { useState } from 'react'
import Image from 'next/image'

const PostGallery = ({ images = [] }) => {
  const totalImages = images.length
  console.log("totalImages", totalImages)
  
  const [activeIndex, setActiveIndex] = useState(null)

  if (totalImages === 0) return null

  const handlePrev = (e) => {
    e.stopPropagation(); 
    setActiveIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation(); 
    setActiveIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  const renderImage = (img, idx) => (
    <div 
      key={idx} 
      className="relative h-full w-full overflow-hidden cursor-pointer group"
      onClick={() => setActiveIndex(idx)} 
    >
      <Image
        src={img}
        alt={`Post media ${idx}`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      
      {idx === 3 && totalImages > 4 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px] transition-all group-hover:bg-black/50 select-none">
          <span className="text-2xl font-bold text-white">
            +{totalImages - 3}
          </span>
        </div>
      )}
    </div>
  )

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
      {totalImages === 1 && (
        <div className="relative h-80 w-full" onClick={() => setActiveIndex(0)}>
          {renderImage(images[0], 0)}
        </div>
      )}

      {totalImages === 2 && (
        <div className="grid h-80 grid-cols-2 gap-1">
          {images.map((img, idx) => renderImage(img, idx))}
        </div>
      )}

      {totalImages === 3 && (
        <div className="grid h-80 grid-cols-2 gap-1">
          <div 
            className="relative h-full w-full cursor-pointer group"
            onClick={() => setActiveIndex(0)}
          >
            <Image
              src={images[0]}
              alt="Post media 0"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="grid h-full grid-rows-2 gap-1">
            <div 
              className="relative h-full w-full cursor-pointer group"
              onClick={() => setActiveIndex(1)}
            >
              <Image
                src={images[1]}
                alt="Post media 1"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div 
              className="relative h-full w-full cursor-pointer group"
              onClick={() => setActiveIndex(2)}
            >
              <Image
                src={images[2]}
                alt="Post media 2"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      )}

      {totalImages >= 4 && (
        <div className="grid h-80 grid-cols-2 gap-1">
          {images.slice(0, 4).map((img, idx) => renderImage(img, idx))}
        </div>
      )}

      {/* Detail Image Modal */}
      {activeIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={() => setActiveIndex(null)}
        >
          <button 
            className="absolute cursor-pointer top-6 right-6 text-white text-3xl opacity-70 hover:opacity-100 transition-opacity z-50"
            onClick={() => setActiveIndex(null)}
          >
            <i className="bx bx-x"></i>
          </button>

          {totalImages > 1 && (
            <button 
              onClick={handlePrev}
              className="absolute left-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl flex items-center justify-center transition-all focus:outline-none"
            >
              <i className="bx bx-chevron-left"></i>
            </button>
          )}

          <div 
            className="relative max-w-4xl max-h-[80vh] w-full h-full p-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} 
          >
            <Image 
              src={images[activeIndex]}
              alt={`Detail media ${activeIndex}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {totalImages > 1 && (
            <button 
              onClick={handleNext}
              className="absolute right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl flex items-center justify-center transition-all focus:outline-none"
            >
              <i className="bx bx-chevron-right"></i>
            </button>
          )}

          <div className="absolute bottom-6 text-white/70 text-sm font-medium">
            {activeIndex + 1} / {totalImages}
          </div>
        </div>
      )}
    </div>
  )
}

export default PostGallery