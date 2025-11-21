"use client";

import Image from "next/image";
import React, { useEffect } from "react";

interface ExerciseImageCarouselProps {
  images: string[];
  alt: string;
  interval?: number;
}

export default function ExerciseImageCarousel({
  images,
  alt,
  interval = 500, // 0.3s in milliseconds
}: ExerciseImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  useEffect(() => {
    // Only animate if we have more than one image
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const currentImage = images[currentIndex] || "placeholder.png";

  return (
    <div className="size-20">
      <Image
        src={`/images/exercises/${currentImage}`}
        alt={alt}
        width={500}
        height={500}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
