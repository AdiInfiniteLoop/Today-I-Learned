import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://vlpxkibxmcingforveej.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZscHhraWJ4bWNpbmdmb3J2ZWVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyMDI4NTMsImV4cCI6MjAzMjc3ODg1M30.IWGlofzqceU9Jw0KOXodFjRNbK7qvL6uhOXmtf0Vnmk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
