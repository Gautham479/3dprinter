import ContactForm from '@/components/ContactForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Contact Us | MahashriLab',
  description: 'Get in touch with MahashriLab for any inquiries.',
};

export default async function ContactPage() {
  const config = await prisma.siteConfig.findUnique({ where: { id: 'global' } });
  const notice = config?.contactNotice || "Note: You can update order notes within 1 hour of placing your order by providing your Order Number in your message.";

  return (
    <main className="min-h-screen flex flex-col bg-surface">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center pt-28 pb-12 px-4">
        <div className="max-w-2xl w-full bg-primary-500/10 border border-primary-500/30 text-primary-500 px-6 py-4 rounded-sm text-center mb-8 font-bold">
          {notice}
        </div>
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}
