/*
 * ContactForm — handles user input, validation, and submission.
 *
 * Currently client-side only. When the Lambda backend is added,
 * the handleSubmit function will POST to /api/contact which
 * routes through API Gateway → Lambda → DynamoDB + SES.
 */

import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  /* Basic email format check */
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  /* Validate all required fields */
  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!isValidEmail(form.email)) errs.email = 'Invalid email format';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  /* Handle form submission */
  const handleSubmit = () => {
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      /*
       * TODO: Replace with actual API call when Lambda is deployed
       * fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })
       */
      setSubmitted(true);
    }
  };

  /* Update a single form field */
  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    /* Clear the error for this field as the user types */
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  /* Shared input styling */
  const inputStyle = (field: string, isTextarea = false): React.CSSProperties => ({
    width: '100%',
    padding: isTextarea ? '14px 16px' : '12px 16px',
    borderRadius: 8,
    border: `1px solid ${
      errors[field as keyof FormErrors]
        ? '#f8717144'
        : focused === field
        ? '#10b98144'
        : '#1e1e1e'
    }`,
    background: focused === field ? '#111' : '#0e0e0e',
    color: '#d0d0d0',
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    outline: 'none',
    transition: 'all 0.2s',
    resize: isTextarea ? 'vertical' as const : 'none' as const,
    minHeight: isTextarea ? 140 : 'auto',
    boxSizing: 'border-box' as const,
  });

  /* Success state after submission */
  if (submitted) {
    return (
      <div style={{
        padding: '48px 32px',
        borderRadius: 12,
        border: '1px solid #10b98133',
        background: '#10b98108',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22,
          color: '#10b981', marginBottom: 10, letterSpacing: -0.3,
        }}>Message Sent</h3>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 14, color: '#7a7a7a',
          lineHeight: 1.6, marginBottom: 24,
        }}>
          Thanks for reaching out. I'll get back to you as soon as possible.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: '', email: '', subject: '', message: '' });
          }}
          className="contact-reset-btn"
          style={{
            padding: '10px 24px', borderRadius: 6,
            border: '1px solid #1e1e1e', background: 'transparent',
            color: '#8a8a8a', fontFamily: 'var(--font-display)',
            fontWeight: 600, fontSize: 13, cursor: 'pointer',
            transition: 'all 0.2s', letterSpacing: 0.3,
          }}
        >Send Another Message</button>
      </div>
    );
  }

  return (
    <div>
      {/* Name + Email row */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16,
      }} className="contact-grid">
        {/* Name */}
        <div>
          <label style={{
            display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11,
            letterSpacing: 1.5, textTransform: 'uppercase', color: '#4a4a4a',
            marginBottom: 8, fontWeight: 500,
          }}>Name <span style={{ color: '#f87171' }}>*</span></label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
            placeholder="Your name"
            style={inputStyle('name')}
          />
          {errors.name && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, color: '#f87171', marginTop: 6, display: 'block',
            }}>{errors.name}</span>
          )}
        </div>

        {/* Email */}
        <div>
          <label style={{
            display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11,
            letterSpacing: 1.5, textTransform: 'uppercase', color: '#4a4a4a',
            marginBottom: 8, fontWeight: 500,
          }}>Email <span style={{ color: '#f87171' }}>*</span></label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            placeholder="you@example.com"
            style={inputStyle('email')}
          />
          {errors.email && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, color: '#f87171', marginTop: 6, display: 'block',
            }}>{errors.email}</span>
          )}
        </div>
      </div>

      {/* Subject */}
      <div style={{ marginBottom: 16 }}>
        <label style={{
          display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11,
          letterSpacing: 1.5, textTransform: 'uppercase', color: '#4a4a4a',
          marginBottom: 8, fontWeight: 500,
        }}>Subject</label>
        <input
          type="text"
          value={form.subject}
          onChange={(e) => updateField('subject', e.target.value)}
          onFocus={() => setFocused('subject')}
          onBlur={() => setFocused(null)}
          placeholder="What's this about?"
          style={inputStyle('subject')}
        />
      </div>

      {/* Message */}
      <div style={{ marginBottom: 24 }}>
        <label style={{
          display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11,
          letterSpacing: 1.5, textTransform: 'uppercase', color: '#4a4a4a',
          marginBottom: 8, fontWeight: 500,
        }}>Message <span style={{ color: '#f87171' }}>*</span></label>
        <textarea
          value={form.message}
          onChange={(e) => updateField('message', e.target.value)}
          onFocus={() => setFocused('message')}
          onBlur={() => setFocused(null)}
          placeholder="Your message..."
          style={inputStyle('message', true)}
        />
        {errors.message && (
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, color: '#f87171', marginTop: 6, display: 'block',
          }}>{errors.message}</span>
        )}
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        className="contact-submit-btn"
        style={{
          padding: '14px 32px', borderRadius: 8,
          border: 'none', background: '#10b981',
          color: '#0a0a0a', fontFamily: 'var(--font-display)',
          fontWeight: 600, fontSize: 14, cursor: 'pointer',
          transition: 'all 0.2s', letterSpacing: 0.3,
        }}
      >Send Message</button>

      <style>{`
        .contact-submit-btn:hover { background: #34d399 !important; transform: translateY(-1px); box-shadow: 0 8px 32px rgba(16,185,129,0.2); }
        .contact-reset-btn:hover { border-color: #3a3a3a !important; color: #c0c0c0 !important; }
        @media (max-width: 600px) { .contact-grid { grid-template-columns: 1fr !important; } }
        input::placeholder, textarea::placeholder { color: #3a3a3a; }
      `}</style>
    </div>
  );
};

export default ContactForm;
