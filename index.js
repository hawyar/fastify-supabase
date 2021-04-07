const fp = require("fastify-plugin");
const { createClient } = require("@supabase/supabase-js");

function supabase(fastify, options, next) {
  const {
    supabaseUrl,
    supabaseKey,
    schema,
    headers,
    autoRefreshToken,
    persistSession,
    detectSessionInUrl,
    localStorage,
  } = options;

  if (!(supabaseUrl && supabaseKey)) {
    return next(
      new Error(
        "missing credentials: supabaseUrl (required), supabaseKey (required)"
      )
    );
  }

  const supabaseClient = createClient(supabaseUrl, supabaseKey, {
    schema: schema,
    headers: headers,
    autoRefreshToken: autoRefreshToken,
    persistSession: persistSession,
    detectSessionInUrl: detectSessionInUrl,
    localStorage: localStorage,
  });

  if (fastify.supabase) {
    return next(new Error("fastify-supabase already registered"));
  }

  fastify.decorate("supabase", supabaseClient);

  next();
}

module.exports = fp(supabase, {
  fastify: ">=1.1.0",
  name: "fastify-supabase",
});
