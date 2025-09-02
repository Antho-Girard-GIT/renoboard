import { SidebarProvider } from "@/components/ui/sidebar"
import SideBar from "./components/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SideBar />
      <main>
        {children}
      </main>
    </SidebarProvider>
  )
}