import supabase from './supabase.js';

async function fetchData() {
  let { data: cabins, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error('Error fetching data:', error);
    return;
  }

  console.log('Data:', cabins);
}

fetchData();
