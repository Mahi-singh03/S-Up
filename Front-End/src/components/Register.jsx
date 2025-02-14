import React, { useState, useEffect } from 'react';
import { Button, DatePicker, Form, Input, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Styles/StudentRegistrationForm.css';

const { Option } = Select;

const StudentRegistrationForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('user')) navigate('/');
  }, [navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        message.success('Registration successful!');
        navigate('/', { replace: true });
      } else {
        message.error(data.message || 'Registration failed.');
      }
    } catch {
      message.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Student Registration</h2>
      <Form layout="vertical" form={form} onFinish={onFinish} className="custom-form">
        <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: 'Full name is required' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Father's Name" name="fatherName" rules={[{ required: true, message: "Father's name is required" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Mother's Name" name="motherName" rules={[{ required: true, message: "Mother's name is required" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="emailAddress" rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true, message: 'Phone number is required' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Date of Birth" name="dateOfBirth" rules={[{ required: true, message: 'Date of birth is required' }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Aadhar Number" name="aadharNumber" rules={[{ required: true, pattern: /^[0-9]{12}$/, message: 'Enter a valid 12-digit Aadhar number' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Course" name="selectedCourse" rules={[{ required: true, message: 'Course selection is required' }]}>
          <Select>
            {['HTML, CSS, JS', 'React', 'MERN FullStack', 'Autocad', 'CorelDRAW', 'Tally', 'Premier Pro', 'Wordpress', 'Computer Course', 'MS Office', 'PTE'].map((course) => (
              <Option key={course} value={course}>{course}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Course Duration" name="courseDuration" rules={[{ required: true, message: 'Course duration is required' }]}>
          <Select>
            {['3 months', '6 months', '1 year'].map((duration) => (
              <Option key={duration} value={duration}>{duration}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Address is required' }]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Qualification" name="qualification" rules={[{ required: true, message: 'Qualification is required' }]}>
          <Select>
            {['10th', '12th', 'Graduated'].map((qual) => (
              <Option key={qual} value={qual}>{qual}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, min: 6, message: 'Password must be at least 6 characters long' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="submit-button">{loading ? 'Registering...' : 'Register'}</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default StudentRegistrationForm;
