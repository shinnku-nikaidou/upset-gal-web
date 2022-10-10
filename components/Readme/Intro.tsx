import { Collapse, Space, Typography } from "antd";
import t from "../../pages/languages";

const { Panel } = Collapse;
const { Text } = Typography;

export const Intro = ({ lang }: { lang: string }) => (
  <Panel
    header={t("Intro", lang)}
    key="1"
  >
    <Space direction="vertical">
      <Text>{t("Intro1", lang)}</Text>
      <Text>{t("Intro2", lang)}</Text>
    </Space>
  </Panel>
);
