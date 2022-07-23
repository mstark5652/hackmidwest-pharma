/* global localStorage */
import React, { createContext, useState, useEffect } from 'react'

import useFetch from '../../hooks/useFetch/useFetch'

import { generateKeyPair, exportKey, keysFromString } from '../../common/crypto'

export const AppContext = createContext(null)

const LS_PRIVATE_KEY_KEY = 'pouch-priv-key'

const defaultProfile = {
  data: {
    firstName: 'Katy',
    lastName: '',
    activeRx: ['Red Pill','Blue Pill']
  }
}
const defaultKeyPair = {
  publicKey: 'pub-123',
  privateKey: 'priv-123'
}

const AppProvider = ({ children }) => {
  const [settings, setSettings] = useState()
  const [data, setData] = useState(defaultProfile)
  const [keyPair, setKeyPair] = useState(defaultKeyPair)

  const [{ apiResult, error }] = useFetch('https://api-rmtl2t3ega-uc.a.run.app/me') // 'http://localhost:8082/me'
  const [{ }, setPayload] = useFetch('https://api-rmtl2t3ega-uc.a.run.app/me', null, 'PATCH')

  useEffect(() => {
    if (error) {
      console.error('AppProvider.fetch error', error)
    }
  }, [error])

  useEffect(() => {
    if (apiResult) {
      setData(apiResult.data.firstName ? apiResult : defaultProfile)
      // if (!apiResult.data || !apiResult.data.publicKey) {
      //   generateKeyPair().then(handleKeyPair)
      // } else {
      //   // read privateKey from local storage
      //   const privateKeyData = localStorage.getItem(LS_PRIVATE_KEY_KEY)
      //   keysFromString({
      //     privateKey: privateKeyData,
      //     publicKey: apiResult.data.publicKey
      //   }).then(setKeyPair)
      // }
    }
  }, [apiResult])

  const handleKeyPair = keyPair => {
    setKeyPair(keyPair)
    console.log('exporting key pair')
    exportKey(keyPair.privateKey).then(key => localStorage.setItem(LS_PRIVATE_KEY_KEY, key))
    // exportKey(keyPair.publicKey).then(key => setPayload({ publicKey: key }))
  }

  window.appData = {
    settings,
    setSettings,
    data,
    setData,
    keyPair
  }

  function handleUpdate(update){
    //setPayload(update)
    setData({data: Object.assign(data.data, update)})
  }

  return (
    <AppContext.Provider value={{
      settings,
      setSettings,
      data,
      setData,
      keyPair,
      setPayload: handleUpdate
    }}
    >
      {data && children}
    </AppContext.Provider>
  )
}

export default AppProvider
