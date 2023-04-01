// src/pages/analytics
export const DEFAULT_DATE_RANGE = [
  new URLSearchParams(window.location.search).get("startDate") ?? "2021-01-01",
  new URLSearchParams(window.location.search).get("endDate") ?? "2021-01-31",
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
    title: "App",
  },
  {
    key: "requests",
    pos: 2,
    isVisible:
      eval(new URLSearchParams(window.location.search).get("requests")) ?? true,
    title: "Requests",
  },
  {
    key: "responses",
    pos: 3,
    isVisible:
      eval(new URLSearchParams(window.location.search).get("responses")) ??
      true,
    title: "Responses",
  },
  {
    key: "impressions",
    pos: 4,
    isVisible:
      eval(new URLSearchParams(window.location.search).get("impressions")) ??
      true,
    title: "Impressions",
  },
  {
    key: "clicks",
    pos: 5,
    isVisible:
      eval(new URLSearchParams(window.location.search).get("clicks")) ?? true,
    title: "Clicks",
  },
  {
    key: "revenue",
    pos: 6,
    isVisible:
      eval(new URLSearchParams(window.location.search).get("revenue")) ?? true,
    title: "Revenue",
  },
  {
    key: "fillRate",
    pos: 7,
    isVisible:
      eval(new URLSearchParams(window.location.search).get("fillRate")) ?? true,
    title: "Fill Rate",
  },
  {
    key: "ctr",
    pos: 8,
    isVisible:
      eval(new URLSearchParams(window.location.search).get("ctr")) ?? true,
    title: "CTR",
  },
];
