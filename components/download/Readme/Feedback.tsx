import { Collapse, Space, Typography } from "antd";
import t from "../../languages";

const { Panel } = Collapse;
const { Text, Link } = Typography;

export const Feedback = ({ lang }: { lang: string }) => (
  <Panel
    header={t("Feedback", lang)}
    key="2"
  >
    <Space direction="vertical">
      <Text>
        <span>{t("Click", lang)}</span>
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://t.me/upsetGroup"
        >
          {t("Telegram", lang)}
        </Link>
        <span>{t("Feedback-last", lang)}</span>
      </Text>
    </Space>
  </Panel>
);
