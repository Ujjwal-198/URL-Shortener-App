import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, AnalyticsPopup } from "../components";
import { handleGetAllUrls, handleDeleteUrl, resetError } from "../features/urlSlice.js";
import { handleDeleteUser, handleLogout } from "../features/userSlice.js";


const Profile = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);
    const { urls, loading, error } = useSelector((state) => state.url);

    const [selectedUrl, setSelectedUrl] = useState(null);

    useEffect(() => {
        if (user) {
            dispatch(handleGetAllUrls());
        }
        return () => {
            dispatch(resetError());
        };
    }, [dispatch, user]);

    const getShortId = (fullUrl) => {
        return fullUrl.split('/').pop();
    };

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account and all associated URLs? This action cannot be undone.")) {
            dispatch(handleDeleteUser()).then(() => {
                dispatch(handleLogout());
                dispatch(resetError());
                window.location.href = '/';
            });
        }
    }

    return (
        <div className="bg-gray-900 min-h-screen text-gray-50 py-12 px-10 rounded-lg">
            
            <div className="flex align-middle justify-center mb-8">
                <div className="flex flex-col gap-y-2 text-center">
                    <h1 className="text-3xl font-bold">{`Welcome ${user?.name || ""}!`}</h1>
                    <p>{`Email: ${user?.email || ""}`}</p>
                </div>
            </div>
            <div className="flex justify-center mb-6">
                <Button 
                onClick={handleDeleteAccount}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs ml-2"
                >Delete Account</Button>
            </div>

            {loading && <p className="text-blue-400 text-center">Loading URLs...</p>}

            <div className="max-w-3xl overflow-scroll mx-auto">
                <h2 className="text-xl font-semibold mb-4">Your Shortened URLs</h2>
                {urls && urls.length > 0 ? (
                    <table className="w-full border border-gray-700 rounded-lg text-sm">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="p-2 text-left">Short URL</th>
                                <th className="p-2 text-left">Original URL</th>
                                <th className="p-2 text-center">Total Clicks</th>
                                <th className="p-2 text-center">Analytics</th>
                                <th className="p-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {urls.map((url) => (
                                <tr key={url.ShortId} className="border-t border-gray-700">
                                    <td className="p-2 text-blue-400">
                                        <a
                                            href={url.ShortId}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline hover:text-blue-300"
                                        >
                                            {url.ShortId}
                                        </a>
                                    </td>
                                    <td className="p-2 truncate max-w-xs">{url.LongURL}</td>
                                    <td className="p-2 text-center">{url.urlInfo.totalClick}</td>
                                    <td className="p-2 text-center">
                                        <Button
                                            onClick={() => setSelectedUrl(url)}
                                            className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-xs"
                                        >
                                            View Analytics
                                        </Button>
                                    </td>
                                    <td className="p-2 text-center">

                                        <Button
                                            onClick={() => dispatch(handleDeleteUrl(getShortId(url.ShortId))).then(() => {
                                                dispatch(handleGetAllUrls());
                                                dispatch(resetError());
                                            })}
                                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs ml-2"
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    !loading && <p className="text-gray-400">No URLs created yet.</p>
                )}

            </div>

            {selectedUrl && (
                <AnalyticsPopup onClose={() => setSelectedUrl(null)} title="URL Analytics">
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Short URL:</h3>
                        <p className="text-blue-400 underline">{selectedUrl.ShortId}</p>

                        <h3 className="font-semibold text-lg mt-3 mb-2">Original URL:</h3>
                        <p className="truncate">{selectedUrl.LongURL}</p>

                        <h3 className="font-semibold text-lg mt-3 mb-2">Total Clicks:</h3>
                        <p>{selectedUrl.urlInfo.totalClick}</p>
                    </div>

                    <div className="mt-4">
                        <h3 className="font-semibold text-lg mb-2">Visit History</h3>
                        {selectedUrl.urlInfo.History.length > 0 ? (
                            <div className="max-h-48 overflow-y-auto border border-gray-600 rounded">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-700 sticky top-0">
                                        <tr>
                                            <th className="p-2">#</th>
                                            <th className="p-2">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedUrl.urlInfo.History.map((entry, idx) => (
                                            <tr key={idx} className="border-t border-gray-600">
                                                <td className="p-2">{idx + 1}</td>
                                                <td className="p-2">{entry.TimeNow}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-400">No visits yet.</p>
                        )}
                    </div>
                </AnalyticsPopup>
            )}

        </div>
    );
};

export default Profile;
