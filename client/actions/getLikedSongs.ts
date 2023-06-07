//day la server component

import { Song } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { header, cookies } from 'next/headers';

const getLikedSongs = async function (): Promise<Song[]> {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  const { data: sessionData } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from('liked_songs')
    .select('*,songs(*)')
    .eq('user_id', sessionData.session?.user.id)
    .order('created_at', { ascending: false });
  if (error) {
    console.log(error.message);
    return [];
  }
  if (!data) {
    return [];
  }
  return data.map(function (item) {
    return { ...item.songs };
  });
};
export default getLikedSongs;
