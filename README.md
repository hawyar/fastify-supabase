# fastify-supabase

![](https://github.com/hawyar/fastify-supabase/workflows/ci/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/hawyar/fastify-supabase/badge.svg)](https://snyk.io/test/github/hawyar/fastify-supabase)
[![Coverage Status](https://coveralls.io/repos/github/hawyar/fastify-supabase/badge.svg?branch=main)](https://coveralls.io/github/hawyar/fastify-supabase?branch=main)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

> Fastify plugin for [Supabase client](https://github.com/supabase/supabase-js)

## Install

```bash
npm i fastify-supabase
// yarn add fastify-supabase
```

### Usage

```javascript

// Required credentials
const options = {
    supbaseUrl: "<SUPABASE_URL>",
    supbaseKey: "<SUPABASE_KEY>",
}

fastify.register(require("fastify-supabase"), options}, (err) =>
  console.error(err)
);

fastify.get("/", (request, reply) => {
  console.log(fastify.supabase); // Supabase instance
});
```

### Options

- supabaseUrl , Type: `string`, **Required**
- supabaseKey (Type: `string`), **Required**
- schema (Type: `string`), **Optional**
- headers: (Type: `object`), **Optional**
- autoRefreshToken, (Type: `boolean`), **Optional**
- persistSession, (Type: `boolean`), **Optional**
- detectSessionInUrl, (Type: `boolean`), **Optional**
- localStorage, (Type: `string`), **Optional**

### Example

Sign up user

```javascript
const fastify = require('fastify')({ logger: true });

const options = {
    supbaseUrl: "<SUPABASE_URL>",
    supbaseKey: "<SUPABASE_KEY>",
}

fastify.register(require("fastify-supabase"), options}, (err) =>
  console.error(err)
);

fastify.get("/", async (request, reply) => {
  const { error, data } = await fastify.supabase.auth.signUp({
  email: 'example@email.com',
  password: 'example-password',

  if (error) {
    res.code(400).send(error)
  }

  res.code(200).send({
    message: "Successful"
  })
})
});
```

Access database

```javascript
const fastify = require('fastify')({ logger: true });

const options = {
    supbaseUrl: "<SUPABASE_URL>",
    supbaseKey: "<SUPABASE_KEY>",
}

fastify.register(require("fastify-supabase"), options}, (err) =>
  console.error(err)
);

fastify.get("/", async (request, reply) => {

  const { data, error } = await fasitfy.supabase
  .from('<TABLE_NAME>')
  .select('<ID>')

  if (error) {
    res.code(400).send(error)
  }

  res.code(200).send(data)
});

```

## License

Licensed under [MIT](./LICENSE).
