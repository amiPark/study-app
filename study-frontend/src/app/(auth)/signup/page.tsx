// page.tsx
"use client"; // 클라이언트 컴포넌트로 설정

import React, { useState } from "react";
import SignUpRegister from "./signUpRegister";
import Link from "next/link";

export default function SignUp() {
  // 상태의 타입을 지정하여 초기화
  const [formData, setFormData] = useState<{
    name: string;
    company: string;
    email: string;
    password: string;
  } | null>(null);

  // Register 버튼 클릭 시 데이터 설정
  const handleRegisterClick = (e: React.MouseEvent<HTMLButtonElement>)  => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    const data = {
      //!를 사용하면 TypeScript가 해당 요소가 null이 아님을 보장하게 됩니다. 하지만 요소가 실제로 존재하지 않을 경우 런타임 오류가 발생할 수 있다.
      name: (document.getElementById("name")! as HTMLInputElement).value,
      company: (document.getElementById("company")! as HTMLInputElement).value,
      email: (document.getElementById("email")! as HTMLInputElement).value,
      password: (document.getElementById("password")! as HTMLInputElement).value,
    };
    setFormData(data);
  };

  return (
      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-12 md:py-20">
            <div className="pb-12 text-center">
              <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
                Create an account
              </h1>
            </div>

            {/* SignUpRegister 컴포넌트에 데이터 전달 */}
            {formData && <SignUpRegister data={formData} />}

            <form className="mx-auto max-w-[400px]">
              <div className="space-y-5">
                <div>
                  <label className="mb-1 block text-sm font-medium text-indigo-200/65" htmlFor="name">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input id="name" type="text" className="form-input w-full" placeholder="Your full name" required />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-indigo-200/65" htmlFor="company">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input id="company" type="text" className="form-input w-full" placeholder="Your company name" required />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-indigo-200/65" htmlFor="email">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <input id="email" type="email" className="form-input w-full" placeholder="Your work email" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-200/65" htmlFor="password">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input id="password" type="password" className="form-input w-full" placeholder="Password (at least 10 characters)" />
                </div>
              </div>
              <div className="mt-6 space-y-5">
                <button
                    className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
                    onClick={handleRegisterClick}
                >
                  Register
                </button>
                <div className="flex items-center gap-3 text-center text-sm italic text-gray-600">
                  or
                </div>
                <button className="btn relative w-full bg-gradient-to-b from-gray-800 to-gray-800/60 text-gray-300">
                  Sign In with Google
                </button>
              </div>
            </form>
            <div className="mt-6 text-center text-sm text-indigo-200/65">
              Already have an account?{" "}
              <Link className="font-medium text-indigo-500" href="/signin">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>
  );
}