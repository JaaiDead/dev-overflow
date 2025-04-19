import { useState } from 'react';
import { Send, Mail, User, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-[#1A1F2E]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-white">Get in Touch</h2>
        
        <div className="max-w-lg mx-auto">
          {submitStatus === 'success' ? (
            <div className="bg-green-500 bg-opacity-20 text-green-200 p-4 rounded-lg mb-6 flex items-center justify-center">
              <p className="text-center">Message sent successfully! I'll get back to you soon.</p>
            </div>
          ) : submitStatus === 'error' ? (
            <div className="bg-red-500 bg-opacity-20 text-red-200 p-4 rounded-lg mb-6">
              <p className="text-center">There was an error sending your message. Please try again.</p>
            </div>
          ) : null}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium mb-2 text-gray-300" htmlFor="name">
                <User className="inline-block mr-2" size={16} /> Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-[#1E90FF] focus:ring-1 focus:ring-[#1E90FF] transition-colors duration-300"
                placeholder="Your Name"
                required
              />
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium mb-2 text-gray-300" htmlFor="email">
                <Mail className="inline-block mr-2" size={16} /> Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-[#1E90FF] focus:ring-1 focus:ring-[#1E90FF] transition-colors duration-300"
                placeholder="Your Email"
                required
              />
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium mb-2 text-gray-300" htmlFor="message">
                <MessageSquare className="inline-block mr-2" size={16} /> Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-[#1E90FF] focus:ring-1 focus:ring-[#1E90FF] transition-colors duration-300"
                rows={5}
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#1E90FF] text-white p-3 rounded flex items-center justify-center transition-all duration-300 ${
                isSubmitting ? 'bg-blue-700 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message <Send className="ml-2" size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;