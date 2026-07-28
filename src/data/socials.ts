export interface SocialLink {
  type: "instagram" | "facebook" | "x" | "youtube";
  label: string;
  href: string;
}

// TODO: replace with the artist's real social profile URLs.
export const socials: SocialLink[] = [
  { type: "instagram", label: "Instagram", href: "https://instagram.com/akogharib" },
  { type: "facebook", label: "Facebook", href: "https://facebook.com/akogharib" },
  { type: "x", label: "X / Twitter", href: "https://x.com/akogharib" },
  { type: "youtube", label: "YouTube", href: "https://youtube.com/@akogharib" },
];
