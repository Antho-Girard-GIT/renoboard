import { Ruler, CircleGauge, CircleDollarSign, SquareCheckBig, ScanBarcode,  Settings } from "lucide-react"
 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
 
// Menu items.
const items = [
  {
    title: "Tableau de bord",
    url: "/page/dashboard",
    icon: CircleGauge,
  },
  {
    title: "Budget",
    url: "/page/expense",
    icon: CircleDollarSign,
  },
  {
    title: "Mesures",
    url: "/page/mesures",
    icon: Ruler,
  },
  {
    title: "À faire",
    url: "/page/todo",
    icon: SquareCheckBig,
  },
  {
    title: "Achats",
    url: "/page/buy",
    icon: ScanBarcode,
  },
  {
    title: "Paramètres",
    url: "/auth",
    icon: Settings,
  }
  
]

export default function SideBar() {
  return (
    <Sidebar className="sticky top-8 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 rounded-2xl h-auto mb-8">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-inconsolata">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className="font-luckiest-guy">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
