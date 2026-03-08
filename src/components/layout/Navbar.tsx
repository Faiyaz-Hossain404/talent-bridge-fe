import { Link, useLocation, useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { isAuthenticated, logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileOpen(false);
  };

  const isAdmin = user?.roleId === 1;
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isLandingPage = location.pathname === "/";
  const isAuthPage = location.pathname === "/auth";

  // Function to handle anchor link clicks
  const handleAnchorClick = (sectionId: string) => {
    setMobileOpen(false);

    // If we're not on the landing page, navigate to landing page first
    if (!isLandingPage) {
      navigate("/");
      // Wait for navigation then scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // If we're already on landing page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Function to handle Jobs navigation - always scroll to top
  const handleJobsClick = () => {
    setMobileOpen(false);
    // Scroll to top when navigating to jobs
    window.scrollTo(0, 0);
  };

  // UPDATED: Function to handle Logo click - smart home navigation
  const handleLogoClick = () => {
    setMobileOpen(false);

    if (isAuthenticated && !isLandingPage) {
      // If user is logged in and not on landing page, go to dashboard
      navigate("/dashboard");
      window.scrollTo(0, 0);
    } else if (!isLandingPage) {
      // If not on landing page and not logged in, go to landing page
      navigate("/");
    } else {
      // If already on landing page, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isActive = (path: string) => location.pathname === path;

  if (isAdminRoute) {
    return (
      <header className="fixed inset-x-0 top-0 z-50 bg-white/40 backdrop-blur-md border-b border-zinc-200">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2"
            onClick={handleLogoClick}
          >
            <div className="h-8 w-8 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>

            <span className="text-2xl font-semibold tracking-tight font-serif text-zinc-900 cursor-pointer">
              Hirely
            </span>
          </Link>
        </nav>
      </header>
    );
  }

  //user dashboard navbar, for auth users on landing pages
  if (isAuthenticated && !isLandingPage && !isAuthPage) {
    return (
      <>
        <header className="fixed inset-x-0 top-0 z-50 bg-white/40 backdrop-blur-md border-b border-zinc-200">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            {/* Logo */}
            <Link
              to="/dashboard"
              className="flex items-center gap-2"
              onClick={handleLogoClick}
            >
              <div className="h-8 w-8 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>

              <span className="text-2xl font-semibold tracking-tight font-serif text-zinc-900 cursor-pointer">
                Hirely
              </span>
            </Link>

            {/* Desktop Navigation - MINIMAL FOR AUTHENTICATED USERS */}
            <div className="hidden items-center gap-6 md:flex">
              <Link
                to="/jobs"
                onClick={handleJobsClick}
                className={`text-sm transition-all ${
                  isActive("/jobs")
                    ? "text-indigo-600 text-base font-semibold"
                    : "px-2 py-1 rounded-md text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
                }`}
              >
                Jobs
              </Link>

              <div className="flex items-center gap-6">
                {/* Regular User Dashboard */}
                {!isAdmin && (
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm transition-all ${
                      isActive("/dashboard")
                        ? "text-indigo-600 text-base font-semibold"
                        : "px-2 py-1 rounded-md text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
                    }`}
                  >
                    Dashboard
                  </Link>
                )}

                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm transition-all ${
                    isActive("/profile")
                      ? "text-indigo-600 text-base font-semibold"
                      : "px-2 py-1 rounded-md text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
                  }`}
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:text-red-700 font-medium cursor-pointer transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-zinc-700 hover:bg-zinc-100 md:hidden"
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </nav>
        </header>

        {/* Mobile Menu Overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 top-16 z-40 bg-white md:hidden">
            <div className="flex flex-col space-y-6 p-6">
              <Link
                to="/jobs"
                onClick={handleJobsClick}
                className={`text-lg font-medium transition-all ${
                  isActive("/jobs")
                    ? "text-indigo-600 text-xl font-semibold"
                    : "text-zinc-900 hover:text-indigo-600"
                }`}
              >
                Jobs
              </Link>

              {/* Regular User Dashboard */}
              {!isAdmin && (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className={`text-lg font-medium transition-all ${
                    isActive("/dashboard")
                      ? "text-indigo-600 text-xl font-semibold"
                      : "text-zinc-900 hover:text-indigo-600"
                  }`}
                >
                  Dashboard
                </Link>
              )}

              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className={`text-lg font-medium transition-all ${
                  isActive("/profile")
                    ? "text-indigo-600 text-xl font-semibold"
                    : "text-zinc-900 hover:text-indigo-600"
                }`}
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="text-left text-lg font-medium text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  //to landing page for unauth
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white/40 backdrop-blur-md border-b border-zinc-200">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={handleLogoClick}
          >
            <div className="h-8 w-8 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>

            <span className="text-2xl font-semibold tracking-tight font-serif text-zinc-900 cursor-pointer">
              Hirely
            </span>
          </Link>

          {/* Desktop Navigation - FULL FOR LANDING PAGE */}
          <div className="hidden items-center gap-6 md:flex">
            <button
              onClick={() => handleAnchorClick("overview")}
              className="px-2 py-1 rounded-md text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              Overview
            </button>

            <button
              onClick={() => handleAnchorClick("company")}
              className="px-2 py-1 rounded-md text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              Company
            </button>

            <Link
              to="/jobs"
              onClick={handleJobsClick}
              className={`text-sm transition-all ${
                isActive("/jobs")
                  ? "text-indigo-600 text-base font-semibold"
                  : "px-2 py-1 rounded-md text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
              }`}
            >
              Jobs
            </Link>

            {/* AUTHENTICATED ONLY */}
            {isAuthenticated ? (
              <div className="flex items-center gap-6">
                {/* Admin Dashboard */}
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm transition-all ${
                      isActive("/admin/dashboard")
                        ? "text-indigo-600 text-base font-semibold"
                        : "px-2 py-1 rounded-md text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
                    }`}
                  >
                    Admin Dashboard
                  </Link>
                )}

                {/* Regular User Dashboard */}
                {!isAdmin && (
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm transition-all ${
                      isActive("/dashboard")
                        ? "text-indigo-600 text-base font-semibold"
                        : "px-2 py-1 rounded-md text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
                    }`}
                  >
                    Dashboard
                  </Link>
                )}

                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm transition-all ${
                    isActive("/profile")
                      ? "text-indigo-600 text-base font-semibold"
                      : "px-2 py-1 rounded-md text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
                  }`}
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMobileOpen(false)}
                className={`text-sm transition-all ${
                  isActive("/auth")
                    ? "text-indigo-600 text-base font-semibold"
                    : "px-2 py-1 rounded-md text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
                }`}
              >
                Signup/Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-zinc-700 hover:bg-zinc-100 md:hidden"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-white md:hidden">
          <div className="flex flex-col space-y-6 p-6">
            <button
              onClick={() => handleAnchorClick("overview")}
              className="text-left text-lg font-medium text-zinc-900 hover:text-indigo-600 transition-colors"
            >
              Overview
            </button>

            <button
              onClick={() => handleAnchorClick("company")}
              className="text-left text-lg font-medium text-zinc-900 hover:text-indigo-600 transition-colors"
            >
              Company
            </button>

            <Link
              to="/jobs"
              onClick={handleJobsClick}
              className={`text-lg font-medium transition-all ${
                isActive("/jobs")
                  ? "text-indigo-600 text-xl font-semibold"
                  : "text-zinc-900 hover:text-indigo-600"
              }`}
            >
              Jobs
            </Link>

            {/* AUTHENTICATED ONLY */}
            {isAuthenticated ? (
              <>
                {/* Admin Dashboard */}
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className={`text-lg font-medium transition-all ${
                      isActive("/admin/dashboard")
                        ? "text-indigo-600 text-xl font-semibold"
                        : "text-zinc-900 hover:text-indigo-600"
                    }`}
                  >
                    Admin Dashboard
                  </Link>
                )}

                {/* Regular User Dashboard */}
                {!isAdmin && (
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className={`text-lg font-medium transition-all ${
                      isActive("/dashboard")
                        ? "text-indigo-600 text-xl font-semibold"
                        : "text-zinc-900 hover:text-indigo-600"
                    }`}
                  >
                    Dashboard
                  </Link>
                )}

                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className={`text-lg font-medium transition-all ${
                    isActive("/profile")
                      ? "text-indigo-600 text-xl font-semibold"
                      : "text-zinc-900 hover:text-indigo-600"
                  }`}
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-left text-lg font-medium text-red-600 hover:text-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMobileOpen(false)}
                className={`text-lg font-medium transition-all ${
                  isActive("/auth")
                    ? "text-indigo-600 text-xl font-semibold"
                    : "text-zinc-900 hover:text-indigo-600"
                }`}
              >
                Signup/Login
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
