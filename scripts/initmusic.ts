import * as mm from 'music-metadata'
import * as fse from 'fs-extra'
import sharp from 'sharp'
import { MUSIC_FILES_V1 } from '@/const/music'

import axios from 'axios'
import fs from 'fs'

async function downloadFile(
  url: string,
  outputFilename: string,
): Promise<void> {
  const response = await axios.get(url, {
    responseType: 'stream',
  })

  const writer = fs.createWriteStream(outputFilename)

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

export async function extractCoverFromMusic(
  inputFilePath: string,
  outputJpgPath: string,
): Promise<void> {
  const metadata = await mm.parseFile(inputFilePath)
  const cover = metadata.common.picture && metadata.common.picture[0]

  if (cover) {
    // 使用sharp库将图像数据转换为JPG格式
    const jpgData = await sharp(cover.data).jpeg().toBuffer()
    await fse.writeFile(outputJpgPath, jpgData)
    console.log(`Cover saved to ${outputJpgPath}`)
  } else {
    console.log('No cover found in the music file.')
  }
}
const musicbase = 'data/music/v1/'
const coverbase = 'data/music/v1/cover/'

export async function netease_pic(id: number) {
  const uri = `https://netease.project.ac.cn/song/detail?ids=${id}`
  const response = await axios.get(uri)
  console.log(JSON.stringify(response.data))
  const pic_url: string = response.data.songs[0].al.picUrl
  console.log(pic_url)
  return pic_url
}

export async function netease_id(name: string) {
  const uri = `https://netease.project.ac.cn/search?keywords=${name}&limit=1`
  const response = await axios.get(uri)
  console.log(JSON.stringify(response.data))
  const id: number = response.data.result.songs[0].id
  console.log(id)
  return id
}

// export default async function initmusic() {
//   const file = MUSIC_FILES_V1[0]
//   console.log(file)

//   let name
//   // const musicFilePath = `${musicbase}${file}`
//   if (file.endsWith('.mp3')) {
//     name = file.substring(0, file.length - 4)
//   } else if (file.endsWith('.flac')) {
//     name = file.substring(0, file.length - 5)
//   } else {
//     name = ''
//   }
//   const jpgOutputPath = `${coverbase}${name}.jpg`
//   const id = await netease_id(name)
//   const pic_url = await netease_pic(id)
//   await downloadFile(pic_url, jpgOutputPath)
// }

export default async function initmusic() {
  for (let i = 0; i < MUSIC_FILES_V1.length; i++) {
    const file = MUSIC_FILES_V1[i]
    console.log('\n\n\n-------', file)
    let name
    // const musicFilePath = `${musicbase}${file}`
    if (file.endsWith('.mp3')) {
      name = file.substring(0, file.length - 4)
    } else if (file.endsWith('.flac')) {
      name = file.substring(0, file.length - 5)
    } else {
      name = ''
    }

    const jpgOutputPath = `${coverbase}${name}.jpg`
    try {
      const id = await netease_id(name)
      const pic_url = await netease_pic(id)
      await downloadFile(pic_url, jpgOutputPath)
    } catch (e) {
      console.log(e)
    }
  }
}
