// Generated from https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/05/05

export type OnThisDayAllResponse = {
  title: string;
  description: string;
  wikipedia: string;
  selected: OnThisDayEvent[];
  births: OnThisDayEvent[];
  deaths: OnThisDayEvent[];
  events: OnThisDayEvent[];
  holidays: OnThisDayEvent[];
};

export type OnThisDayEvent = {
  year?: number;
  pages: Page[];
  text: string;
};

export type Page = {
  type: string;
  title: string;
  displaytitle: string;
  namespace: number;
  wikibase_item: string;
  titles: Titles;
  pageid: number;
  thumbnail?: Thumbnail;
  originalimage?: Originalimage;
  lang: string;
  dir: string;
  revision: string;
  content_urls: ContentUrls;
  extract: string;
  extract_html: string;
};

export type Titles = {
  canonical: string;
  normalized: string;
  display: string;
};

export type Thumbnail = {
  source: string;
  width: number;
  height: number;
};

export type Originalimage = {
  source: string;
  width: number;
  height: number;
};

export type ContentUrls = {
  desktop: Desktop;
  mobile: Mobile;
};

export type Desktop = {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
};

export type Mobile = {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
};
