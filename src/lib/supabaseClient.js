import { createClient } from '@supabase/auth-helpers-sveltekit';

export const supabase = createClient(
    "https://hbcdfrawxofhehvmbzde.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiY2RmcmF3eG9maGVodm1iemRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk0MjU3MDUsImV4cCI6MTk4NTAwMTcwNX0.5jr8FoJxO0sD93Oual8Eq8BucWSmfC4Fvy7LfCOILkk");

