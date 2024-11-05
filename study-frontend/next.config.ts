import { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                /* localhost:8080/api/test 으로 호출하면
                   내부적으로 localhost:8080/test 로 변환해서 스프링부트 서버로 호출 */
                source: '/api/:path*',
                destination: 'http://localhost:8080/:path*', // Spring Boot 서버의 실제 경로로 변경
            },
        ];
    },
};

export default nextConfig;
