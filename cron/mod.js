export default (
  kind,
  schedule,
  func,
) => Deno.cron(kind, schedule, func);
