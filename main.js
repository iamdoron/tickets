// import Jimp from 'jimp'
const Jimp = require('jimp')
const Mkdirp = require('mkdirp')
const Path = require('path')
const _ = require('lodash')

main().catch(console.error)

async function main() {
  const filePath = process.argv[2]
  const maxLines = 16
  const maxSits = 40
  const linePos = {
    x: 855,
    y: 800
  }
  const sitPos = {
    x: 990,
    y: 800
  }
  const startedAt = new Date()
  const outputDir = './tickets_' + startedAt.toISOString().replace(/[-:]/g, '')
  Mkdirp.sync(outputDir)
  const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK)
  const template = await Jimp.read(filePath)
  
  for (const line of _.range(1, maxLines + 1)) {
    for (const sit of _.range(1, maxSits + 1)) {
      await template.clone()
        .print(font, linePos.x, linePos.y, {
          text: line.toString(),
        })
        .print(font, sitPos.x, sitPos.y, {
          text: sit.toString(),
        })
        .writeAsync(Path.join(outputDir, `l${line.toString().padStart(4, '0')}_s${sit.toString().padStart(4, '0')}.${template.getExtension()}`))
    }
  }
}