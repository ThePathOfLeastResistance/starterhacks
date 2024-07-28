import React, { useEffect, useRef } from "react";

export interface DanceFrame {
  dancer_image: string;
  customer_image: string;
  dance_sequence: number;
  score: number;
  feedback: string;
}

interface ResultsDisplayProps {
  danceFrames: DanceFrame[];
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ danceFrames }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("ResultsDisplay mounted or updated");
    console.log("danceFrames:", danceFrames);
  }, [danceFrames]);

  const framesWithFeedback = danceFrames.filter(
    (frame) => frame.feedback.trim() !== ""
  );

  if (!framesWithFeedback || framesWithFeedback.length === 0) {
    return <div>No dance frames with feedback available.</div>;
  }

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative mt-4 p-4 bg-black rounded-lg shadow-md">
      <button
        onClick={handleScrollLeft}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 z-10"
      >
        &lt;
      </button>
      <button
        onClick={handleScrollRight}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 z-10"
      >
        &gt;
      </button>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        {framesWithFeedback.map((frame, index) => (
          <div key={index} className="flex-shrink-0 w-full snap-start px-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded p-2">
                <h3 className="font-bold mb-2">Original</h3>
                <div className="aspect-w-1 aspect-h-1 overflow-hidden">
                  <img
                    src={`data:image/jpeg;base64,${frame.dancer_image}`}
                    alt={`Dancer frame ${frame.dance_sequence}`}
                    className=" w-full h-[300px]"
                  />
                </div>
              </div>
              <div className="border rounded p-2">
                <h3 className="font-bold mb-2">User</h3>
                <div className="aspect-w-1 aspect-h-1 overflow-hidden">
                  <img
                    src={`data:image/jpeg;base64,${frame.customer_image}`}
                    alt={`Customer frame ${frame.dance_sequence}`}
                    className=" w-full h-[300px]"
                  />
                </div>
              </div>
            </div>
            <div className="text-white">
              <p>Score: {frame.score}</p>
              <p>Feedback: {frame.feedback}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;
