import SanityImage from "@/components/sanity-image-test"
import { useEffect, useRef, useState } from "react";

export default function ImageTicker({ images }) {
  const ref = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    let speed = 350

    // Set an interval that updates the currentProject every 3 seconds on mobile to rotate the projects
    const i_id = setInterval(() => {
      if (currentImage == (images.length - 1)) {
        // If we hit the cap (5)... Reset...
        setCurrentImage(0)
      } else {
        // Else... Tick along...
        setCurrentImage(currentImage => currentImage+1)
      }
    }, speed);
    return () => {
      clearInterval(i_id);
    }
  },[currentImage]);

  return(
    <div className="relative overflow-hidden w-4/12 lg:w-4/12 mx-auto">
      {images.map((e, i) => {
        return (
          <div className={`block w-full ${i == 0 ? 'relative' : 'absolute inset-0' } ${i == currentImage ? 'z-[10]' : 'z-[1] opacity-0' }`} ref={ref} key={i}>
            <SanityImage
              layout="responsive"
              image={e}
              className="block w-full"
              alt="placeholder"
            />
          </div>
        )
      })}
    </div>
  )
}