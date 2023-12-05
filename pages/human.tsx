import React, { useRef } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import type { TurnstileInstance } from '@marsidev/react-turnstile'
import { Box, Text, Button, Container, VStack, Heading } from '@chakra-ui/react'
import config from '@/config'

export async function getStaticProps() {
  // Call an external API endpoint to get posts

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      sitekey: config.CLOUDFLARE.Turnstile.SiteKey,
    },
  }
}

const CaptchaVerification = ({ sitekey }: { sitekey: string }) => {
  const ref = useRef<TurnstileInstance>(null)

  const handleClick = () => {
    console.log('成功')
    const cfValidation = ref.current?.getResponse()
    const url =
      window.location.origin +
      window.location.search.substring(10) +
      `?cf=${cfValidation}`
    window.open(url)
  }

  return (
    <Container centerContent>
      <VStack spacing={4} marginY={8}>
        <Heading as='h1' size='xl'>
          人机验证
        </Heading>
        <Box borderWidth='1px' borderRadius='lg' padding={4} width='100%'>
          <Text fontSize='md'>
            由于高流量以及持续不断接近9个月的ddos攻击, 我们不得不启用人机验证,
            请等待, 勿关闭此页面
          </Text>
          <Box borderWidth='1px' borderRadius='lg' padding={4} marginY={4}>
            <Turnstile
              ref={ref}
              siteKey={sitekey}
              options={{
                language: 'zh-CN',
              }}
              onSuccess={() => {
                handleClick()
              }}
            />
          </Box>
          <Text fontSize='md'>
            当您验证通过✅时, 页面就会自动跳转到下载, 请给予浏览器允许弹窗权限
          </Text>
        </Box>
      </VStack>
    </Container>
  )
}

export default CaptchaVerification
