import React, { useRef, useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import type { TurnstileInstance } from '@marsidev/react-turnstile'
import { Box, Text, Button, Container, VStack, Heading } from '@chakra-ui/react'
import config from '@/config'

export async function getStaticProps() {
  return {
    props: {
      sitekey: config.CLOUDFLARE.Turnstile.SiteKey,
    },
  }
}

const CaptchaVerification = ({ sitekey }: { sitekey: string }) => {
  const ref = useRef<TurnstileInstance>(null)
  const [show, setShow] = useState(false)
  const [url, setUrl] = useState('https://shinnku.com')

  const handleClick = () => {
    console.log('成功')
    const cfValidation = ref.current?.getResponse()
    const url =
      window.location.origin +
      window.location.search.substring(10) +
      `?cf=${cfValidation}`
    setShow(true)
    setUrl(url)
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
            由于高流量以及持续不断12个月的ddos攻击,
            我们不得不启用人机验证以减少流量, 请等待, 勿关闭此页面,
            如果失败请下拉刷新, 如果人机验证框无法显示请更换网络环境
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
        {show && (
          <a href={url} target='_blank' rel='noreferrer'>
            <Button colorScheme='blue' size='md'>
              手动跳转
            </Button>
          </a>
        )}
      </VStack>
    </Container>
  )
}

export default CaptchaVerification
