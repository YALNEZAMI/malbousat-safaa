export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  console.log("method", method);
  //const body = await readBody(event);
  //and other on https://nuxt.com/docs/guide/directory-structure/server
  const query = getQuery(event);
  const config = useRuntimeConfig();
  return query.password == config.PASSWORD_ADMIN;
});
