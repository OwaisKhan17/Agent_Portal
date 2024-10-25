// pages/unauthorized.js

const UnauthorizeAccess = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600">403</h1>
                <p className="mt-4 text-lg text-gray-700">
                    You are not authorized to view this page.
                </p>
                <a
                    href="/dashboard"
                    className="mt-6 inline-block px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
                >
                    Go to Home
                </a>
            </div>
        </div>
    );
};

export default UnauthorizeAccess;