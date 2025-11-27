import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function TermsOfUseSettings() {
  const [termsOfUse, setTermsOfUse] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // React Quill modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  // React Quill formats
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet', 'indent',
    'align',
    'blockquote', 'code-block',
    'link', 'image', 'video'
  ];

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
        <div 
          className="bg-white/5 rounded-xl border border-white/10 p-4 lg:p-6 prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: termsOfUse }}
        />
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

          {/* React Quill Editor */}
          <div className="bg-white rounded-lg overflow-hidden border border-white/20">
            <ReactQuill
              value={termsOfUse}
              onChange={setTermsOfUse}
              modules={modules}
              formats={formats}
              theme="snow"
              style={{ 
                height: 'calc(100vh - 16rem)',
                backgroundColor: '#1f2937'
              }}
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
          </div>

          {/* Editor Tips */}
          <div className="mt-4 p-3 lg:p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <h4 className="text-blue-300 font-semibold mb-2 text-sm lg:text-base">Rich Text Editor Features</h4>
            <div className="text-blue-200 text-xs lg:text-sm">
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Text Formatting:</strong> Bold, Italic, Underline, Strikethrough</li>
                <li><strong>Headings:</strong> H1 to H6 for section titles</li>
                <li><strong>Lists:</strong> Bulleted and Numbered lists</li>
                <li><strong>Colors:</strong> Text and background colors</li>
                <li><strong>Alignment:</strong> Left, Center, Right, Justify</li>
                <li><strong>Blocks:</strong> Quotes and code blocks</li>
                <li><strong>Media:</strong> Add images and links</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}