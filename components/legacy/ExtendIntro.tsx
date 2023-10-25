import {
  Box,
  Card,
  CardBody,
  VStack,
  Text,
  Heading,
  Button,
  Stack,
  Image,
} from '@chakra-ui/react'
import Link from 'next/link'

const Card1 = () => {
  return (
    <Card>
      <CardBody>
        <Stack mt='6' spacing='2'>
          <Heading size='md'>萌新必读QAQ</Heading>
          <Text>
            此篇内容介绍了如何记住小站网址，接下来的部分则讲述了如何使用本站点。
          </Text>
          <Link href={'extend/docs/instructions/for-beginners'} target='_blank'>
            <Button fontWeight='bold' variant='outline'>
              查看全部
            </Button>
          </Link>
        </Stack>
      </CardBody>
    </Card>
  )
}

const Card2 = () => {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '200px' }}
        src='assets/cards/card2.png'
        alt='Caffe Latte'
        zIndex={20}
      />

      <Stack>
        <CardBody>
          <Heading size='md'>十二神器——究竟是什么作品有资格成为神器</Heading>

          <Text py='2'>这次，就让我们一起来见识一下十二神器“神”在哪里？</Text>
          <Text py='2'>
            “次元囚笼”“血池轮回”“虚拟终点”这些称号究竟是怎么命名出来的？
          </Text>
          <Text py='2'>十二神器，究竟是讲了个什么故事？</Text>

          <Link href={'extend/blog/12-shen-qi-and-why-is-it'} target='_blank'>
            <Button fontWeight='bold' variant='outline'>
              查看原文
            </Button>
          </Link>
        </CardBody>
      </Stack>
    </Card>
  )
}

const Card3 = () => {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '200px' }}
        src='assets/cards/card3.jpeg'
        alt='Caffe Latte'
        zIndex={20}
      />

      <Stack>
        <CardBody>
          <Heading size='md'>
            萌新向：你爷爷奶奶都能上手的手机galgame游玩教程
          </Heading>

          <Text py='2'>
            如果参考教程后仍然失败可能是你手机太高级了，不是你人的问题应该是这样的
            :doge
          </Text>
          <Text py='2'>如果是这种情况咱推荐你别玩了，咱大可以不受这个气.</Text>
          <Text py='2'>本文提到的部分软件均可在站内 tools 下载</Text>
          <Text py='2'>本文提到的手机若无特殊说明为 Android系统</Text>

          <Link
            href={'extend/blog/open-android-galgame-blog-post'}
            target='_blank'
          >
            <Button fontWeight='bold' variant='outline'>
              查看原文
            </Button>
          </Link>
        </CardBody>
      </Stack>
    </Card>
  )
}

const ExtendIntro = () => {
  return (
    <VStack spacing='24px' align='stretch'>
      <Box>
        <Card1 />
      </Box>
      <Box>
        <Card2 />
      </Box>
      <Box>
        <Card3 />
      </Box>
    </VStack>
  )
}

export default ExtendIntro
