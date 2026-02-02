
export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileName', file.name);
  const url = 'https://upload.imagekit.io/api/v1/files/upload'
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
    headers: {
      // 'Content-Type': 'multipart/form-data',
      'Authorization': `Basic cHJpdmF0ZV94dmtlMThVRHJZUk9iODRqSS9jdTBVSTVOSDA9Og==`
    }
  });
  const data = await response.json();
  return data.url;
}