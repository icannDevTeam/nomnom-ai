import { useUser } from '../context/UserContext';

const ProfileTest = () => {
  const { user, logout, isDarkMode, toggleDarkMode } = useUser();

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold text-gray-900">Profile Page Test</h1>
      <p className="mt-4 text-gray-600">This is a test to see if the Profile page renders.</p>
      <div className="mt-8 p-4 bg-blue-100 rounded-lg">
        <p>Dark mode: {isDarkMode ? 'On' : 'Off'}</p>
        <button 
          onClick={toggleDarkMode}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Toggle Dark Mode
        </button>
      </div>
    </div>
  );
};

export default ProfileTest;