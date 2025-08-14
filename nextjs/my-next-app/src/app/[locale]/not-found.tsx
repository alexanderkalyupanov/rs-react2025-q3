import Link from "next/link";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-violet-600 text-white p-4">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-3xl mb-6">Page Not Found</h2>
      <p className="text-xl mb-8 text-center max-w-md">
        Oops! The page you are looking for doesnt exist or has been moved.
      </p>
      {/* <Link
        to="/"
        className="px-6 py-3 bg-white text-violet-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
      >
        Go to Main
      </Link> */}
    </div>
  );
}

export default NotFoundPage;
