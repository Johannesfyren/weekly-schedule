import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
	"https://nqlnodvnildwrwjmunae.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xbG5vZHZuaWxkd3J3am11bmFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMzg5NjksImV4cCI6MjA2NzYxNDk2OX0.4aDMLgAnyVynqAma7HD6-ynMVy3RsVNVhr1BA7XEOwM"
);
