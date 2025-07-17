import { useState } from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const TasktimePrediction = () => {
  const [formData, setFormData] = useState({
    Soil_Type: '',
    Excavation_Type: '',
    Volume_m3: '',
    Depth_m: '',
    Equipment_Type: '',
    Workers: '',
    Weather: '',
    Season: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);

    try {
      const response = await fetch('https://excavation-api.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          Volume_m3: parseFloat(formData.Volume_m3),
          Depth_m: parseFloat(formData.Depth_m),
          Workers: parseInt(formData.Workers)
        })
      });

      const result = await response.json();
      setPrediction(result.predicted_time_hr);
    } catch (error) {
      console.error('Prediction error:', error);
      setPrediction('❌ Error fetching prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto bg-gray-100">
        <Header />
        <main className="p-8">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">⏳ Task Time Estimation</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Soil Type */}
              <div>
                <label className="block font-semibold mb-1">Soil Type</label>
                <select
                  name="Soil_Type"
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={formData.Soil_Type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="loam">Loam</option>
                  <option value="gravel">Gravel</option>
                  <option value="rock">Rock</option>
                  <option value="clay">Clay</option>
                  <option value="sand">Sand</option>
                </select>
              </div>

              {/* Excavation Type */}
              <div>
                <label className="block font-semibold mb-1">Excavation Type</label>
                <select
                  name="Excavation_Type"
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={formData.Excavation_Type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Roadwork">Roadwork</option>
                  <option value="Foundation">Foundation</option>
                  <option value="Basement">Basement</option>
                  <option value="Trench">Trench</option>
                </select>
              </div>

              {/* Volume */}
              <div>
                <label className="block font-semibold mb-1">Volume (m³)</label>
                <input
                  type="number"
                  name="Volume_m3"
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={formData.Volume_m3}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Depth */}
              <div>
                <label className="block font-semibold mb-1">Depth (m)</label>
                <input
                  type="number"
                  name="Depth_m"
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={formData.Depth_m}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Equipment Type */}
              <div>
                <label className="block font-semibold mb-1">Equipment Type</label>
                <select
                  name="Equipment_Type"
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={formData.Equipment_Type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Bulldozer">Bulldozer</option>
                  <option value="Excavator">Excavator</option>
                  <option value="Backhoe">Backhoe</option>
                  <option value="Mini Excavator">Mini Excavator</option>
                </select>
              </div>

              {/* Workers */}
              <div>
                <label className="block font-semibold mb-1">Number of Workers</label>
                <input
                  type="number"
                  name="Workers"
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={formData.Workers}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Weather */}
              <div>
                <label className="block font-semibold mb-1">Weather</label>
                <select
                  name="Weather"
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={formData.Weather}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Rainy">Rainy</option>
                  <option value="Sunny">Sunny</option>
                  <option value="Cloudly">Cloudly</option>
                  <option value="Windy">Windy</option>
                </select>
              </div>

              {/* Season */}
              <div>
                <label className="block font-semibold mb-1">Season</label>
                <select
                  name="Season"
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={formData.Season}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Summer">Summer</option>
                  <option value="Winter">Winter</option>
                  <option value="Spring">Spring</option>
                  <option value="Autumn">Autumn</option>
                </select>
              </div>
            </form>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md"
                disabled={loading}
              >
                {loading ? '⏳ Predicting...' : '🔍 Predict Time'}
              </button>
            </div>

            {/* Result */}
            {prediction !== null && (
              <div className="mt-6 text-xl text-green-700 font-bold">
                ✅ Estimated Time: {prediction} hours
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TasktimePrediction;
