import { Metadata } from "next";
import { AdminPortalClient } from "./AdminPortalClient";

export const metadata: Metadata = {
  title: "Admin Operations & Demo Management Console — StarX Alpha Labs",
  description: "Administrative control center: Manage 160 demo models, lead pipeline CRM, quotations, and 8-stage client projects.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminPortalClient />;
}
