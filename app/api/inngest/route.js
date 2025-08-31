import { serve } from "inngest/next";

import { inngest } from "@/app/inngest/client";
import { CreateNewUser, helloWorld } from "@/app/inngest/functions";

export const { GET, POST } = serve({
  client: inngest,
  functions: [
    helloWorld,
    CreateNewUser
  ],
});
