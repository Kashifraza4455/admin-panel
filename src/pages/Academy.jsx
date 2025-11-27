import React, { useState, useEffect, useRef } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Media() {
  const [activeTab, setActiveTab] = useState("blogs");

  const [mediaData, setMediaData] = useState({
    blogs: [],
    audiobooks: [],
    ebooks: [],
  });

  const [newItem, setNewItem] = useState({ 
    image: "", 
    description: "",
    author: ""
  });
  
  const [editIndex, setEditIndex] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const isInitialLoad = useRef(true);

  // File input references
  const audioImageInputRef = useRef(null);
  const ebookImageInputRef = useRef(null);
  const audioFileInputRef = useRef(null);
  const ebookFileInputRef = useRef(null);

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

  // Load from localStorage
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("mediaData");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setMediaData({
          blogs: parsed.blogs || [],
          audiobooks: parsed.audiobooks || [],
          ebooks: parsed.ebooks || [],
        });
      }
    } catch (error) {
      console.error("❌ Error loading localStorage:", error);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    try {
      localStorage.setItem("mediaData", JSON.stringify(mediaData));
    } catch (error) {
      console.error("❌ Error saving localStorage:", error);
    }
  }, [mediaData]);

  // Handle IMAGE upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, GIF, etc.)');
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      setNewItem(prev => ({
        ...prev,
        image: e.target.result
      }));
      
      setIsUploading(false);
    };

    reader.onerror = () => {
      alert('Error reading file');
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  // Handle FILE upload (for audio/ebook files)
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsFileUploading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      setNewItem(prev => ({
        ...prev,
        fileData: e.target.result,
        fileName: file.name,
        fileType: file.type
      }));
      
      setIsFileUploading(false);
    };

    reader.onerror = () => {
      alert('Error reading file');
      setIsFileUploading(false);
    };

    reader.readAsDataURL(file);
  };

  // Trigger image input click
  const handleImageUploadClick = () => {
    if (activeTab === "audiobooks") {
      audioImageInputRef.current?.click();
    } else if (activeTab === "ebooks") {
      ebookImageInputRef.current?.click();
    }
  };

  // Trigger file input click
  const handleFileUploadClick = () => {
    if (activeTab === "audiobooks") {
      audioFileInputRef.current?.click();
    } else if (activeTab === "ebooks") {
      ebookFileInputRef.current?.click();
    }
  };

  // Handle React Quill editor change for description
  const handleDescriptionChange = (content) => {
    setNewItem(prev => ({
      ...prev,
      description: content
    }));
  };

  // Handle React Quill editor change for author
  const handleAuthorChange = (content) => {
    setNewItem(prev => ({
      ...prev,
      author: content
    }));
  };

  const handleAddOrUpdate = () => {
    if (activeTab === "blogs") {
      if (!newItem.image.trim() || !newItem.description.trim() || !newItem.author.trim()) {
        alert("Please fill all fields!");
        return;
      }
    } else {
      if (!newItem.title?.trim() || !newItem.image.trim() || !newItem.fileData) {
        alert("Please fill all fields and upload a file!");
        return;
      }
    }

    setMediaData((prev) => {
      const updated = { ...prev };
      if (editIndex !== null) {
        updated[activeTab][editIndex] = newItem;
      } else {
        updated[activeTab] = [...prev[activeTab], newItem];
      }
      return updated;
    });

    // Reset form based on active tab
    if (activeTab === "blogs") {
      setNewItem({ 
        image: "", 
        description: "",
        author: ""
      });
    } else {
      setNewItem({ 
        title: "", 
        image: "",
        fileData: null,
        fileName: "",
        fileType: ""
      });
    }
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const itemToEdit = mediaData[activeTab][index];
    setNewItem(itemToEdit);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    // Reset form based on active tab
    if (activeTab === "blogs") {
      setNewItem({ 
        image: "", 
        description: "",
        author: ""
      });
    } else {
      setNewItem({ 
        title: "", 
        image: "",
        fileData: null,
        fileName: "",
        fileType: ""
      });
    }
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setMediaData((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab].filter((_, i) => i !== index),
      }));
    }
  };

  // Reset form based on active tab
  const resetFormForTab = () => {
    if (activeTab === "blogs") {
      setNewItem({ 
        image: "", 
        description: "",
        author: ""
      });
    } else {
      setNewItem({ 
        title: "", 
        image: "",
        fileData: null,
        fileName: "",
        fileType: ""
      });
    }
  };

  return (
    <div className="flex min-h-screen">      
      <main className="flex-1 lg:ml-50 p-4 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl lg:text-4xl font-bold mb-2 text-white">
            Content Management
          </h2>
          <p className="text-white/70 mb-6 lg:mb-8 text-base lg:text-lg">
            Manage your blogs, audiobooks, and e-books collection
          </p>

          {/* Tabs - Responsive */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 lg:mb-8">
            {[
              { id: "blogs", icon: "📝", label: "Blogs" },
              { id: "audiobooks", icon: "🎧", label: "Audio Books" },
              { id: "ebooks", icon: "📖", label: "E-Books" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setEditIndex(null);
                  resetFormForTab();
                }}
                className={`cursor-pointer flex items-center justify-center sm:justify-start gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl lg:rounded-2xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                  activeTab === tab.id
                    ? tab.id === "blogs" 
                      ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                      : tab.id === "audiobooks"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                      : "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25"
                    : "bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-sm border border-white/10"
                }`}
              >
                <span className="text-base sm:text-lg">{tab.icon}</span> 
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Add / Edit Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl border border-white/20 shadow-xl p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8">
            <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 text-white">
              {editIndex !== null
                ? `Edit ${activeTab.slice(0, -1)}`
                : `Add New ${
                    activeTab === "blogs"
                      ? "Blog Post"
                      : activeTab === "audiobooks"
                      ? "Audio Book"
                      : "E-Book"
                  }`}
            </h3>

            {/* Blog Specific Form - WITH REACT QUILL EDITORS */}
            {activeTab === "blogs" ? (
              <div className="grid grid-cols-1 gap-4 lg:gap-6 mb-4 lg:mb-6">
                <div>
                  <label className="block text-white/80 mb-2 font-medium text-sm lg:text-base">
                    Image URL *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter blog image URL"
                    value={newItem.image}
                    onChange={(e) =>
                      setNewItem({ ...newItem, image: e.target.value })
                    }
                    className="w-full border border-white/20 bg-white/5 text-white rounded-lg lg:rounded-xl p-3 lg:p-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-white/40 text-sm lg:text-base"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2 font-medium text-sm lg:text-base">
                    Description *
                  </label>
                  <div className="border border-white/20 rounded-lg lg:rounded-xl overflow-hidden bg-white">
                    <ReactQuill
                      value={newItem.description}
                      onChange={handleDescriptionChange}
                      modules={modules}
                      formats={formats}
                      theme="snow"
                      style={{ 
                        height: window.innerWidth < 768 ? 150 : 200,
                        backgroundColor: '#1f2937'
                      }}
                      placeholder="Write your blog description here..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 mb-2 font-medium text-sm lg:text-base">
                    Author *
                  </label>
                  <div className="border border-white/20 rounded-lg lg:rounded-xl overflow-hidden bg-white">
                    <ReactQuill
                      value={newItem.author}
                      onChange={handleAuthorChange}
                      modules={{
                        ...modules,
                        toolbar: [
                          ['bold', 'italic', 'underline'],
                          [{ 'color': [] }, { 'background': [] }],
                          ['clean']
                        ]
                      }}
                      formats={['bold', 'italic', 'underline', 'color', 'background']}
                      theme="snow"
                      style={{ 
                        height: window.innerWidth < 768 ? 100 : 120,
                        backgroundColor: '#1f2937'
                      }}
                      placeholder="Enter author name and details..."
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Audio Books & E-Books Form - WITH FILE UPLOAD INSTEAD OF LINK */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-4 lg:mb-6">
                <div className="md:col-span-2 lg:col-span-1">
                  <label className="block text-white/80 mb-2 font-medium text-sm lg:text-base">
                    Title *
                  </label>
                  <input
                    type="text"
                    placeholder={`Enter ${activeTab.slice(0, -1)} title`}
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    className="w-full border border-white/20 bg-white/5 text-white rounded-lg lg:rounded-xl p-3 lg:p-4 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-white/40 text-sm lg:text-base"
                  />
                </div>
                
                {/* IMAGE UPLOAD OPTION */}
                <div>
                  <label className="block text-white/80 mb-2 font-medium text-sm lg:text-base">
                    Cover Image *
                  </label>
                  
                  {/* Hidden image file input */}
                  <input
                    type="file"
                    ref={activeTab === "audiobooks" ? audioImageInputRef : ebookImageInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  <button
                    type="button"
                    onClick={handleImageUploadClick}
                    disabled={isUploading}
                    className={`cursor-pointer flex items-center justify-center gap-2 w-full border border-white/20 bg-white/5 text-white rounded-lg lg:rounded-xl p-3 lg:p-4 transition-all duration-300 hover:bg-white/10 text-sm lg:text-base ${
                      activeTab === "audiobooks" 
                        ? "focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" 
                        : "focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    }`}
                  >
                    {isUploading ? (
                      <>
                        <div className={`animate-spin rounded-full h-4 w-4 lg:h-5 lg:w-5 border-b-2 ${
                          activeTab === "audiobooks" ? "border-cyan-300" : "border-green-300"
                        }`}></div>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-base lg:text-lg">🖼️</span>
                        <span>Upload Image</span>
                      </>
                    )}
                  </button>

                  {/* Image preview */}
                  {newItem.image && (
                    <div className="mt-2">
                      <div className="text-green-400 text-xs lg:text-sm mb-1">✅ Image Selected</div>
                      <div className="w-16 h-16 lg:w-20 lg:h-20 border border-white/20 rounded-lg overflow-hidden">
                        <img 
                          src={newItem.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* FILE UPLOAD OPTION INSTEAD OF LINK FIELD */}
                <div>
                  <label className="block text-white/80 mb-2 font-medium text-sm lg:text-base">
                    Choose File *
                  </label>
                  
                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={activeTab === "audiobooks" ? audioFileInputRef : ebookFileInputRef}
                    onChange={handleFileUpload}
                    accept={activeTab === "audiobooks" ? "audio/*" : "application/pdf,application/epub+zip,.pdf,.epub"}
                    className="hidden"
                  />
                  
                  <button
                    type="button"
                    onClick={handleFileUploadClick}
                    disabled={isFileUploading}
                    className={`cursor-pointer flex items-center justify-center gap-2 w-full border border-white/20 bg-white/5 text-white rounded-lg lg:rounded-xl p-3 lg:p-4 transition-all duration-300 hover:bg-white/10 text-sm lg:text-base ${
                      activeTab === "audiobooks" 
                        ? "focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" 
                        : "focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    }`}
                  >
                    {isFileUploading ? (
                      <>
                        <div className={`animate-spin rounded-full h-4 w-4 lg:h-5 lg:w-5 border-b-2 ${
                          activeTab === "audiobooks" ? "border-cyan-300" : "border-green-300"
                        }`}></div>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-base lg:text-lg">📁</span>
                        <span>Choose File</span>
                      </>
                    )}
                  </button>

                  {/* File name display */}
                  {newItem.fileName && (
                    <div className="mt-2 text-green-400 text-xs lg:text-sm truncate">
                      ✅ {newItem.fileName}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <button
                onClick={handleAddOrUpdate}
                className={`cursor-pointer flex items-center justify-center gap-2 lg:gap-3 px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 text-sm lg:text-base ${
                  activeTab === "blogs" 
                    ? "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                    : activeTab === "audiobooks"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                    : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                }`}
              >
                <span>{editIndex !== null ? "💾" : "➕"}</span>
                {editIndex !== null ? "Update" : "Add Item"}
              </button>

              {editIndex !== null && (
                <button
                  onClick={handleCancelEdit}
                  className="cursor-pointer flex items-center justify-center gap-2 lg:gap-3 bg-white/10 hover:bg-white/20 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold border border-white/20 transition-all duration-300 text-sm lg:text-base"
                >
                  <span>❌</span> Cancel
                </button>
              )}
            </div>
          </div>

          {/* Items List */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl border border-white/20 shadow-xl p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 lg:mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white capitalize">
                {activeTab === "blogs" ? "Blog Posts" : activeTab} Collection
              </h3>
              <span className="text-white/60 text-sm lg:text-base">
                {mediaData[activeTab].length} {activeTab === "blogs" ? "posts" : "items"}
              </span>
            </div>

            {mediaData[activeTab].length === 0 ? (
              <div className="text-center py-8 lg:py-12">
                <span className="text-3xl lg:text-4xl">
                  {activeTab === "blogs" ? "📝" : activeTab === "audiobooks" ? "🎧" : "📖"}
                </span>
                <p className="text-white/60 text-base lg:text-lg mt-3 lg:mt-4">
                  {activeTab === "blogs" ? "No blog posts added yet." : "No items added yet."}
                </p>
                <p className="text-white/40 text-xs lg:text-sm mt-1 lg:mt-2">
                  Add your first item using the form above
                </p>
              </div>
            ) : (
              <div className={`grid gap-4 lg:gap-6 ${
                activeTab === "blogs" 
                  ? "grid-cols-1 lg:grid-cols-2" 
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}>
                {mediaData[activeTab].map((item, index) => (
                  <div
                    key={index}
                    className={`rounded-xl lg:rounded-2xl p-4 lg:p-6 border transition-all duration-300 hover:shadow-lg ${
                      activeTab === "blogs"
                        ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-500/40 hover:shadow-purple-500/10"
                        : activeTab === "audiobooks"
                        ? "bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-cyan-500/10"
                        : "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-500/40 hover:shadow-green-500/10"
                    }`}
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={activeTab === "blogs" ? "Blog image" : item.title}
                        className="w-full h-32 sm:h-40 lg:h-48 object-cover rounded-lg lg:rounded-xl mb-3 lg:mb-4 border border-white/10"
                      />
                    )}
                    
                    {/* Blog Specific Content */}
                    {activeTab === "blogs" && (
                      <>
                        <div 
                          className="text-white/70 text-xs lg:text-sm mb-2 lg:mb-3 line-clamp-3 prose prose-invert max-w-none"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                        <div 
                          className="text-white/60 text-xs lg:text-sm"
                          dangerouslySetInnerHTML={{ __html: `By ${item.author}` }}
                        />
                      </>
                    )}

                    {/* Audio Books & E-Books Content */}
                    {activeTab !== "blogs" && (
                      <>
                        <h4 className="font-bold text-white text-lg lg:text-xl mb-1 lg:mb-2 line-clamp-2">
                          {item.title}
                        </h4>
                        <div className={`flex items-center gap-2 text-xs lg:text-sm font-medium ${
                          activeTab === "audiobooks" ? "text-cyan-400" : "text-green-400"
                        }`}>
                          <span>
                            {activeTab === "audiobooks" ? "🎵" : "📚"}
                          </span>
                          <span className="truncate">
                            {item.fileName || "Uploaded File"}
                          </span>
                        </div>
                      </>
                    )}

                    <div className="flex gap-2 lg:gap-3 mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-white/10">
                      <button
                        onClick={() => handleEdit(index)}
                        className="cursor-pointer flex items-center gap-1 lg:gap-2 text-yellow-400 hover:text-yellow-300 text-xs lg:text-sm font-medium transition-colors"
                      >
                        <span>✏️</span> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="cursor-pointer flex items-center gap-1 lg:gap-2 text-red-400 hover:text-red-300 text-xs lg:text-sm font-medium transition-colors"
                      >
                        <span>🗑️</span> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}