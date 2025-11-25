import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsers } from '../context/UsersContext';

const PrivacyPolicy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users } = useUsers();
  
  const user = users.find(u => u.id === parseInt(id));

  const handleBackClick = () => {
    navigate(`/users/${id}`);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-semibold text-lg">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Privacy Policy
            </h1>
            <p className="text-white/80 mt-2 text-lg">
              For {user.name} • Data protection and privacy information
            </p>
          </div>
          <button
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition border border-white/20"
          >
            ← Back
          </button>
        </div>

        {/* Privacy Policy Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl p-8">
          <div className="prose prose-invert max-w-none">
            {/* Introduction */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">🔒 Data Protection Policy</h2>
              <p className="text-white/80 leading-relaxed">
                This privacy policy outlines how we collect, use, and protect your personal information 
                in accordance with data protection regulations. Your privacy and data security are our 
                top priorities.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-3">📋 Information We Collect</h3>
              <ul className="text-white/80 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span><strong>Personal Information:</strong> Name, email address, contact details</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span><strong>Health Data:</strong> Recovery progress, activities, wellness metrics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span><strong>Usage Data:</strong> App interactions, feature usage, session data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span><strong>Technical Data:</strong> Device information, IP address, browser type</span>
                </li>
              </ul>
            </div>

            {/* How We Use Your Data */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-3">🎯 How We Use Your Data</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Personalized Care</h4>
                  <p className="text-white/70 text-sm">Tailor recovery programs and wellness activities to your specific needs</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Progress Tracking</h4>
                  <p className="text-white/70 text-sm">Monitor and analyze your recovery journey and achievements</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Communication</h4>
                  <p className="text-white/70 text-sm">Send important updates, reminders, and wellness tips</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Service Improvement</h4>
                  <p className="text-white/70 text-sm">Enhance our platform and develop new features</p>
                </div>
              </div>
            </div>

            {/* Data Protection Measures */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-3">🛡️ Data Protection Measures</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400">🔐</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Encryption</h4>
                    <p className="text-white/70">All sensitive data is encrypted using industry-standard AES-256 encryption</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-400">👥</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Access Control</h4>
                    <p className="text-white/70">Strict role-based access controls ensure only authorized personnel can view your data</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-400">💾</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Secure Storage</h4>
                    <p className="text-white/70">Data stored in secure, compliant cloud infrastructure with regular backups</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-3">📜 Your Data Rights</h3>
              <div className="bg-white/5 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Right to Access</h4>
                    <p className="text-white/70 text-sm">View all personal data we hold about you</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Right to Correction</h4>
                    <p className="text-white/70 text-sm">Request corrections to inaccurate information</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Right to Deletion</h4>
                    <p className="text-white/70 text-sm">Request deletion of your personal data</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Right to Portability</h4>
                    <p className="text-white/70 text-sm">Receive your data in a portable format</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-t border-white/20 pt-6">
              <h3 className="text-xl font-bold text-white mb-3">📞 Contact & Support</h3>
              <div className="text-white/80 space-y-2">
                <p>For privacy-related inquiries or to exercise your data rights, contact our Data Protection Officer:</p>
                <p><strong>Email:</strong> privacy@wellnessapp.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-HELP</p>
                <p><strong>Response Time:</strong> Within 48 hours for all privacy-related requests</p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="mt-8 p-4 bg-white/5 rounded-lg">
              <p className="text-white/60 text-sm text-center">
                <strong>Last Updated:</strong> January 15, 2024<br />
                This policy is reviewed annually and updated as needed to comply with regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;