/* global crypto */
const arrayBufferToBase64 = (arrayBuffer) => {
  const byteArray = new Uint8Array(arrayBuffer)
  let byteString = ''
  for (let i = 0; i < byteArray.byteLength; i++) {
    byteString += String.fromCharCode(byteArray[i])
  }
  const b64 = window.btoa(byteString)

  return b64
}

const base64ToArrayBuffer = base64 => {
  const binaryString = window.atob(base64)
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes.buffer
}

export const addNewLines = (str) => {
  let finalString = ''
  while (str.length > 0) {
    finalString += str.substring(0, 64) + '\n'
    str = str.substring(64)
  }

  return finalString
}

export const toPem = (privateKey) => {
  const b64 = addNewLines(arrayBufferToBase64(privateKey))
  const pem = '-----BEGIN PRIVATE KEY-----\n' + b64 + '-----END PRIVATE KEY-----'

  return pem
}

export const generateKeyPair = async () => {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048, // can be 1024, 2048 or 4096
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: { name: 'SHA-256' } // or SHA-512
    },
    true,
    ['encrypt', 'decrypt']
  )

  return keyPair
}

export const exportKey = async (data) => {
  const exported = await crypto.subtle.exportKey(
    'pkcs8',
    data
  )
  return arrayBufferToBase64(exported)
}

export const privateKeyFromString = async (privateKeyData) => {
  const bytes = base64ToArrayBuffer(privateKeyData)
  const data = await crypto.subtle.importKey('pkcs8', bytes, 'RSA-OAEP', true, ['decrypt'])
  return data
}

export const publicKeyFromString = async (publicKeyData) => {
  const bytes = base64ToArrayBuffer(publicKeyData)
  const data = await crypto.subtle.importKey('pkcs8', bytes, 'RSA-OAEP', true, ['encrypt'])
  return data
}

export const keysFromString = async ({ privateKey, publicKey }) => {
  const priv = await privateKeyFromString(privateKey)
  const pub = await publicKeyFromString(publicKey)
  return { privateKey: priv, publicKey: pub }
}
