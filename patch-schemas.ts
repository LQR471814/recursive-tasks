import { readFileSync, writeFileSync } from "node:fs";

const contents = readFileSync("./src/lib/supabase/schemas.gen.ts", "utf8");
const newContents = contents.replaceAll(
	"id: z.string()",
	"id: z.string().default(() => crypto.randomUUID())",
);
writeFileSync(
	"./src/lib/supabase/schemas.gen.ts",
	`import { asInstant } from "~/lib/utils"
${newContents}`,
);
