import React from "react";
import html2canvas from "html2canvas";
import postScreenshots from "./postScreenshots";

interface ScreenshotManagerProps {
  modelRef: React.RefObject<HTMLDivElement>;
  cameraRef: React.RefObject<HTMLDivElement>;
}

const ScreenshotManager: React.FC<ScreenshotManagerProps> = ({
  modelRef,
  cameraRef,
}) => {
  const captureScreenshots = async () => {
    if (!modelRef.current || !cameraRef.current) {
      console.error("One or both refs are null");
      return null;
    }

    try {
      const modelCanvas = await html2canvas(modelRef.current);
      const userCanvas = await html2canvas(cameraRef.current);

      const modelImage = modelCanvas.toDataURL("image/png");
      const userImage = userCanvas.toDataURL("image/png");

      console.log(modelImage,userImage);
      return {
        dancer_image: modelImage,
        customer_image: userImage,
      };
    } catch (error) {
      console.error("Error capturing screenshots:", error);
      return null;
    }
  };

  const handleCaptureClick = async () => {
    const screenshots = await captureScreenshots();
    if (screenshots) {
      console.log("Screenshots captured:", screenshots);
      // Here you can do something with the screenshots, like sending them to a server
       try {
         const result = await postScreenshots(screenshots);
         console.log("Screenshots uploaded:", result);
       } catch (error) {
         console.error("Failed to upload screenshots:", error);
       }
    }
  };

  return (
    <div>
      <button onClick={handleCaptureClick} className="">
        Capture Screenshots
      </button>
    </div>
  );
};

export default ScreenshotManager;
