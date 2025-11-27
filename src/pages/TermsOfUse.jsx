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
    <main className="flex-1 p-4 lg:p-6 relative">
      {/* Header + Create Button */}
      {!isEditing && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl lg:text-2xl font-semibold text-indigo-300 flex items-center gap-2">
            <span className="text-xl lg:text-2xl">📝</span>
            Terms of Use
          </h2>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm lg:text-base w-full sm:w-auto"
          >
            {termsOfUse ? 'Edit' : 'Add'}
          </button>
        </div>
      )}

      {/* Display area when not editing */}
      {!isEditing && !termsOfUse && (
        <div className="text-center p-6 lg:p-12 bg-white/5 rounded-xl border border-white/10">
          <div className="text-4xl lg:text-6xl mb-3 lg:mb-4">⚖️</div>
          <h3 className="text-lg lg:text-xl font-semibold text-gray-300 mb-2">No Terms of Use Added</h3>
          <p className="text-gray-400 text-sm lg:text-base">Click the "{termsOfUse ? 'Edit' : 'Add'}" button to create your terms of use</p>
        </div>
      )}

      {/* Display saved content */}
      {!isEditing && termsOfUse && (
        <div className="bg-white/5 rounded-xl border border-white/10 p-4 lg:p-6">
          <pre className="text-gray-300 whitespace-pre-wrap text-sm lg:text-base font-sans leading-relaxed">
            {termsOfUse}
          </pre>
        </div>
      )}

      {/* Full-page editing area */}
      {isEditing && (
        <div className="fixed inset-0 lg:inset-0 lg:left-72 w-full lg:w-[calc(100%-18rem)] h-screen bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl p-4 lg:p-6 overflow-auto z-50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 lg:mb-6">
            <h2 className="text-xl lg:text-2xl font-semibold text-indigo-300 flex items-center gap-2">
              <span className="text-xl lg:text-2xl">📝</span>
              Terms of Use Editor
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm lg:text-base order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className={`flex items-center justify-center gap-2 px-4 lg:px-5 py-2 rounded-lg text-white font-semibold transition-all text-sm lg:text-base ${
                  saving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } order-1 sm:order-2`}
              >
                <span className="text-base">💾</span>
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Textarea Editor */}
          <textarea
            value={termsOfUse}
            onChange={(e) => setTermsOfUse(e.target.value)}
            className="w-full h-[calc(100vh-12rem)] lg:h-[calc(100vh-12rem)] border border-white/20 rounded-lg lg:rounded-xl p-4 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none text-sm lg:text-base font-sans leading-relaxed"
            placeholder="Write your Terms of Use here...

You can include sections like:
• Acceptance of Terms
• User Responsibilities
• Privacy Policy
• Intellectual Property
• Termination
• Limitation of Liability
• Governing Law

Start typing your terms of use content..."
          />

          {/* Editor Tips */}
          <div className="mt-4 p-3 lg:p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <h4 className="text-blue-300 font-semibold mb-2 text-sm lg:text-base">Writing Tips</h4>
            <div className="text-blue-200 text-xs lg:text-sm">
              <ul className="list-disc list-inside space-y-1">
                <li>Use clear and simple language</li>
                <li>Break content into sections with headings</li>
                <li>Include important legal clauses</li>
                <li>Specify user responsibilities and rights</li>
                <li>Mention privacy and data usage policies</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}