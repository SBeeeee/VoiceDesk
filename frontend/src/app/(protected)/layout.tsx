import ProtectedLayout from "@/src/utils/ProtectedLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}