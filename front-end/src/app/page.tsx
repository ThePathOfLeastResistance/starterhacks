import CameraComponent from "@/components/camera";
import Model from "@/components/model";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <Model />
          </div>
          <div className="w-full md:w-1/2">
            <CameraComponent />
          </div>
        </div>
      </div>
    </main>
  );
}
