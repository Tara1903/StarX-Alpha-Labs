import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Portal & Workspaces — StarX Alpha Labs",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
