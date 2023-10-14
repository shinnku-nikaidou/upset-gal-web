// scripts/genAntdCss.tsx
import fs from 'fs'
import { extractStyle } from '@ant-design/static-style-extract'
import React from 'react'
import { ConfigProvider, theme } from 'antd'

const outputPath = './public/antd.min.css'

const defaultGreenColor = '#52c41a'

const css = extractStyle((node) => (
  <>
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: defaultGreenColor,
          colorLink: defaultGreenColor,
        },
      }}
    >
      {node}
    </ConfigProvider>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: defaultGreenColor,
          colorLink: defaultGreenColor,
        },
      }}
    >
      {node}
    </ConfigProvider>
  </>
))

fs.writeFileSync(outputPath, css)
