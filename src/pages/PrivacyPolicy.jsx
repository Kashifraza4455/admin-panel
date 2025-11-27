import { useState, useRef, useEffect } from "react";
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
  useEffect(() => {
    const saved = localStorage.getItem('privacyPolicy');
    if (saved) {
      setPrivacyPolicy(saved);
    }
  }, []);

  return (
    <main className="flex-1 p-4 lg:p-6 relative">
      {/* Header + Create Button */}
      {!isEditing && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl lg:text-2xl font-semibold text-indigo-300 flex items-center gap-2">
            <span className="text-xl lg:text-2xl">🔒</span>
            Privacy Policy
          </h2>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm lg:text-base w-full sm:w-auto"
          >
            {privacyPolicy ? 'Edit' : 'Add'}
          </button>
        </div>
      )}

      {/* Display area when not editing */}
      {!isEditing && !privacyPolicy && (
        <div className="text-center p-6 lg:p-12 bg-white/5 rounded-xl border border-white/10">
          <div className="text-4xl lg:text-6xl mb-3 lg:mb-4">📝</div>
          <h3 className="text-lg lg:text-xl font-semibold text-gray-300 mb-2">No Privacy Policy Added</h3>
          <p className="text-gray-400 text-sm lg:text-base">Click the "Add" button to create your privacy policy</p>
        </div>
      )}

      {/* Display saved HTML content */}
      {!isEditing && privacyPolicy && (
        <div className="bg-white/5 rounded-xl border border-white/10 p-4 lg:p-6">
          <div 
            className="text-gray-300 prose prose-invert max-w-none text-sm lg:text-base"
            dangerouslySetInnerHTML={{ __html: privacyPolicy }} 
          />
        </div>
      )}

      {/* Full-page editing area with TinyMCE Editor */}
      {isEditing && (
        <div className="fixed inset-0 lg:inset-0 lg:left-72 w-full lg:w-[calc(100%-18rem)] h-screen bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl p-4 lg:p-6 overflow-auto z-50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 lg:mb-6">
            <h2 className="text-xl lg:text-2xl font-semibold text-indigo-300 flex items-center gap-2">
              <span className="text-xl lg:text-2xl">🔒</span>
              Privacy Policy Editor
            </h2>
            <div className="flex flex-col sm:flex-row gap-2 lg:gap-3 w-full sm:w-auto">
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

          {/* TinyMCE Editor */}
          <div className="bg-white rounded-lg overflow-hidden border border-white/20">
            <Editor
              apiKey="hem9iglwyjhuhcw8kqok797xtf1ao8ehmuw2ycjx6ygk8umv"
              onInit={(evt, editor) => editorRef.current = editor}
              value={privacyPolicy}
              onEditorChange={(newValue) => setPrivacyPolicy(newValue)}
              init={{
                height: window.innerWidth < 1024 ? 'calc(100vh - 16rem)' : 'calc(100vh - 12rem)',
                menubar: window.innerWidth > 768, // Hide menubar on mobile for more space
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: window.innerWidth < 768 
                  ? 'undo redo | bold italic | bullist numlist | removeformat' // Simplified toolbar for mobile
                  : 'undo redo | blocks | bold italic forecolor | ' +
                    'alignleft aligncenter alignright alignjustify | ' +
                    'bullist numlist outdent indent | removeformat | help',
                content_style: `
                  body { 
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                    font-size: ${window.innerWidth < 768 ? '16px' : '14px'}; 
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
                mobile: {
                  theme: 'mobile',
                  toolbar: ['undo', 'redo', 'bold', 'italic', 'bullist', 'numlist']
                },
                branding: false,
                statusbar: window.innerWidth > 768,
                resize: window.innerWidth > 768
              }}
            />
          </div>

          {/* Editor Tips */}
          <div className="mt-4 p-3 lg:p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <h4 className="text-blue-300 font-semibold mb-2 text-sm lg:text-base">TinyMCE Editor Features</h4>
            <div className="text-blue-200 text-xs lg:text-sm">
              Use the toolbar to format text, add headings, create lists, insert links, and more.
              {window.innerWidth < 768 && " On mobile, use the simplified toolbar for essential formatting."}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}