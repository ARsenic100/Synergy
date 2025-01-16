import React from 'react';

interface VideoPlayerProps {
  videoId: string;
  onComplete?: () => void;
}

export function VideoPlayer({ videoId, onComplete }: VideoPlayerProps) {
  const handleVideoEnd = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onEnded={handleVideoEnd}
      />
    </div>
  );
}