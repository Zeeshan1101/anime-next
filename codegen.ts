import { CodegenConfig } from "@graphql-codegen/cli";

console.log(process.env.ANILIST_GRAPHQL);

const config: CodegenConfig = {
      schema: process.env.ANILIST_GRAPHQL as string,
      documents: ["src/**/*.tsx"],
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
