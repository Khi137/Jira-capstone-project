import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.scss'; 
export default function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <section
            style={{
                width: '100%',
                height: '100vh',
   
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button
                        
                        onClick={() => navigate('/')}
                    >
                        Back Home
                    </Button>
                }
            />
        </section>
    )
}
