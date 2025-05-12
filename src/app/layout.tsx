import Link from "next/link";
import Navbar from "@/components/navbar"; // Import the Navbar component
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900">
        {/* Navbar */}
        <Navbar />

        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-white dark:bg-gray-800 shadow-md p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Navigation
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="block w-full text-center bg-gray-200 dark:bg-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/users"
                  className="block w-full text-center bg-gray-200 dark:bg-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Users
                </Link>
              </li>
              <li>
                <Link
                  href="/chart"
                  className="block w-full text-center bg-gray-200 dark:bg-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Data Visuals
                </Link>
              </li>
            </ul>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">{children}</main>
        </div>

        <footer>
          <div className="bg-gray-800 p-4">
            <div className="container mx-auto text-center text-white">
              <p>&copy; 2023 My Blog. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}