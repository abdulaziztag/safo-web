'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface YouTubeLink {
  videoId: string;
  title: string;
}

export default function HomePage() {
  const router = useRouter();
  const [youtubeLink, setYoutubeLink] = useState<YouTubeLink | null>(null);

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

  return (
    <div className="flex item-center justify-center h-screen bg-gradient-to-b from-blue-100 to-purple-100 py-6">
      <div className="flex relative py-3 h-fit self-center w-8/10">
        <div className="relative px-4 py-10 bg-white w-full shadow-lg sm:rounded-3xl sm:p-20">
          <div className="w-full aspect-video">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold mb-8 text-center text-purple-600">
                  🎨 Welcome to Safo! 🎨
                </h1>
                
                {youtubeLink && (
                  <div className="space-y-4">
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        className="w-full aspect-video rounded-lg shadow-lg"
                        src={`https://www.youtube.com/embed/${youtubeLink.videoId}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 