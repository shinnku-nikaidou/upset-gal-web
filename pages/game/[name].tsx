import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Gal = () => {
  const router = useRouter()
  const { name } = router.query
  console.log(name)

  return <Box>{name}</Box>
}

export default Gal
