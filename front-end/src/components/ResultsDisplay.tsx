import React, { useEffect } from "react";

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
  useEffect(() => {
    console.log("ResultsDisplay mounted or updated");
    console.log("danceFrames:", danceFrames);
  }, [danceFrames]);

  if (!danceFrames || danceFrames.length === 0) {
    return <div>No dance frames available.</div>;
  }

  return (
    <div className="mt-4 p-4 border border-gray-300 rounded">
      <h2 className="text-xl font-bold mb-4">Dance Results:</h2>
      {danceFrames.map((frame, index) => (
        <div key={index} className="mb-8 p-3 bg-gray-100 rounded">
          <div className="flex justify-between mb-4">
            <div className="w-1/2 pr-2">
              <h3 className="text-lg font-semibold mb-2">Dancer Image</h3>
              <img
                src={`data:image/jpeg;base64,${frame.dancer_image}`}
                alt={`Dancer frame ${frame.dance_sequence}`}
                className="w-full h-auto"
              />
            </div>
            <div className="w-1/2 pl-2">
              <h3 className="text-lg font-semibold mb-2">Customer Image</h3>
              <img
                src={`data:image/jpeg;base64,${frame.customer_image}`}
                alt={`Customer frame ${frame.dance_sequence}`}
                className="w-full h-auto"
              />
            </div>
          </div>
          <p>
            <strong>Sequence:</strong> {frame.dance_sequence}
          </p>
          <p>
            <strong>Score:</strong> {frame.score}
          </p>
          <p>
            <strong>Feedback:</strong> {frame.feedback}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ResultsDisplay;
