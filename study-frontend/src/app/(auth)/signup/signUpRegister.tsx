"use client";

import { useEffect } from "react";

interface SignUpRegisterProps {
    data: {
        name: string;
        company: string;
        email: string;
        password: string;
    };
}

export default function SignUpRegister({ data }: SignUpRegisterProps) {
    useEffect(() => {
        console.log("Received data:", data);
    }, [data]);
    return (
        <div className="mt-4 text-center">
            <h2>Thank you for registering, {data.name}!</h2>
            <p>We&#39;ve received your details from {data.company}.</p>
            <p>A confirmation email has been sent to {data.email}.</p>
        </div>
    );
}