import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function PrivacyPolicySettings() {
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  console.log(privacyPolicy);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const editorRef = useRef(null);

  const handleSave = async () => {
    setSaving(true);
    
    // Get HTML content directly from editor
    const htmlContent = privacyPolicy;
    
    // Simulate API call to save HTML content
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Save to localStorage
    localStorage.setItem('privacyPolicy', htmlContent);
    
    setSaving(false);
    setIsEditing(false);
    
    alert('Privacy Policy saved successfully!');
  };

  // Load saved content when component mounts
  useState(() => {
    const saved = localStorage.getItem('privacyPolicy');
    if (saved) {
      setPrivacyPolicy(saved);
    }
  }, []);

  return (
      <main className="flex-1  p-6 relative">
        {/* Header + Create Button */}
        {!isEditing && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-indigo-300 flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              Privacy Policy
            </h2>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              {privacyPolicy ? 'Edit' : 'Add'}
            </button>
          </div>
        )}

        {/* Display area when not editing */}
        {!isEditing && !privacyPolicy && (
          <div className="text-center p-12 bg-white/5 rounded-xl border border-white/10">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No Privacy Policy Added</h3>
            <p className="text-gray-400">Click the "Add" button to create your privacy policy</p>
          </div>
        )}

        {/* Display saved HTML content */}
        {!isEditing && privacyPolicy && (
          <div className="bg-white/5 rounded-xl border border-white/10 p-6">
            <div 
              className="text-gray-300 prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: privacyPolicy }} 
            />
          </div>
        )}

        {/* Full-page editing area with TinyMCE Editor */}
        {isEditing && (
          <div className="fixed top-0 left-72 w-[calc(100%-18rem)] h-screen bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl p-6 overflow-auto z-50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-indigo-300 flex items-center gap-2">
                <span className="text-2xl">🔒</span>
                Privacy Policy Editor
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
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

            {/* TinyMCE Editor */}
            <div className="bg-white rounded-lg overflow-hidden border border-white/20">
              <Editor
                apiKey="hem9iglwyjhuhcw8kqok797xtf1ao8ehmuw2ycjx6ygk8umv"
                onInit={(evt, editor) => editorRef.current = editor}
                value={privacyPolicy}
                onEditorChange={(newValue) => setPrivacyPolicy(newValue)}
                init={{
                  height: 'calc(100vh - 12rem)',
                  menubar: true,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | bold italic forecolor | ' +
                    'alignleft aligncenter alignright alignjustify | ' +
                    'bullist numlist outdent indent | removeformat | help',
                  content_style: `
                    body { 
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                      font-size: 14px; 
                      line-height: 1.6;
                      color: #333;
                    }
                    h1, h2, h3 { 
                      color: #1e293b;
                      margin-top: 1em;
                      margin-bottom: 0.5em;
                    }
                    p { 
                      margin-bottom: 1em;
                    }
                    ul, ol {
                      margin-bottom: 1em;
                    }
                  `,
                  skin: 'oxide',
                  content_css: 'default',
                }}
              />
            </div>

            {/* Editor Tips */}
            <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <h4 className="text-blue-300 font-semibold mb-2">TinyMCE Editor Features</h4>
              <div className="text-blue-200 text-sm">
                Use the toolbar to format text, add headings, create lists, insert links, and more.
                Full-featured WYSIWYG editor with professional tools.
              </div>
            </div>
          </div>
        )}
      </main>

  );
}