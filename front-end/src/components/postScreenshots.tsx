import axios from "axios";

interface Screenshots {
  modelImage: string;
  userImage: string;
}
interface DanceFrame {
  dancer_image: string;
  customer_image: string;
  dance_sequence: number;
  score: number;
  feedback: string;
}


const postScreenshots = async (screenshots: Screenshots) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/home/upload/image-snapshot",
      screenshots
    );
    console.log("Screenshots uploaded successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading screenshots:", error);
    throw error;
  }
};



const fetchDanceFrames = async (): Promise<DanceFrame[]> => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/home/upload/image-snapshot"
    );
    console.log("Dance frames fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching dance frames:", error);
    throw error;
  }
};

export { fetchDanceFrames, postScreenshots };