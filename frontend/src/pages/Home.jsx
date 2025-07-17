import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

const Home = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <Header />

        <section className="max-w-5xl mx-auto px-6 py-10 space-y-10">
          {/* Welcome Block */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-yellow-600 drop-shadow-md mb-3">
              Welcome to Smart Operator Assistant
            </h1>
            <p className="text-lg text-gray-700">
              Empowering operators with smart insights, safety alerts, and efficient machine handling — specially designed for Caterpillar machinery.
            </p>
          </div>

          {/* About CAT */}
          <div className="bg-white border-l-8 border-yellow-500 rounded-2xl shadow-lg p-6 transition duration-300 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">🚜 About Caterpillar (CAT)</h2>
            <p className="text-gray-600 leading-relaxed">
              Caterpillar Inc. (CAT) is a global leader in heavy equipment manufacturing including construction, mining, and energy systems.
              Known for unmatched reliability, innovation, and global presence, CAT machines play a critical role in infrastructure development worldwide.
            </p>
          </div>

          {/* About Smart Assistant */}
          <div className="bg-white border-l-8 border-blue-500 rounded-2xl shadow-lg p-6 transition duration-300 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">🤖 About Smart Operator Assistant</h2>
            <p className="text-gray-600 leading-relaxed">
              The Smart Operator Assistant is an intelligent tool designed to assist machine operators by enhancing their daily workflows,
              safety adherence, and machine understanding through a user-friendly interface.
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
              <li><span className="font-semibold">🔐 Secure Login</span> – Tracks sessions and authenticates operators</li>
              <li><span className="font-semibold">📋 Daily Task Dashboard</span> – Shows assigned machines and duties</li>
              <li><span className="font-semibold">🚨 Real-Time Safety Alerts</span> – Includes seatbelt status, proximity, fuel level</li>
              <li><span className="font-semibold">🎓 Training Hub</span> – Provides learning videos & instructor booking</li>
              <li><span className="font-semibold">⏱ AI Task Time Prediction</span> – Estimates time using smart models</li>
            </ul>

            <p className="mt-4 text-gray-600">
              Designed to make operations safer and more efficient, this assistant is ideal for operators of all skill levels.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
