import { Layout, Typography } from "antd";
import { VERSION } from "../data/consts";

const { Footer } = Layout;
const { Text, Link } = Typography;

export const PageFooter = () => (
  <Footer style={{ textAlign: "center" }}>
    <Text type="secondary">
      <div>Powered by shinnku</div>
      <div>
        <Text>此版本为<Text code>{VERSION}</Text>正式版</Text>
      </div>
      <div>
        <span>展示源码仅供参考：</span>
        <Link
          target="_blank"
          href="https://github.com/shinnku-nikaidou/upset-gal-web"
        >
          GitHub
        </Link>
      </div>
    </Text>
  </Footer>
);
