'use client';

import LikeButton from '@/Components/LikeButton';
import MediaItem from '@/Components/MediaItem';
import { Song } from '@/types';

interface SearchContentProps {
  songs: Song[];
}

const SearchContent = function ({ songs }: SearchContentProps) {
  if (songs.length === 0) {
    return (
      <div className="text-neutral-400 flex flex-col gap-y-2 w-full px-6 ">
        No songs found
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map(function (song) {
        return (
          <div className="flex items-center gap-x-4 w-full" key={song.id}>
            <div className="flex-1">
              <MediaItem onClick={() => {}} data={song} />
            </div>
            <LikeButton songId={song.id} />
          </div>
        );
      })}
    </div>
  );
};
export default SearchContent;
