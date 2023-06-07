'use client';

import { Song } from '@/types';
import SongItem from './SongItem';
import useOnPlay from '@/hooks/useOnPlay';
import Player from './Player';

interface PageContentProps {
  songs: Song[];
}

const PageContent = function ({ songs }: PageContentProps) {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available</div>;
  }

  return (
    <div className="flex flex-col justify-between">
      <div
        className="grid grid-cols-1
        sm:grid-cols-3 
        lg:grid-cols-4
        xl:grid-cols-5
        
        gap-4 mt-4 mb-10
"
      >
        {songs.map(function (song) {
          return (
            <SongItem
              key={song.id} //use key for reseting hook, destroy when next song
              data={song}
              onClick={(id: string) => onPlay(id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PageContent;
