// app/api-test/page.tsx
'use client';

import { useEffect, useState } from 'react';

const ApiTestPage = () => {
    const [data, setData] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Next.js의 App Router에서 Spring Boot API 호출
        fetch('/api/hello')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setData(data.message))
            .catch((error) => setError(error.message));
    }, []);

    return (
        <div>
            <h1>API Test Page</h1>
            {error ? (
                <p>Error: {error}</p>
            ) : data ? (
                <p>Data from API: {data}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ApiTestPage;