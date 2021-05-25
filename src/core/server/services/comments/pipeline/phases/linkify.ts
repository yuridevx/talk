import { isUrlAllowed } from "coral-server/helpers";
import linkifyjs, { Options } from "linkifyjs/html";

import {
  IntermediateModerationPhase,
  IntermediatePhaseResult,
} from "coral-server/services/comments/pipeline";

export const linkify: IntermediateModerationPhase = async ({
  comment,
  bodyText,
  config,
}): Promise<IntermediatePhaseResult | void> => {
  if (bodyText.trim().length > 0) {
    const linkifyOptions: Options = {
      className: "",
      tagName: "a",
      // If the href starts with `//`, then it shouldn't be treated as a valid URL
      // because this is not commonly used in posted URL's.
      validate: (href: string, type: string) => {
        if (type === "url" && !isUrlAllowed(config, href)) {
          return false;
        }

        return !href.startsWith("//");
      },
    };

    return {
      body: linkifyjs(comment.body, linkifyOptions),
    };
  }
};
