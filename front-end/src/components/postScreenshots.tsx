import axios from "axios";

interface Screenshots {
  dancer_image: string;
  customer_image: string;
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

export default postScreenshots;
