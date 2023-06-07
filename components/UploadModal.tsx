'use client';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import useUploadModal from '@/hooks/useUploadModal';
import { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { toast } from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';
import uniqid from 'uniqid';
import {
  SupabaseClient,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
const UploadModal = function () {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const uploadModal = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    },
  });

  const onChange = function (open: boolean) {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmitForm: SubmitHandler<FieldValues> = async function (values) {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
      if (!imageFile || !songFile || !user) {
        toast.error('Missing fields');
        return;
      }

      const uniqueID = uniqid();
      //Upload song to supabase
      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${uniqueID}-${uniqueID}`, songFile, {
          cacheControl: '3600',
          upsert: false,
        });
      if (songError) {
        setIsLoading(false);
        console.log(songError?.message);
        return toast.error('Failed to upload song');
      }

      //Upload Image

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from('images')
          .upload(`image-${uniqueID}-${uniqueID}`, imageFile, {
            cacheControl: '3600',
            upsert: false,
          });
      if (imageError) {
        setIsLoading(false);
        return toast.error('Failed to upload image');
      }

      const { error: supabaseError } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success('Song created');
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="flex flex-col  justify-between gap-4"
      >
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Song title"
        ></Input>
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Author"
        ></Input>
        <div>
          <div className="pb-1">Select a song file mp3</div>
          <Input
            id="song"
            type="file"
            accept=".mp3"
            disabled={isLoading}
            {...register('song', { required: true })}
            placeholder="Song file"
          ></Input>
        </div>
        <div>
          <div className="pb-1">Select image for the song</div>
          <Input
            id="image"
            type="file"
            accept="image/*"
            disabled={isLoading}
            {...register('image', { required: true })}
            placeholder="Image file"
          ></Input>
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
