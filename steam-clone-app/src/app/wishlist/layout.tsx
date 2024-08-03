import ServerProtectedComponents from "@/components/ServerProtectComponent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ServerProtectedComponents>{children}</ServerProtectedComponents>
    </div>
  );
}
