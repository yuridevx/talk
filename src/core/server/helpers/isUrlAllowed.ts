import { Config } from "../config";

export default function isUrlAllowed(config: Config, url: string) {
  const restrictedOrigins = config.get("restricted_origins");
  if (!restrictedOrigins) {
    return true;
  }
  const { origin } = new URL(url);

  return restrictedOrigins.includes(origin);
}
