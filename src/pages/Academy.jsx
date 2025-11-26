import React, { useState, useEffect, useRef } from "react";

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
      <main className="flex-1 ml-50 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-2 text-white">
            Content Management
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Manage your blogs, audiobooks, and e-books collection
          </p>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
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
                className={`cursor-pointer flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? tab.id === "blogs" 
                      ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                      : tab.id === "audiobooks"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                      : "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25"
                    : "bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-sm border border-white/10"
                }`}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>

          {/* Add / Edit Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6 text-white">
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

            {/* Blog Specific Form - OLD DESIGN (Same as before) */}
            {activeTab === "blogs" ? (
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div>
                  <label className="block text-white/80 mb-2 font-medium">
                    Image URL *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter blog image URL"
                    value={newItem.image}
                    onChange={(e) =>
                      setNewItem({ ...newItem, image: e.target.value })
                    }
                    className="w-full border border-white/20 bg-white/5 text-white rounded-xl p-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-white/40"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2 font-medium">
                    Description *
                  </label>
                  <textarea
                    placeholder="Enter blog description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    rows="4"
                    className="w-full border border-white/20 bg-white/5 text-white rounded-xl p-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-white/40 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2 font-medium">
                    Author *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter author name"
                    value={newItem.author}
                    onChange={(e) => setNewItem({ ...newItem, author: e.target.value })}
                    className="w-full border border-white/20 bg-white/5 text-white rounded-xl p-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-white/40"
                  />
                </div>
              </div>
            ) : (
              /* Audio Books & E-Books Form - WITH FILE UPLOAD INSTEAD OF LINK */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-white/80 mb-2 font-medium">
                    Title *
                  </label>
                  <input
                    type="text"
                    placeholder={`Enter ${activeTab.slice(0, -1)} title`}
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    className="w-full border border-white/20 bg-white/5 text-white rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-white/40"
                  />
                </div>
                
                {/* IMAGE UPLOAD OPTION */}
                <div>
                  <label className="block text-white/80 mb-2 font-medium">
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
                    className={`cursor-pointer flex items-center justify-center gap-2 w-full border border-white/20 bg-white/5 text-white rounded-xl p-4 transition-all duration-300 hover:bg-white/10 ${
                      activeTab === "audiobooks" 
                        ? "focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" 
                        : "focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    }`}
                  >
                    {isUploading ? (
                      <>
                        <div className={`animate-spin rounded-full h-5 w-5 border-b-2 ${
                          activeTab === "audiobooks" ? "border-cyan-300" : "border-green-300"
                        }`}></div>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-lg">🖼️</span>
                        <span>Upload Image</span>
                      </>
                    )}
                  </button>

                  {/* Image preview */}
                  {newItem.image && (
                    <div className="mt-2">
                      <div className="text-green-400 text-sm mb-1">✅ Image Selected</div>
                      <div className="w-20 h-20 border border-white/20 rounded-lg overflow-hidden">
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
                  <label className="block text-white/80 mb-2 font-medium">
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
                    className={`cursor-pointer flex items-center justify-center gap-2 w-full border border-white/20 bg-white/5 text-white rounded-xl p-4 transition-all duration-300 hover:bg-white/10 ${
                      activeTab === "audiobooks" 
                        ? "focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" 
                        : "focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    }`}
                  >
                    {isFileUploading ? (
                      <>
                        <div className={`animate-spin rounded-full h-5 w-5 border-b-2 ${
                          activeTab === "audiobooks" ? "border-cyan-300" : "border-green-300"
                        }`}></div>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-lg">📁</span>
                        <span>Choose File</span>
                      </>
                    )}
                  </button>

                  {/* File name display */}
                  {newItem.fileName && (
                    <div className="mt-2 text-green-400 text-sm">
                      ✅ {newItem.fileName}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleAddOrUpdate}
                className={`cursor-pointer flex items-center gap-3 px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 ${
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
                  className="cursor-pointer flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold border border-white/20 transition-all duration-300"
                >
                  <span>❌</span> Cancel
                </button>
              )}
            </div>
          </div>

          {/* Items List */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white capitalize">
                {activeTab === "blogs" ? "Blog Posts" : activeTab} Collection
              </h3>
              <span className="text-white/60">
                {mediaData[activeTab].length} {activeTab === "blogs" ? "posts" : "items"}
              </span>
            </div>

            {mediaData[activeTab].length === 0 ? (
              <div className="text-center py-12">
                <span className="text-4xl">
                  {activeTab === "blogs" ? "📝" : activeTab === "audiobooks" ? "🎧" : "📖"}
                </span>
                <p className="text-white/60 text-lg mt-4">
                  {activeTab === "blogs" ? "No blog posts added yet." : "No items added yet."}
                </p>
                <p className="text-white/40 text-sm mt-2">
                  Add your first item using the form above
                </p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                activeTab === "blogs" 
                  ? "grid-cols-1 md:grid-cols-2" 
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}>
                {mediaData[activeTab].map((item, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg ${
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
                        className="w-full h-48 object-cover rounded-xl mb-4 border border-white/10"
                      />
                    )}
                    
                    {/* Blog Specific Content */}
                    {activeTab === "blogs" && (
                      <>
                        <p className="text-white/70 text-sm mb-3 line-clamp-3">
                          {item.description}
                        </p>
                        <p className="text-white/60 text-sm">
                          By {item.author}
                        </p>
                      </>
                    )}

                    {/* Audio Books & E-Books Content */}
                    {activeTab !== "blogs" && (
                      <>
                        <h4 className="font-bold text-white text-xl mb-2">
                          {item.title}
                        </h4>
                        <div className={`flex items-center gap-2 text-sm font-medium ${
                          activeTab === "audiobooks" ? "text-cyan-400" : "text-green-400"
                        }`}>
                          <span>
                            {activeTab === "audiobooks" ? "🎵" : "📚"}
                          </span>
                          <span>
                            {item.fileName || "Uploaded File"}
                          </span>
                        </div>
                      </>
                    )}

                    <div className="flex gap-3 mt-4 pt-4 border-t border-white/10">
                      <button
                        onClick={() => handleEdit(index)}
                        className="cursor-pointer flex items-center gap-2 text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors"
                      >
                        <span>✏️</span> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="cursor-pointer flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
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