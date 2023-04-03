import { getParamValue } from "./commonFunctions";

export const DEFAULT_DATE_RANGE = [
  getParamValue("startDate") ?? "2021-01-01",
  getParamValue("endDate") ?? "2021-01-31",
];

export const DEFAULT_TABLE_COLUMNS = [
  {
    key: "date",
    pos: 0,
    isVisible: true,
    title: "Date",
  },
  {
    key: "app_id",
    pos: 1,
    isVisible: true,
    title: "Apps",
  },
  {
    key: "requests",
    pos: 2,
    isVisible: eval(getParamValue("requestsCol")) ?? true,
    title: "Requests",
  },
  {
    key: "responses",
    pos: 3,
    isVisible: eval(getParamValue("responsesCol")) ?? true,
    title: "Responses",
  },
  {
    key: "impressions",
    pos: 4,
    isVisible: eval(getParamValue("impressionsCol")) ?? true,
    title: "Impressions",
  },
  {
    key: "clicks",
    pos: 5,
    isVisible: eval(getParamValue("clicksCol")) ?? true,
    title: "Clicks",
  },
  {
    key: "revenue",
    pos: 6,
    isVisible: eval(getParamValue("revenueCol")) ?? true,
    title: "Revenue",
  },
  {
    key: "fillRate",
    pos: 7,
    isVisible: eval(getParamValue("fillRateCol")) ?? true,
    title: "Fill Rate",
  },
  {
    key: "ctr",
    pos: 8,
    isVisible: eval(getParamValue("ctrCol")) ?? true,
    title: "CTR",
  },
];
