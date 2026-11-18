import { readdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import jsonfile from 'jsonfile'
import { handleHTMLString } from './utils'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const rawDataDir = resolve(__dirname, 'raw')
const dataDir = resolve(__dirname, 'done')

type RawAffix = {
  Name: string
  Level: string
  ModGenerationTypeID: string
  ModFamilyList: string[]
  DropChance: string
  str: string
  fossil_no: string[]
  adds_no: string[]
  spawn_no: string[]
  mod_no: string[]
  mod_fossil_item: string[]
  hover: string
}

type RawDataFile = {
  normal: RawAffix[]
}

export type Affix = {
  name: string
  isPrefix: boolean
  id: string
  tags: string[]
  dropChance: number
  level: number
}

export type DataFile = {
  normal: Affix[]
}

async function transformAllRawDataFiles() {
  try {
    const files = await readdir(rawDataDir)
    const jsonFiles = files.filter((file) => file.endsWith('.json'))

    for (const file of jsonFiles) {
      const inputPath = join(rawDataDir, file)
      const outputPath = join(dataDir, file)

      console.log(`Processing ${inputPath}`)

      const rawDataFile = (await jsonfile.readFile(inputPath)) as RawDataFile

      const fileContent = {
        normal: rawDataFile.normal.map(createAffix),
      }

      await jsonfile.writeFile(outputPath, fileContent, { spaces: 2 })
    }

    console.log('All raw files processed successfully.')
  } catch (error) {
    console.error('An error occurred during processing:', error)
    process.exit(1)
  }
}

function createAffix(rawAffix: RawAffix): Affix {
  return {
    name: handleHTMLString(rawAffix.str),
    id: rawAffix.ModFamilyList?.[0] || '',
    isPrefix: rawAffix.ModGenerationTypeID === '1',
    tags: rawAffix.mod_no.map((rawTag) => handleHTMLString(rawTag)),
    dropChance: Number(rawAffix.DropChance),
    level: Number(rawAffix.Level),
  }
}

transformAllRawDataFiles()
