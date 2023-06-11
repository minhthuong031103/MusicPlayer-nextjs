'use client';

import useSound from 'use-sound';
import { useEffect, useState } from 'react';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { FaRandom } from 'react-icons/fa';
import { Song } from '@/types';
import usePlayer from '@/hooks/usePlayer';

import LikeButton from './LikeButton';
import MediaItem from './MediaItem';
import Slider from './Slider';

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRandom, setIsRandom] = useState('false');
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }
    var nextSong;
    if (sessionStorage.getItem('isRandom') === 'true') {
      const filteredIds = player.ids.filter((id) => id !== player.activeId);
      const randomIndex = Math.floor(Math.random() * filteredIds.length);

      // Access the random element using the random index
      const randomId = player.ids[randomIndex];
      nextSong = player.ids[player.ids.indexOf(randomId)];
    } else {
      const currentIndex = player.ids.findIndex((id) => id === player.activeId);
      nextSong = player.ids[currentIndex + 1];
    }

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };
  const randomHandle = function () {
    if (player.ids.length === 0) {
      return;
    }
    const isRandom = sessionStorage.getItem('isRandom');
    if (isRandom) {
      if (isRandom == 'false') {
        sessionStorage.setItem('isRandom', 'true');
        setIsRandom('true');
      } else {
        sessionStorage.setItem('isRandom', 'false');
        setIsRandom('false');
      }
    } else {
      sessionStorage.setItem('isRandom', 'true');
      setIsRandom('true');
    }
  };
  const [play, { pause, sound }] = useSound(
    songUrl, //this hook dont change when songurl change, so have to destroy entire playercontent
    {
      volume: volume,
      onplay: () => setIsPlaying(true),
      onend: () => {
        setIsPlaying(false);
        onPlayNext();
      },
      onpause: () => setIsPlaying(false),
      format: ['mp3'],
    }
  );

  useEffect(() => {
    sound?.play();
    if (sessionStorage.getItem('isRandom') === 'true') {
      setIsRandom('true');
    }
    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4 overflow-hidden">
          <MediaItem data={song} />
        </div>
      </div>

      <div
        className="
            flex 
            md:hidden 
            col-auto 
            w-full 
            justify-end 
            items-center
          "
      >
        <LikeButton songId={song.id} />
        <FaRandom
          size={24}
          className={`cursor-pointer ${
            isRandom === 'true' ? `text-green-400` : ''
          } `}
          onClick={randomHandle}
        ></FaRandom>
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="
          text-white 
          cursor-pointer 
          hover:text-white 
          transition
        "
        />
        <div
          onClick={handlePlay}
          className="
              h-10
              w-10
              flex 
              items-center 
              justify-center 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="
              text-white 
              cursor-pointer 
              hover:text-white 
              transition
            "
        />
      </div>

      <div
        className="
            hidden
            h-full
            md:flex 
            justify-center 
            items-center 
            w-full 
            max-w-[700px] 
            gap-x-6
          "
      >
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
        />
        <div
          onClick={handlePlay}
          className="
              flex 
              items-center 
              justify-center
              h-10
              w-10 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[200px]">
          <LikeButton songId={song.id} />
          <FaRandom
            size={30}
            className={`cursor-pointer ${
              isRandom === 'true' ? `text-green-400` : ''
            } `}
            onClick={randomHandle}
          ></FaRandom>
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
