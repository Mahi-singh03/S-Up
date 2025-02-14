import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Styles/LoginForm.css';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user')) navigate('/');
  }, [navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        message.success('Login successful!');
        navigate('/', { replace: true });
      } else {
        message.error(data.message || 'Login failed.');
      }
    } catch {
      message.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="login-form-title">Login</h2>
      <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} validateTrigger="onSubmit" className="login-responsive-form">
        <Form.Item name="emailAddress" rules={[{ required: true, type: 'email', message: 'Please input a valid Email Address!' }]}>
          <Input prefix={<MailOutlined />} placeholder="Email Address" className="login-input" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Password" className="login-input-password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block className="login-btn">
            {loading ? 'Logging in...' : 'Log in'}
          </Button>
        </Form.Item>

        <div className="login-or-divider">OR</div>

        <Form.Item>
          <Button type="default" block onClick={() => navigate('/register')} className="login-btn">
            Register Now
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;