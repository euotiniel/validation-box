import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Globe, Twitter, Package } from "lucide-react";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <>📦 Valdation Box</>,
  },
  githubUrl: 'https://github.com/euotiniel/validation-box',
  // i18n: true,
  links: [
    {
      text: "Documentation",
      url: "/docs/introduction",
      active: "nested-url",
    },
    {
      type: 'icon',
      icon: <Globe />,
      text: 'X',
      url: 'https://euotiniel.com/',
      secondary: true,
    },
    {
      type: 'icon',
      icon: <Package />,
      text: 'npm',
      url: 'https://www.npmjs.com/package/validation-box',
      secondary: true,
    },
    {
      type: 'icon',
      icon: <Twitter />,
      text: 'X',
      url: 'https://x.com/euotiniel',
      secondary: true,
    },
  ],
  
};
