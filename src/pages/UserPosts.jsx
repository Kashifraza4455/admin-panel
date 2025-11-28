import { useParams, Link } from "react-router-dom";
import { useUsers } from "../context/UsersContext";
import { useState, useEffect } from "react";

export default function UserPosts() {
  const { id } = useParams();
  const { users } = useUsers();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = users.find((u) => u.id === parseInt(id));
    if (u) {
      setUser(u);
    }
  }, [id, users]);

  if (!user)
    return (
      <p className="p-4 lg:p-6 text-red-500 font-semibold text-center">
        User not found
      </p>
    );

  // Sample posts data
  const userPosts = user.posts || [
    {
      id: 1,
      title: "My first week of recovery",
      content:
        "This has been a challenging but rewarding week. I've learned so much about myself and my triggers. The support from this community has been amazing.",
      date: "2024-01-05",
      likes: 12,
      comments: 3,
      category: "Recovery Journey",
    },
    {
      id: 2,
      title: "Dealing with cravings",
      content:
        "Today was tough but I managed to stay strong. Meditation really helped me get through the difficult moments. Remembering why I started this journey kept me going.",
      date: "2024-01-08",
      likes: 24,
      comments: 8,
      category: "Struggles",
    },
    {
      id: 3,
      title: "30 days clean!",
      content:
        "I can't believe I made it to 30 days! This community has been incredibly supportive. Thank you everyone for your encouragement and kind words!",
      date: "2024-01-30",
      likes: 56,
      comments: 15,
      category: "Milestone",
    },
  ];

  return (
    <div className="w-full space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 lg:mb-8">
        <div className="flex-1">
          <Link
            to={`/users/${user.id}`}
            className="inline-flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition mb-3 lg:mb-4 text-sm lg:text-base"
          >
            ← Back
          </Link>
          <h1 className="text-2xl lg:text-3xl font-bold text-indigo-300 mb-1 lg:mb-2">
            {user.name}'s Posts & Updates
          </h1>
          <p className="text-gray-300 text-sm lg:text-lg">
            All posts, updates, and community interactions by {user.name}
          </p>
        </div>

        <div className="flex items-center gap-3 lg:gap-4">
          <div className="text-right">
            <div className="text-xl lg:text-2xl font-bold text-blue-300">
              {userPosts.length}
            </div>
            <div className="text-xs lg:text-sm text-blue-200">Total Posts</div>
          </div>
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <span className="text-xl lg:text-2xl">📝</span>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
        <div className="p-3 lg:p-4 bg-green-500/20 rounded-xl border border-green-500/30">
          <div className="text-xl lg:text-2xl font-bold text-green-300">
            {userPosts.reduce((total, post) => total + post.likes, 0)}
          </div>
          <div className="text-xs lg:text-sm text-green-200">Total Likes</div>
        </div>
        <div className="p-3 lg:p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
          <div className="text-xl lg:text-2xl font-bold text-blue-300">
            {userPosts.reduce((total, post) => total + post.comments, 0)}
          </div>
          <div className="text-xs lg:text-sm text-blue-200">Total Comments</div>
        </div>
        <div className="p-3 lg:p-4 bg-purple-500/20 rounded-xl border border-purple-500/30">
          <div className="text-xl lg:text-2xl font-bold text-purple-300">
            {userPosts.filter((post) => post.category === "Milestone").length}
          </div>
          <div className="text-xs lg:text-sm text-purple-200">Milestones</div>
        </div>
        <div className="p-3 lg:p-4 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
          <div className="text-xl lg:text-2xl font-bold text-yellow-300">
            {Math.round(
              userPosts.reduce((total, post) => total + post.likes, 0) /
                userPosts.length
            ) || 0}
          </div>
          <div className="text-xs lg:text-sm text-yellow-200">
            Avg Likes/Post
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {userPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02] group"
          >
            <div className="p-4 lg:p-6">
              {/* Post Header */}
              <div className="flex justify-between items-start mb-3 lg:mb-4">
                <span className="px-2 lg:px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs lg:text-sm font-medium border border-indigo-500/30">
                  {post.category}
                </span>
                <span className="text-gray-400 text-xs lg:text-sm bg-white/5 px-2 py-1 rounded">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              {/* Post Title */}
              <h3 className="text-lg lg:text-xl font-bold text-white mb-2 lg:mb-3 group-hover:text-indigo-300 transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* Post Content */}
              <p className="text-gray-300 mb-3 lg:mb-4 line-clamp-3 leading-relaxed text-sm lg:text-base">
                {post.content}
              </p>

              {/* Post Stats */}
              <div className="flex justify-between items-center pt-3 lg:pt-4 border-t border-white/10">
                <div className="flex gap-3 lg:gap-4 text-xs lg:text-sm">
                  <span className="flex items-center gap-1 text-green-400">
                    <span className="text-sm">👍</span>
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1 text-blue-400">
                    <span className="text-sm">💬</span>
                    {post.comments}
                  </span>
                </div>
                <button className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium text-xs lg:text-sm flex items-center gap-1">
                  Read More
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {userPosts.length === 0 && (
        <div className="text-center p-8 lg:p-16 bg-white/5 rounded-xl border border-white/10">
          <div className="text-4xl lg:text-6xl mb-4 lg:mb-6">📝</div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-300 mb-2 lg:mb-3">
            No Posts Yet
          </h2>
          <p className="text-gray-400 text-sm lg:text-lg mb-4 lg:mb-6 max-w-md mx-auto">
            {user.name} hasn't made any posts or updates in the community yet.
          </p>
          <div className="text-xs lg:text-sm text-gray-500">
            Posts will appear here when they start sharing their journey.
          </div>
        </div>
      )}

      {/* Recent Activity Summary */}
      {userPosts.length > 0 && (
        <div className="p-4 lg:p-6 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-base lg:text-lg font-semibold text-white mb-3 lg:mb-4">
            Recent Activity Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 text-xs lg:text-sm">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
              <span className="text-green-400 text-base lg:text-lg">📈</span>
              <div>
                <div className="text-white font-medium">Most Liked Post</div>
                <div className="text-gray-400 truncate">
                  "
                  {
                    userPosts.reduce((max, post) =>
                      post.likes > max.likes ? post : max
                    ).title
                  }
                  "
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
              <span className="text-blue-400 text-base lg:text-lg">💬</span>
              <div>
                <div className="text-white font-medium">Most Discussed</div>
                <div className="text-gray-400 truncate">
                  "
                  {
                    userPosts.reduce((max, post) =>
                      post.comments > max.comments ? post : max
                    ).title
                  }
                  "
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
