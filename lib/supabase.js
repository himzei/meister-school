import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://pccioldbbhkkkhwiysvw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjY2lvbGRiYmhra2tod2l5c3Z3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyODcwMzksImV4cCI6MjAyOTg2MzAzOX0.92PqISbOEjg4QIXUtgnn_I_NNyFDftOTz6Ozrl60ZlI"
);
