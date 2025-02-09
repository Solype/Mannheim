"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoginService from "@/services/LoginService";

const initialFormState = {
    username: "",
    password: "",
};

export default function LoginPage() {
    const [formData, setFormData] = useState(initialFormState);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.username || !formData.password) {
            setError("Please fill out all fields.");
            return;
        }

        try {
            await LoginService.login(formData.username, formData.password);
            navigate('/characters');
        } catch (error) {
            setError("Error logging in. Please try again.");
            console.error('Error logging in:', error);
        }
    };

    return (
        <main className="relative flex min-h-screen w-full flex-col items-center justify-center">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/bg-login.png)' }} />
            <div className="absolute inset-0 bg-black opacity-30" />
            <div className="absolute gap-5 flex flex-col items-center z-50 p-14 max-w-sm w-full bg-cover bg-center rounded-lg" style={{ backgroundImage: 'url(/parchemin.png)', backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: 'center' }}>
                <CardHeader>
                    <p className="text-3xl font-bold text-foret">Login</p>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-3">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input 
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                className="border border-black"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="border border-black"
                                required
                            />
                        </div>
                        {error && <CardDescription className="text-red-500">{error}</CardDescription>}
                        <CardFooter>
                            <Button className="w-full mt-5 text-xl bg-foret p-6 hover:bg-light_foret hover:shadow-[0_0_10px_4px_rgba(255,255,255,0.7)] transition-all duration-300" type="submit">
                                <img src="/ring.png" alt="sword" className="w-6 h-6 mr-2" />
                                Login
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
                <Link to="/register" className="text-black hover:underline tracking-normal font-serif">Don't have an account? Register</Link>
            </div>
        </main>
    );
}
