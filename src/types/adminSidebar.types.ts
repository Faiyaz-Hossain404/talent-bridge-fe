export interface SidebarLink {
  name: string;
  path: string;
  icon: string;
}

export interface AdminSidebarProps {
  onWidthChange?: (width: number) => void;
}
