import { PageHeader } from "antd";
import t from "../pages/languages";

export const GalPageHeader = (props: { lang: string }) => (
  <PageHeader
    title={<div>{t("Head", props.lang)}</div>}
    subTitle={t("SubHead", props.lang)}
  />
);
