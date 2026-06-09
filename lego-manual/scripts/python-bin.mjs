import { existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const VENV_PYTHON = resolve(ROOT, ".venv/bin/python3");

/** Prefer project venv; fall back to system python3. */
export function getPythonBin() {
  return existsSync(VENV_PYTHON) ? VENV_PYTHON : "python3";
}
