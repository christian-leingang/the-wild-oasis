import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://cpckdyzpymcmjagomwxl.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwY2tkeXpweW1jbWphZ29td3hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgxNzQxMDgsImV4cCI6MjAxMzc1MDEwOH0.NHShDYh9E-bUSt6vZgPPbbZ7xmMBvbRToqFHpNTRsR4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
