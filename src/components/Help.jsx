import React from "react";

const Help = () => {
  return (
    <div className="min-h-screen bg-[#242424] text-white flex flex-col items-center py-8 px-4">
      {/* Container for the entire help center content */}
      <div className="w-full max-w-4xl">
        {/* Main heading for the help center */}
        <h1 className="text-4xl font-bold text-center mb-8">Help Center</h1>
        {/* Subheading to guide users */}
        <p className="text-center mb-12 text-gray-300">
          How can we assist you today? Browse through the topics below to find
          answers to common questions.
        </p>

        {/* Grid layout for help topics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Individual help topic cards */}
          <div className="bg-[#121212] p-6 rounded-lg cursor-pointer">
            <h2 className="text-2xl font-semibold mb-4">Account & Profile</h2>
            <p className="text-gray-400">
              Manage your account settings and update your profile information.
            </p>
          </div>

          <div className="bg-[#121212] p-6 rounded-lg cursor-pointer">
            <h2 className="text-2xl font-semibold mb-4">
              Subscription & Payments
            </h2>
            <p className="text-gray-400">
              Get help with billing, payments, and subscription options.
            </p>
          </div>

          <div className="bg-[#121212] p-6 rounded-lg cursor-pointer">
            <h2 className="text-2xl font-semibold mb-4">Playlist Management</h2>
            <p className="text-gray-400">
              Learn how to create, edit, and share your playlists.
            </p>
          </div>

          <div className="bg-[#121212] p-6 rounded-lg cursor-pointer">
            <h2 className="text-2xl font-semibold mb-4">Technical Issues</h2>
            <p className="text-gray-400">
              Troubleshoot common technical problems and get technical support.
            </p>
          </div>

          <div className="bg-[#121212] p-6 rounded-lg cursor-pointer">
            <h2 className="text-2xl font-semibold mb-4">Privacy & Security</h2>
            <p className="text-gray-400">
              Understand how we protect your data and ensure your privacy.
            </p>
          </div>

          <div className="bg-[#121212] p-6 rounded-lg cursor-pointer">
            <h2 className="text-2xl font-semibold mb-4">Music & Content</h2>
            <p className="text-gray-400">
              Learn more about our music library and content policies.
            </p>
          </div>
        </div>

        {/* Section for additional support contact */}
        <div className="mt-16 text-center">
          <p className="text-gray-400">Can't find what you're looking for?</p>
          <p className="text-green-400 font-bold">Contact our support team</p>
        </div>
      </div>
    </div>
  );
};

export default Help;
