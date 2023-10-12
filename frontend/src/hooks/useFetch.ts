import { useEffect, useState } from 'react'

export function useFetch(url: string): { data: string[] } {
  const [data, setData] = useState<string[]>(['a'])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data: string[] = await response.json()
        setData(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [url])

  return { data }
}