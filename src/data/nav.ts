export const NAV_LINKS = [
  { label: "Resource Library", href: "/resources" },
  { label: "Explainers", href: "/explainers" },
  { label: "For Educators", href: "/for-educators" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINK_GROUPS = [
  {
    heading: "Explore",
    links: [
      { label: "Resource Library", href: "/resources" },
      { label: "Explainers", href: "/explainers" },
      { label: "My Library", href: "/my-library" },
    ],
  },
  {
    heading: "For Educators",
    links: [
      { label: "For Educators", href: "/for-educators" },
      { label: "Lesson Plans", href: "/resources?type=Lesson+Plan" },
      { label: "Discussion Guides", href: "/resources?type=Discussion+Guide" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;
