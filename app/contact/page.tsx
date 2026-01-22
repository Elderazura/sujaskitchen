'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ParallaxBanner from '@/components/ParallaxBanner';
import Image from 'next/image';
import { MapPin, Mail, Clock, Phone, Send, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: 'general'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '', service: 'general' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      content: 'Al Quoz Warehouse\nDubai, UAE',
      link: null,
      color: 'from-[#c91432] to-[#a01026]',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@sujaskitchen.com',
      link: 'mailto:info@sujaskitchen.com',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+971 50 123 4567',
      link: 'tel:+971501234567',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Clock,
      title: 'Operating Hours',
      content: 'Monday - Sunday\nDelivery and Catering Services Available',
      link: null,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section with Parallax */}
        <ParallaxBanner
          image="/images/Sujas-Kitchen-scaled.jpg"
          alt="Contact Us - Suja's Kitchen"
          className="h-[70vh] min-h-[600px] flex items-center"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60 z-10"></div>
          <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl animate-fade-in">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 drop-shadow-lg max-w-2xl mx-auto leading-relaxed animate-slide-up">
              We&apos;d love to hear from you. Get in touch for orders, catering, or any inquiries.
            </p>
          </div>
        </ParallaxBanner>

        {/* Contact Content */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <div className="mb-8">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                  <div className="w-24 h-1 bg-[#c91432] mb-6"></div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Have a question or want to place an order? We&apos;re here to help!
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {contactInfo.map((info, idx) => {
                    const IconComponent = info.icon;
                    const content = (
                      <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-[#c91432] group">
                        <CardHeader>
                          <div className={`bg-gradient-to-br ${info.color} rounded-full w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="w-7 h-7 text-white" />
                          </div>
                          <CardTitle className="text-xl group-hover:text-[#c91432] transition-colors">
                            {info.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-gray-700 whitespace-pre-line leading-relaxed">
                            {info.content}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    );

                    if (info.link) {
                      return (
                        <a key={idx} href={info.link} className="block h-full">
                          {content}
                        </a>
                      );
                    }
                    return <div key={idx}>{content}</div>;
                  })}
                </div>

                <Card className="bg-gradient-to-br from-[#c91432]/10 to-[#a01026]/5 border-2 border-[#c91432]/20">
                  <CardHeader>
                    <CardTitle className="text-xl text-[#c91432] flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      For Catering Inquiries
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      Please contact us at least 48 hours in advance for catering orders. 
                      We offer customized menus for events of all sizes.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div>
                <div className="mb-8">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Send us a Message</h2>
                  <div className="w-24 h-1 bg-[#c91432] mb-6"></div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                  </p>
                </div>
                
                <Card className="shadow-xl">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="focus:border-[#c91432] focus:ring-[#c91432]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className="focus:border-[#c91432] focus:ring-[#c91432]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+971 XX XXX XXXX"
                          className="focus:border-[#c91432] focus:ring-[#c91432]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="service">Service Type</Label>
                        <Select
                          value={formData.service}
                          onValueChange={(value) => setFormData({ ...formData, service: value })}
                        >
                          <SelectTrigger className="focus:border-[#c91432] focus:ring-[#c91432]">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="order">Order Inquiry</SelectItem>
                            <SelectItem value="catering">Catering Services</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us how we can help you..."
                          className="focus:border-[#c91432] focus:ring-[#c91432] resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-[#c91432] hover:bg-[#a01026] text-white text-lg py-6 shadow-lg"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map/Additional Info Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Visit Our Kitchen</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    While we primarily operate as a cloud kitchen with delivery and catering services, 
                    you&apos;re welcome to contact us for any inquiries or to discuss your catering needs.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#c91432] mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Location</p>
                        <p className="text-gray-600">Al Quoz Warehouse, Dubai, UAE</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#c91432] mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Operating Hours</p>
                        <p className="text-gray-600">Monday - Sunday<br />Delivery and Catering Services Available</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/Sujas-Kitchen-1-scaled.jpg"
                    alt="Suja's Kitchen"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
