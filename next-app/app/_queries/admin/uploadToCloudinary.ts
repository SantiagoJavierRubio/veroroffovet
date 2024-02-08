type CloudinaryResponse = {
  url: string
}

export async function uploadToCloudinary(
  file?: File
): Promise<CloudinaryResponse | undefined> {
  if (!file) return undefined
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'use_filename')
  const res = await fetch(url, { method: 'POST', body: formData })
    .then(res => res.json())
    .catch(err => {
      if (err instanceof Error) throw err
      throw new Error()
    })
  return res
}
