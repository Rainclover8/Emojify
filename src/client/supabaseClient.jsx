import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sbgsqtmgklujqwnfkmze.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiZ3NxdG1na2x1anF3bmZrbXplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5ODU0OTUsImV4cCI6MjA1MDU2MTQ5NX0.zbH_1PG6JZ_M2eYSeFeEwJj_1B_u41s4zvurAP8xpFo";

export const supabase = createClient(supabaseUrl, supabaseKey);
