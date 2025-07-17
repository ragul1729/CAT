import { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const mockvideoList = [
  {
    id: 1,
    title: 'Machine Operation Basics',
    url: 'https://www.youtube.com/embed/NMVhSLtZQnQ'
  },
  {
    id: 2,
    title: 'Safety Guidelines for Operators',
    url: 'https://www.youtube.com/embed/ReMX0JUOMB8'
  },
  {
    id: 3,
    title: 'Advanced Excavator Techniques',
    url: 'https://www.youtube.com/embed/UbcWSUEkz1A'
  }
];


const TrainingHub = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const fetchVideos = async() => {
      try{
          const receivedVideos = await axios.get("http://localhost:3000/videos");
          console.log(receivedVideos["data"]);
          setVideoList(receivedVideos["data"]);
        }
        catch(error){
          console.log("error while fetching tasks", error);
        }
    }
    fetchVideos();
  }, []);

  const handleBooking = () => {
    if (name && selectedDate) {
      setConfirmation(`✅ Booking confirmed for ${name} on ${selectedDate.toDateString()}`);
      setName('');
      setSelectedDate(null);
      setShowBookingForm(false);
    } else {
      setConfirmation('⚠ Please enter your name and choose a date.');
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen space-y-10">
      <h2 className="text-3xl font-bold">📚 Operator Training Hub</h2>

      {/* Video List */}
      <div className="flex flex-col gap-8">
        {videoList.map(video => (
          <div key={video.id} className="bg-white p-6 rounded shadow space-y-3">
            <h3 className="text-xl font-semibold">{video.title}</h3>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-150 rounded"
                src={video.link}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>

      {/* Book Instructor Button */}
      {!showBookingForm && (
        <button
          onClick={() => setShowBookingForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          📅 Book Instructor
        </button>
      )}

      {/* Booking Form */}
      {showBookingForm && (
        <div className="bg-white p-6 rounded shadow max-w-md space-y-4">
          <h3 className="text-xl font-semibold">📅 Book Instructor Session</h3>
          <input
            type="text"
            placeholder="Your Name"
            className="border px-3 py-2 w-full rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            className="border px-3 py-2 w-full rounded"
            placeholderText="Select a date"
          />
          <button
            onClick={handleBooking}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Confirm Booking
          </button>
          {confirmation && <p className="text-sm text-green-700">{confirmation}</p>}
        </div>
      )}
    </div>
  );
};

export default TrainingHub;
