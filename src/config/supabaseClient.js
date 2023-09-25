import { createClient } from "@supabase/supabase-js";

const supabaseKey = import.meta.env.VITE_REACT_APP_ANON_KEY
const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase