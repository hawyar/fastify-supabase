"use strict";

require("dotenv").config();
const Fastify = require("fastify");
const t = require("tap");

const fastifySupabase = require("./index");
const test = t.test;

test("Should throw with no credential options", (t) => {
  t.plan(1);
  t.teardown(() => fastify.close());

  const fastify = Fastify();

  fastify.register(fastifySupabase);
  fastify.ready((error) => {
    t.equal(
      error.message,
      "missing credentials: supabaseUrl (required), supabaseKey (required)"
    );
  });
});

test("Should pass with given required fields", (t) => {
  t.plan(2);
  t.teardown(() => fastify.close());

  const fastify = Fastify();

  fastify.register(fastifySupabase, {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
  });

  fastify.ready((error) => {
    t.error(error);
    t.equal(fastify.supabase.supabaseUrl, process.env.SUPABASE_URL);
  });
});

test("Should throw if supabase plugin already registered", (t) => {
  t.plan(1);
  t.teardown(() => fastify.close());

  const fastify = Fastify();

  fastify.register(fastifySupabase, {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
  });

  fastify.register(fastifySupabase, {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
  });

  fastify.ready((error) => {
    t.equal(error.message, `fastify-supabase already registered`);
  });
});

test("Should pass with set schema", (t) => {
  t.plan(2);

  const fastify = Fastify();
  t.teardown(() => fastify.close());

  fastify.register(fastifySupabase, {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
    schema: "public",
  });

  fastify.ready((error) => {
    t.error(error);
    t.equal(fastify.supabase.schema, "public");
  });
});
