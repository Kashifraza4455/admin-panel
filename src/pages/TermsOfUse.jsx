import { useState } from "react";

export default function TermsOfUseSettings() {
  const [termsOfUse, setTermsOfUse] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setIsEditing(false);
  };

  return (
      <main className="flex-1  p-6 relative">
        {/* Header + Create Button */}
        {!isEditing && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-indigo-300 flex items-center gap-2">
              <span className="text-2xl">📝</span>
              Terms of Use
            </h2>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Add
            </button>
          </div>
        )}

        {/* Display area when not editing */}
        {!isEditing && !termsOfUse && (
          <div className="text-center p-12 bg-white/5 rounded-xl border border-white/10">
            <div className="text-6xl mb-4">⚖️</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No Terms of Use Added</h3>
            <p className="text-gray-400">Click the "Add" button to create your terms of use</p>
          </div>
        )}

        {!isEditing && termsOfUse && (
          <div className="bg-white/5 rounded-xl border border-white/10 p-6">
            <pre className="text-gray-300 whitespace-pre-wrap">{termsOfUse}</pre>
          </div>
        )}

        {/* Full-page editing area */}
        {isEditing && (
          <div className="fixed top-0 left-72 w-[calc(100%-18rem)] h-screen bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl p-6 overflow-auto z-50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-indigo-300 flex items-center gap-2">
                <span className="text-2xl">📝</span>
                Terms of Use
              </h2>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg text-white font-semibold transition-all ${
                    saving
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  <span className="text-lg">💾</span>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>

            <textarea
              value={termsOfUse}
              onChange={(e) => setTermsOfUse(e.target.value)}
              className="w-full h-[calc(100vh-12rem)] border border-white/20 rounded-xl p-4 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              placeholder="Write your Terms of Use here..."
            />
          </div>
        )}
      </main>

  );
}