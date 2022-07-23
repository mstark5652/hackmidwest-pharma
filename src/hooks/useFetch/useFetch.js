import { useState, useEffect } from 'react'

const useFetch = (initialUrl, initialPayload, method = 'GET') => {
  const [url, setUrl] = useState(initialUrl)
  const [payload, setPayload] = useState(initialPayload)
  const [apiResult, setApiResult] = useState(undefined)
  const [res, setRes] = useState(undefined)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setError(null)
      setLoading(false)
      if (url && (method === 'GET' || payload)) {
        try {
          setLoading(true)
          const res = await window.fetch(url, {
            method,
            headers: { 'content-type': 'application/json' },
            body: payload && JSON.stringify(payload)
          })

          setRes(res)

          if (!res.ok) {
            try {
              const errorText = await res.text()
              console.error('useFetch', { res, error: errorText })
              try {
                const parsedError = JSON.parse(errorText)
                setError(parsedError)
              } catch (err) {
                setError({ message: errorText })
              }
            } catch (err) {
              setError({ message: 'An unknown error occurred' })
            }

            return
          }

          const contentType = res.headers.get('content-type')
          const isJson = contentType && contentType.indexOf('application/json') !== -1
          const result = await (isJson ? res.json() : res.text())
          setApiResult(result)
        } catch (err) {
          setError(err)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchData()
  }, [payload, url, refresh])

  const handleRefresh = () => {
    setRefresh(prev => prev + 1)
  }

  const clear = () => {
    setApiResult()
    setUrl()
    setPayload()
    setError()
    setLoading()
  }

  return [{ apiResult, isLoading, error, res, handleRefresh, clear }, setPayload, setUrl]
}

export default useFetch
