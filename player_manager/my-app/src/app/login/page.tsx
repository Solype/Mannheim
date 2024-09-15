"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { login } from "@/service/login"

export default function LoginPage() {
    const [ username, setUsername ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');

    const router = useRouter();

    const handleSubmit = async () => {
        try {
            await login(username, password);
            router.push('/');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Username</Label>
                        <Input id="email" type="email" placeholder="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handleSubmit}>Log in</Button>
                </CardFooter>
            </Card>
        </main>
    );
}
