import { Layout, Typography } from 'antd'
import { VERSION } from '../../data/consts'

const { Footer } = Layout
const { Text, Link } = Typography

export const PageFooter = (props: { lang: string }) => (
  <Footer style={{ textAlign: 'center' }}>
    <Text type='secondary'>
      <div>Powered by shinnku</div>
      <div>
        <Text>
          此版本为<Text code>{VERSION}</Text>正式版
        </Text>
      </div>
      <div>
        <span>
          注：
          <Link
            target='_blank'
            href='https://github.com/shinnku-nikaidou/upset-gal-web'
          >
            源码
          </Link>
          展示出来仅供参考
        </span>
      </div>
    </Text>
  </Footer>
)
