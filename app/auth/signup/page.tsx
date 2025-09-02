import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SignUpForm } from "./signup-form";


export default function SignUpPage() {
    return (
        <Card className="mx-20 md:mx-40 text-center">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
                    <SignUpForm /> 
            </CardContent>
        </Card>
    )
}