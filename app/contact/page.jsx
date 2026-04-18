import ContactForm from '@/components/ContactForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Contact Us | MahashriLab',
  description: 'Get in touch with MahashriLab for any inquiries.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col bg-surface">
      <Navbar />
      <div className="flex-grow flex items-center justify-center pt-28 pb-12">
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}
