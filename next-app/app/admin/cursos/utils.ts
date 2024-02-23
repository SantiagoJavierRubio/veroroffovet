import { uploadToCloudinary } from '@/app/_queries/admin/uploadToCloudinary'

export type Files = {
  image?: File
  attachment?: File
}

export async function uploadFiles(files: Files) {
  return Promise.all([
    uploadToCloudinary(files.image),
    uploadToCloudinary(files.attachment)
  ])
}

export async function uploadOneFile(file?: File) {
  return uploadToCloudinary(file)
}
