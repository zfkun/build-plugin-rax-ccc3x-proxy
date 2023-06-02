import processWeb from "./processWeb";

export default (api, options) => {
  const { context } = api;
  const {
    command,
    userConfig: { targets },
  } = context;

  if (command !== "start") return;

  if (targets.include("web")) processWeb(api, options);
};
