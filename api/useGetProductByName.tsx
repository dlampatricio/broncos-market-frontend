import { useEffect, useState } from "react"

export default function useGetProductByName(slug: string | string[] | undefined) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&filters[productName][$containsi]=${slug}&sort=productName:asc&pagination[limit]=1000`
  
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    (async() => {
      try {
        const res = await fetch(url)
        const json = await res.json()
        setResult(json.data)
        setLoading(false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error)
        setLoading(false)
      }
    })()
  }, [url])

  return { loading, result, error }
}  