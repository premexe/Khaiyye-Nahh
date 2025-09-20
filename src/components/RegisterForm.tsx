import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Info, Mail, Send } from 'lucide-react';

interface RegisterFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    city: '',
    timing: '',
    description: '',
    type: 'Temple Bhandara',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create email content
    const emailSubject = `New Bhandara Registration: ${formData.name}`;
    const emailBody = `
New Bhandara Registration Request

Bhandara Details:
- Name: ${formData.name}
- Location: ${formData.location}
- City: ${formData.city}
- Timing: ${formData.timing}
- Type: ${formData.type}
- Description: ${formData.description}

Contact Information:
- Contact Name: ${formData.contactName}
- Email: ${formData.contactEmail}
- Phone: ${formData.contactPhone}

Submitted via Khaiyye Nahh... website
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:rajuyadav@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after showing success
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          location: '',
          city: '',
          timing: '',
          description: '',
          type: 'Temple Bhandara',
          contactName: '',
          contactEmail: '',
          contactPhone: ''
        });
        onClose();
      }, 2000);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {!isSubmitted ? (
            <>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Register Your Bhandara</h2>
                  <p className="text-gray-300 text-sm">Share your sacred food service with the world</p>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4 text-white" />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Bhandara Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-transparent transition-all duration-300"
                      placeholder="e.g., Shree Ram Mandir Bhandara"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Type *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-transparent transition-all duration-300"
                    >
                      <option value="Temple Bhandara" className="bg-gray-800">Temple Bhandara</option>
                      <option value="Gurudwara Langar" className="bg-gray-800">Gurudwara Langar</option>
                      <option value="Dargah Langar" className="bg-gray-800">Dargah Langar</option>
                      <option value="Community Bhandara" className="bg-gray-800">Community Bhandara</option>
                      <option value="Temple Prasadam" className="bg-gray-800">Temple Prasadam</option>
                      <option value="Temple Annadanam" className="bg-gray-800">Temple Annadanam</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Full Address *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-transparent transition-all duration-300"
                      placeholder="Complete address with landmarks"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-transparent transition-all duration-300"
                      placeholder="e.g., Mumbai, Delhi"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Timing *
                  </label>
                  <input
                    type="text"
                    name="timing"
                    value={formData.timing}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-transparent transition-all duration-300"
                    placeholder="e.g., 12:00 PM - 3:00 PM, 7:00 PM - 9:00 PM"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    <Info className="w-4 h-4 inline mr-1" />
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Brief description of the bhandara, what food is served, special occasions, etc."
                  />
                </div>

                <div className="border-t border-white/10 pt-4">
                  <h3 className="text-white font-semibold mb-3">Contact Information</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-transparent transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-transparent transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-transparent transition-all duration-300"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Registration</span>
                    </>
                  )}
                </motion.button>
              </form>
            </>
          ) : (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, repeat: 1 }}
              >
                <Mail className="w-8 h-8 text-green-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">Registration Sent!</h3>
              <p className="text-gray-300 mb-4">
                Your bhandara registration has been sent to our team. We'll review and add it to the map soon.
              </p>
              <p className="text-sm text-gray-400">
                Thank you for sharing this sacred service with the world 🙏
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RegisterForm;