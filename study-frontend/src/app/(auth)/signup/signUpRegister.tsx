"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface SignUpRegisterProps {
    data: {
        name: string;
        company: string;
        email: string;
        password: string;
    };
}

export function isEmptyValues(obj: Record<string, unknown>): boolean {
    return Object.values(obj).every(value => value === '');
}

export default function SignUpRegister({ data }: SignUpRegisterProps) {
    const router = useRouter();
    const [isRegistering, setIsRegistering] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const hasRegistered = useRef(false);
    const timerRef = useRef<NodeJS.Timeout>();

    // 회원가입 처리 함수
    const fn_registerUser = async () => {
        if (hasRegistered.current || isRegistering || isSuccess) return;
        
        hasRegistered.current = true;
        setIsRegistering(true);

        try {
            const response = await fetch("/api/registerUserInfo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.status === 200) {
                const responseText = await response.text();
                console.log("서버 응답:", responseText);

                let result;
                try {
                    result = JSON.parse(responseText);
                } catch {
                    result = responseText;
                }
                
                console.log("회원가입 성공:", result);
                setIsSuccess(true);
            } else {
                throw new Error(`서버 응답 오류: ${response.status}`);
            }
        } catch (error) {
            console.error("회원가입 실패:", error);
            alert("회원가입 처리 중 오류가 발생했습니다.");
            setIsRegistering(false);
            hasRegistered.current = false;
        }
    };

    // 최초 마운트 시 데이터 체크 및 회원가입 처리
    useEffect(() => {
        if(isEmptyValues(data)) {
            alert("회원가입 정보가 없습니다.");
            setTimeout(() => {
                router.push('/signup');
            }, 0);
            return;
        }
        
        fn_registerUser();
    }, []);

    // 카운트다운 처리
    useEffect(() => {
        if (isSuccess) {
            timerRef.current = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        setTimeout(() => {
                            router.push('/');
                        }, 0);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isSuccess, router]);

    // 확인 버튼 클릭 핸들러
    const fn_handleConfirm = (e: React.MouseEvent) => {
        e.preventDefault();
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        router.push('/');
    };

    return (
        <div className="mt-4 text-center">
            {isSuccess ? (
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-green-600">
                            회원가입이 완료되었습니다!
                        </h2>
                        <div className="space-y-2">
                            <p className="text-lg">환영합니다, {data.name}님!</p>
                            <p>가입하신 정보는 다음과 같습니다:</p>
                            <div className="text-gray-600 space-y-1">
                                <p>이름: {data.name}</p>
                                <p>회사: {data.company}</p>
                                <p>이메일: {data.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                            {countdown}초 후 자동으로 메인 페이지로 이동합니다
                        </p>
                        <button 
                            onClick={fn_handleConfirm}
                            className="px-6 py-2 bg-blue-500 text-white rounded 
                                     hover:bg-blue-600 transition-colors"
                        >
                            확인
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <h2>회원가입 처리 중입니다...</h2>
                    <p>잠시만 기다려주세요.</p>
                </div>
            )}
        </div>
    );
}