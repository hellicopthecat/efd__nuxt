import {createClient} from "@supabase/supabase-js";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const supabase = createClient(
    config.public.SUPA_PROJECT_URL,
    config.public.SUPA_ANON_KEY
  );

  return {provide: {initSupabase: supabase}};
});
