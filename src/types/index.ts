export interface NavItem {
  id: string;
  title: string;
  href: string;
  items?: NavItem[];
  collapsed?: boolean;
}

export interface DocSection {
  id: string;
  title: string;
  content: React.ReactNode;
  level: 1 | 2 | 3;
}

export interface CodeExample {
  title?: string;
  language: string;
  code: string;
  filename?: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface Theme {
  isDark: boolean;
  toggle: () => void;
}
