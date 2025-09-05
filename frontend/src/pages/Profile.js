import React from 'react';

const Profile = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences.</p>
      </div>

      <div className="card">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Profile Management Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            User profile management and account settings will be available soon.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Account Settings</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Personal information</li>
                <li>• Contact details</li>
                <li>• Security settings</li>
                <li>• Notification preferences</li>
              </ul>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-3">Investment Profile</h3>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• Risk tolerance</li>
                <li>• Investment goals</li>
                <li>• Financial constraints</li>
                <li>• Portfolio preferences</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;







