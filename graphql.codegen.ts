import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/graphql/schema.json',
  documents: ['src/graphql/*.graphql'],
  ignoreNoDocuments: true,
  generates: {
    'src/graphql/generated/': {
      preset: 'client',
      config: {
        defaultScalarType: 'unknown',
        useTypeImports: true,
        skipTypename: true,
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['yarn prettier --write src/graphql/generated/'],
  },
}

export default config
