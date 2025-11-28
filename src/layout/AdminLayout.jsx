import Sidebar from "../components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - hidden on mobile by default */}
      <div className="hidden lg:block lg:w-72 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main content - takes full width on mobile */}
      <main className="flex-1 min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4 lg:p-6 overflow-auto">
        <div className="w-full max-w-full">{children}</div>
      </main>

      {/* Mobile Sidebar - rendered separately for mobile */}
      <div className="lg:hidden">
        <Sidebar />
      </div>
    </div>
  );
}
