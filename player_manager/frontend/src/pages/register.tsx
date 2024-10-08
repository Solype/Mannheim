"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LoginService from "@/service/login"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RegisterPage() {

    const [ username, setUsername ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ confirm, setConfirm ] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            if (password !== confirm) {
                throw new Error('Passwords do not match');
            }
            await LoginService.register(username, password);
            router.push('/login');
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Register</CardTitle>
                    <CardDescription>
                        Enter your username below and your password to create an account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" type="username" placeholder="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Confirm Password</Label>
                        <Input id="confirm" type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)}/>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handleSubmit}>Register</Button>
                </CardFooter>
            </Card>
        </main>
    );
}
