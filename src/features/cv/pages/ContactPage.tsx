import React from 'react';
import PlaceholderPage from '@shared/components/PlaceholderPage';

const ContactPage: React.FC = () => (
  <PlaceholderPage
    title="Contact"
    subtitle="Get in touch. Form submissions handled by Lambda → DynamoDB → SES. Even the contact form is overengineered."
    icon="✉️"
    accentColor="#10b981"
  />
);

export default ContactPage;
