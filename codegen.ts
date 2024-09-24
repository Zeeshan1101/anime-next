import { CodegenConfig } from "@graphql-codegen/cli";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const config: CodegenConfig = {
    schema: process.env.ANILIST_GRAPHQL as string,
    documents: ["src/graphql/**/*.tsx", "src/graphql/**/*.ts"],
    generates: {
        "./src/__generated__/": {
            preset: "client",
            presetConfig: {
                gqlTagName: "gql",
            },
        },
    },
    ignoreNoDocuments: true,
};

export default config;
