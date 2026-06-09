import { existsSync } from "fs";

const DOCKER_CHROMIUM = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

/** Playwright launch options: Docker/Linux path or local default. */
export function getChromiumLaunchOptions() {
  const opts = { args: [] };
  const custom = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
  if (custom) {
    opts.executablePath = custom;
    if (process.platform === "linux") opts.args.push("--no-sandbox");
  } else if (existsSync(DOCKER_CHROMIUM)) {
    opts.executablePath = DOCKER_CHROMIUM;
    opts.args.push("--no-sandbox");
  }
  return opts;
}
