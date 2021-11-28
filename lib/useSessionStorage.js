import { useState, useEffect } from 'react'

const useSessionStorage = name => {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem(name)) {
      setValue(sessionStorage.getItem(name))
    } else {
      sessionStorage.setItem(name, true)
    }
  }, [])

  return value
}

export default useSessionStorage
