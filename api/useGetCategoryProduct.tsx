import { useEffect, useState } from "react"

export default function useGetCategoryProduct(slug: string | string[] | undefined) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&filters[category][slug][$eq]=${slug}&sort=productName:asc&pagination[limit]=1000`
  
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