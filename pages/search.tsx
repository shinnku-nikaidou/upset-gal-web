import React from 'react'
import { useRouter } from 'next/router'

const SearchAns = () => {
  const router = useRouter()
  const { q } = router.query
  console.log(q)

  return <>{q}</>
}

export default SearchAns
