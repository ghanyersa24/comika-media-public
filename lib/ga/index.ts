// log the pageview with their URL

export const pageview = (url: URL): void => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  })
}
type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value: number;
};

export const event = ({
  action, category, label, value,
}: GTagEvent): void => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}
