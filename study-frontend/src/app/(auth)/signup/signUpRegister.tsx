"use client";  // 클라이언트 사이드 렌더링을 위한 지시자

import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";

// 회원가입에 필요한 데이터 타입 정의
interface SignUpRegisterProps {
    data: {
        name: string;      // 사용자 이름
        company: string;   // 회사명
        email: string;     // 이메일
        password: string;  // 비밀번호
    };
}

// 객체의 모든 값이 빈 문자열인지 확인하는 유틸리티 함수
export function isEmptyValues(obj: Record<string, unknown>): boolean {
    return Object.values(obj).every(value => value === '');
}

export default function SignUpRegister({data}: SignUpRegisterProps) {
    const router = useRouter();  // Next.js 라우터

    // 상태 관리
    const [isRegistering, setIsRegistering] = useState(false);    // 회원가입 진행 중 여부
    const [isSuccess, setIsSuccess] = useState(false);            // 회원가입 성공 여부
    const [countdown, setCountdown] = useState(3);                // 리다이렉트 카운트다운

    // ref를 통한 값 관리 (리렌더링에 영향을 주지 않는 값들)
    const hasRegistered = useRef(false);                         // 중복 등록 방지 플래그
    const timerRef = useRef<NodeJS.Timeout>();                   // 카운트다운 타이머 참조

    // 회원가입 API 호출 및 처리 함수
    const fn_registerUser = async () => {
        // 중복 요청 방지
        if (hasRegistered.current || isRegistering || isSuccess) return;

        hasRegistered.current = true;  // 등록 진행 중 표시
        setIsRegistering(true);        // 로딩 상태 활성화

        try {
            // API 요청 수행
            const response = await fetch("/api/registerUserInfo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.status === 200) {
                // 응답 텍스트 파싱 시도
                const responseText = await response.text();
                console.log("서버 응답:", responseText);

                let result;
                try {
                    result = JSON.parse(responseText);  // JSON 파싱 시도
                } catch {
                    result = responseText;              // 일반 텍스트로 처리
                }

                console.log("회원가입 성공:", result);
                setIsSuccess(true);  // 성공 상태로 변경
            } else {
                throw new Error(`서버 응답 오류: ${response.status}`);
            }
        } catch (error) {
            console.error("회원가입 실패:", error);
            alert("회원가입 처리 중 오류가 발생했습니다.");
            // 에러 발생 시 상태 초기화
            setIsRegistering(false);
            hasRegistered.current = false;
        }
    };

    // 컴포넌트 마운트 시 실행되는 효과
    useEffect(() => {
        // 데이터 유효성 검사
        if (isEmptyValues(data)) {
            alert("회원가입 정보가 없습니다.");
            setTimeout(() => {
                router.push('/signup');  // 회원가입 페이지로 리다이렉트
            }, 0);
            return;
        }

        fn_registerUser();  // 회원가입 처리 시작
    }, []);  // 최초 마운트 시에만 실행

    // 회원가입 성공 시 카운트다운 처리
    useEffect(() => {
        if (isSuccess) {
            // 3초 카운트다운 시작
            timerRef.current = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);  // 타이머 정리
                        setTimeout(() => {
                            router.push('/');  // 메인 페이지로 리다이렉트
                        }, 0);
                        return 0;
                    }
                    return prev - 1;  // 카운트다운 감소
                });
            }, 1000);
        }

        // 컴포넌트 언마운트 시 타이머 정리
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
            clearInterval(timerRef.current);  // 타이머 정리
        }
        router.push('/');  // 메인 페이지로 즉시 이동
    };

    // UI 렌더링
    return (
        <div className="mt-4 text-center">
            {isSuccess ? (
                // 회원가입 성공 시 UI
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
                // 회원가입 진행 중 UI
                <div className="space-y-4">
                    <h2>회원가입 처리 중입니다...</h2>
                    <p>잠시만 기다려주세요.</p>
                </div>
            )}
        </div>
    );
}