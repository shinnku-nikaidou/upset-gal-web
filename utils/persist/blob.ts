import localforage from 'localforage'

export async function saveFile(file: File, name: string): Promise<void> {
  try {
    const fileBlob = new Blob([file], { type: file.type })

    // Use localforage to save the file to IndexedDB
    await localforage.setItem(name, fileBlob)
    console.log('File saved!')
  } catch (error) {
    console.error('Error saving file:', error)
  }
}

export async function getFile(name: string): Promise<Blob | null> {
  try {
    const fileBlob = await localforage.getItem<Blob>(name)
    if (fileBlob) {
      // Create a URL for accessing stored files
      const fileUrl = URL.createObjectURL(fileBlob)
      console.log(fileUrl)
      return fileBlob
    } else {
      console.log('No file found')
      return null
    }
  } catch (error) {
    console.error('Error reading file:', error)
    return null
  }
}
