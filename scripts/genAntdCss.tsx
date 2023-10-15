// scripts/genAntdCss.tsx
import fs from 'fs'
import { extractStyle } from '@ant-design/static-style-extract'
import React from 'react'
import { ConfigProvider } from 'antd'
import { defaultGreenColor } from '../const/theme'

const outputPath = './styles/antd.min.css'

const css = extractStyle((node) => (
  <>
    <ConfigProvider
      theme={{
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
