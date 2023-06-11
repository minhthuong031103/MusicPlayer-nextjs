'use client';

import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types';
import Image from 'next/image';
import PlayButton from './PlayButton';
interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem = function ({ data, onClick }: SongItemProps) {
  const imagePath = useLoadImage(data);

  return (
    <div
      onClick={() => onClick(data.id)}
      className="relative
  group 
  flex
  flex-col
  items-center justify-center rounded-md overflow-hidden
  gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10
  p-3
  "
    >
      <div
        className="relative aspect-square w-full h-full 
     rounded-md overflow-hidden
     "
      >
        <Image
          className="object-cover"
          fill
          alt="Image"
          src={imagePath || '/images/liked.png'}
        />
      </div>

      <div
        className="flex flex-col items-start w-full pt-4 
gap-y-1"
      >
        <p className="font-semibold font-roboto truncate w-full">
          {data.title}
        </p>
        <p className="text-neutral-400 text-sm pb-4 w-full truncate">
          {data.author}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
