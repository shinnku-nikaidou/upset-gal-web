import { Box, Flex } from '@chakra-ui/react'

export default function AppLayout({ isMobile }) {
  return (
    <Flex h="100vh" w="100vw">
      {/* 侧边栏 */}
      <Box w={isMobile ? "80px" : "240px"} bg="gray.200" p={4} h="100vh" position="fixed">
        Sider
      </Box>

      {/* 主内容区，包括顶部栏和内容区 */}
      <Flex direction="column" ml={isMobile ? "80px" : "240px"} w={`calc(100vw - ${isMobile ? "80px" : "240px"})`}>
        {/* 顶部栏 */}
        <Box bg="blue.500" w="full" h="40px" color="white">
          Header
        </Box>

        {/* 内容区 */}
        <Box flex="1" p={4} overflowY="auto">
          Content
        </Box>

        {/* 底部栏 */}
        <Box bg="blue.500" w="full" h="24px" color="white">
          Footer
        </Box>
      </Flex>
    </Flex>
  );
}
