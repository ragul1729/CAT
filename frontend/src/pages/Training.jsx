import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import TrainingHub from '../Components/TrainingHub'; // Adjust path as needed

const Training = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <main className="p-6 bg-gray-100">
          <TrainingHub />
        </main>
      </div>
    </div>
  );
};

export default Training;
