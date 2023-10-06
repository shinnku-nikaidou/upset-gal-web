// scripts/genAntdCss.tsx
import fs from 'fs';
import { extractStyle } from '@ant-design/static-style-extract';

const outputPath = './public/antd.min.css';

const css = extractStyle();

fs.writeFileSync(outputPath, css);
