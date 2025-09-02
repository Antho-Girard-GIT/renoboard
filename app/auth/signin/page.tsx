import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { SignInForm } from "@/app/auth/signin/login-form"

export default function SignInPage() {
  return (
    <Card className="mx-20 md:mx-40 text-center">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  )
}
