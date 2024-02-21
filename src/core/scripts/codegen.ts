/* eslint-disable no-console */
import camelCase from 'camelcase'
import fs from 'fs/promises'
import openapiTS from 'openapi-typescript'
import path from 'path'
import { URL } from 'url'

const BASE_DOCS_URL = 'https://api.baas-dev.buywheelz.com/api-docs/'

const GENERATED_SRC_FOLDER = path.resolve(__dirname, '../api/generated/')

const PRETTIER_CONFIG_PATH = path.resolve(__dirname, '../.prettierrc.json')

const MICROSERVICES = [
  'cars',
  'customers',
  'employees',
  'lov',
  'common-lovs',
  'opportunities',
  'files',
  'appointments',
  'auctions',
  'ticking'
]

// exit node process on unhandled promise rejections
process.on('unhandledRejection', error => {
  throw error
})

async function main() {
  for (const microservice of MICROSERVICES) {
    console.log(`Generating types for ${microservice}`)

    const docsUrl = new URL(microservice, BASE_DOCS_URL).toString()
    const typesDef = await openapiTS(docsUrl, {
      prettierConfig: PRETTIER_CONFIG_PATH,
      version: 3
    })

    const typesFilePath = path.join(
      GENERATED_SRC_FOLDER,
      `${camelCase(microservice)}.ts`
    )

    await fs.mkdir(GENERATED_SRC_FOLDER, { recursive: true })
    await fs.writeFile(typesFilePath, typesDef, { encoding: 'utf-8' })
  }
}

if (require.main === module) {
  main()
}
