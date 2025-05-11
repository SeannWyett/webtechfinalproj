import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header></header>
        <div className="flex min-h-screen bg-gray-100">
          {/* Sidebar */}
          <aside className="w-64 bg-white shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">Navigation</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="block w-full text-center bg-gray-200 py-2 px-4 rounded-md hover:bg-gray-300 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/users"
                  className="block w-full text-center bg-gray-200 py-2 px-4 rounded-md hover:bg-gray-300 transition"
                >
                  Users
                </Link>
              </li>
              <li>
                <Link
                  href="/chart"
                  className="block w-full text-center bg-gray-200 py-2 px-4 rounded-md hover:bg-gray-300 transition"
                >
                  Data Visuals
                </Link>
              </li>
            </ul>
          </aside>
          <main>{children}</main>
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