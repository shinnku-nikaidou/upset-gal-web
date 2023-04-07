import { PageHeader } from '@ant-design/pro-layout';
import t from "../languages";

export const GalPageHeader = (props: { lang: string }) => (
  <PageHeader
    title={<div>{t("Head", props.lang)}</div>}
    subTitle={t("SubHead", props.lang)}
  />
);
