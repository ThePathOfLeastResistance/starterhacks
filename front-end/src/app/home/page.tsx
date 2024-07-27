import Model from "@/components/model";
import Image from "next/image";
import "./page.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 landing-page">
      <div className="landing-page">
        <div className="big-text">
          <h1>NEW GAMES, NEW CHALLENGES</h1>
        </div>
        <div className="model">
          <Model />
        </div>
        <div className="feature-text">
          <h2>EXPERIENCE THE FUTURE OF GAMING</h2>
          <p>
            With our latest keyboards, you get the perfect combination of
            performance and comfort. Customize your gaming experience with ease
            and play like a pro.
          </p>
        </div>
        <div className="feature-pic">
          <img src="path_to_your_feature_image.png" alt="Feature Picture" />
        </div>
      </div>
    </main>
  );
}
