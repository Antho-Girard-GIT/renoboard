import { getUser } from "@/lib/auth-server"
import SignInPage from "./signin/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default async function AuthPage() {
  const user = await getUser();

  if (!user) {
    return SignInPage();
  }
  return (
    <div className="mx-20 md:mx-40">
    <Card>
        <CardHeader>
          <CardTitle>Profil d&apos;utilisateur</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="grid gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Nom d&apos;utilisateur</span>
            <span>{user.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Courriel</span>
            <span>{user.email}</span>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}
