import { uploadBookings } from '../data/Uploader';
import supabase from './supabase';

async function fetchData() {
  let { data: cabins, error } = await supabase.from('cabins').select('*');

  uploadBookings();

  if (error) {
    console.error('Error fetching data:', error);
    return;
  }

  console.log('Data:', cabins);
}

fetchData();
