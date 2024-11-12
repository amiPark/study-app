"use client"; // 클라이언트 사이드 렌더링을 위한 지시어

import { useEffect } from "react";

// 회원가입 데이터를 위한 인터페이스 정의
interface SignUpRegisterProps {
    data: {
        name: string;      // 사용자 이름
        company: string;   // 회사명
        email: string;     // 이메일 주소
        password: string;  // 비밀번호
    };
}

// 회원가입 완료 후 표시되는 컴포넌트
export default function SignUpRegister({ data }: SignUpRegisterProps) {
    // 컴포넌트가 마운트될 때 데이터 로깅
    useEffect(() => {
        console.log("Received data:", data);
            //비동기 호출로 유저 정보 저장
        async function registerUserInfo() {
            const response = await fetch("/api/registerUserInfo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("User registered successfully:", result);
            } else {
                console.error("Failed to register user:", response.statusText);
            }
        }

        // `data`가 존재할 경우에만 `registerUserInfo` 호출
        if (data) {
            registerUserInfo();
        }
    }, [data]);

    // 회원가입 완료 메시지 렌더링
    return (
        <div className="mt-4 text-center">
            <h2>Thank you for registering, {data.name}!</h2>
            <p>We&#39;ve received your details from {data.company}.</p>
            <p>A confirmation email has been sent to {data.email}.</p>
        </div>
    );
}
