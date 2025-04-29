import { useState } from 'react';
import { Send, Mail, User, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error' | 'no-client'>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);

    // Construct the mailto link
    const mailtoLink = `mailto:arcticquets.dev@gmail.com?subject=Contact%20Form%20Submission&body=Name:%20${encodeURIComponent(formData.name)}%0AEmail:%20${encodeURIComponent(formData.email)}%0AMessage:%20${encodeURIComponent(formData.message)}`;

    // Try opening the mailto link
    let mailtoOpened = false;
    const mailtoWindow = window.open(mailtoLink, '_blank');
    if (mailtoWindow) {
      mailtoOpened = true;
    } else {
      // Fallback: Use location.href
      window.location.href = mailtoLink;
      mailtoOpened = true; // Assume it worked unless proven otherwise
    }

    // Check if email client opened (timeout-based detection)
    setTimeout(() => {
      if (!mailtoOpened) {
        setSubmitStatus('no-client');
      } else {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      }
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 2000); // 2-second timeout to detect failure
  };

  return (
    <section id="contact" className="py-20 bg-[#1A1F2E]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-white animate-bounce">
          Get in Touch
        </h2>

        <div className="max-w-lg mx-auto">
          {submitStatus && (
            <div
              className={`p-4 rounded-lg mb-6 flex items-center justify-center animate__animated animate__fadeIn ${
                submitStatus === 'success'
                  ? 'bg-green-500 bg-opacity-20 text-green-200'
                  : submitStatus === 'error'
                  ? 'bg-red-500 bg-opacity-20 text-red-200'
                  : 'bg-yellow-500 bg-opacity-20 text-yellow-200'
              }`}
              role="alert"
              aria-live="polite"
            >
              <p className="text-center">
                {submitStatus === 'success'
                  ? 'Your email app should have opened. Thank you for reaching out!'
                  : submitStatus === 'error'
                  ? 'Invalid email format. Please try again.'
                  : 'Could not open your email app. Please copy arcticquets.dev@gmail.com and email manually.'}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label
                className="block text-sm font-medium mb-2 text-gray-300"
                htmlFor="name"
              >
                <User className="inline-block mr-2" size={16} /> Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-[#1E90FF] focus:ring-1 focus:ring-[#1E90FF] transition-colors duration-300 sm:text-base text-sm"
                placeholder="Your Name"
                required
                aria-required="true"
              />
            </div>

            <div className="relative">
              <label
                className="block text-sm font-medium mb-2 text-gray-300"
                htmlFor="email"
              >
                <Mail className="inline-block mr-2" size={16} /> Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-[#1E90FF] focus:ring-1 focus:ring-[#1E90FF] transition-colors duration-300 sm:text-base text-sm"
                placeholder="Your Email"
                required
                aria-required="true"
              />
            </div>

            <div className="relative">
              <label
                className="block text-sm font-medium mb-2 text-gray-300"
                htmlFor="message"
              >
                <MessageSquare className="inline-block mr-2" size={16} /> Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-[#1E90FF] focus:ring-1 focus:ring-[#1E90FF] transition-colors duration-300 sm:text-base text-sm"
                rows={5}
                placeholder="Your Message"
                required
                aria-required="true"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#1E90FF] text-white p-3 rounded flex items-center justify-center transition-all duration-300 ${
                isSubmitting ? 'bg-blue-700 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
              aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
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

          <div className="mt-12 text-center text-gray-300 sm:text-lg text-base">
            <p className="mb-4 animate-pulse">
              If you're having trouble contacting me via email, feel free to reach out on Discord!
            </p>
            <a
              href="https://discord.com/users/730700346069876776"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#5865F2] text-white py-2 px-6 rounded-lg hover:bg-[#4752C4] transition-colors duration-300 sm:text-base text-sm"
            >
              My Discord: Jaai.
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;