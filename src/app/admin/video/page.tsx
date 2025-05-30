'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface YouTubeLink {
  videoId: string;
  title: string;
}

export default function AdminVideoPage() {
  const router = useRouter();
  const [youtubeLink, setYoutubeLink] = useState<YouTubeLink | null>(null);
  const [newVideoId, setNewVideoId] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/');
      return;
    }

    fetchYouTubeLink();
  }, [router]);

  const fetchYouTubeLink = async () => {
    try {
      const response = await fetch('/api/youtube');
      const data = await response.json();
      setYoutubeLink(data);
    } catch (error) {
      console.error('Error fetching YouTube link:', error);
    }
  };

  const handleUpdateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const response = await fetch('/api/youtube', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId: newVideoId,
          title: newTitle,
        }),
      });

      if (!response.ok) {
        console.log('Failed to update video');
      }

      await fetchYouTubeLink();
      setNewVideoId('');
      setNewTitle('');
    } catch (error) {
      console.error('Error updating video:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold mb-8 text-center text-purple-600">
                  🎥 Video Management
                </h1>

                {youtubeLink && (
                  <div className="space-y-4 mb-8">
                    <h2 className="text-xl font-semibold text-center text-blue-600">
                      Current Video: {youtubeLink.title}
                    </h2>
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        className="w-full h-[315px] rounded-lg shadow-lg"
                        src={`https://www.youtube.com/embed/${youtubeLink.videoId}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}

                <form onSubmit={handleUpdateVideo} className="mt-8 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      New Video ID
                    </label>
                    <input
                      type="text"
                      value={newVideoId}
                      onChange={(e) => setNewVideoId(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Enter YouTube video ID"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Get this from the YouTube URL after &#34;v=&#34;
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Video Title
                    </label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Enter video title"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
                  >
                    {isUpdating ? 'Updating...' : 'Update Video'}
                  </button>
                </form>

                <div className="mt-6">
                  <button
                    onClick={() => router.push('/home')}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-purple-600 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 