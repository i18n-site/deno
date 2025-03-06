export default (func) =>
  function () {
    if (
      this.req.param("token") != this.env.API_TOKEN
    ) {
      throw new Error("invalid token");
    }
    return func.call(this);
  };
