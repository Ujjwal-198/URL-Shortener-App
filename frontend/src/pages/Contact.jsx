import React from "react";
import { Button } from "../components";

const Contact = () => {

    return (
        <div className="relative min-h-screen py-12">
            <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-lg"></div>

            <div className="relative container mx-auto px-6 lg:px-12 text-gray-50">

                <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-wide">
                    Contact Us
                </h1>

                <p className="text-base md:text-lg max-w-2xl mx-auto text-center mb-8 leading-snug text-gray-200">
                    Have questions, feedback, or suggestions? We’d love to hear from you.
                    Fill out the form below or reach us directly through our contact details.
                </p>

                <div className="grid md:grid-cols-2 gap-6">

                    <div className="bg-gray-800/70 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-gray-700 hover:scale-105 transition-transform duration-300">
                        <h2 className="text-2xl md:text-2xl font-semibold mb-4 text-white">
                            Send Us a Message
                        </h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-50 mb-1 font-medium">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-50 mb-1 font-medium">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-50 mb-1 font-medium">Message</label>
                                <textarea
                                    rows="3"
                                    name="message"
                                    
                                    placeholder="Write your message here..."
                                    className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                ></textarea>
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                            >
                                Send Message
                            </Button>
                        </form>
                    </div>

                    <div className="bg-gray-800/70 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-gray-700 hover:scale-105 transition-transform duration-300">
                        <h2 className="text-2xl md:text-2xl font-semibold mb-4 text-white">
                            Get in Touch
                        </h2>
                        <p className="text-gray-200 mb-4 leading-snug">
                            You can also reach us directly through the following contact information:
                        </p>
                        <ul className="space-y-2 text-gray-200 leading-snug">
                            <li>
                                <span className="font-medium">📍 Address:</span> 123 Tech Street, WebCity, India
                            </li>
                            <li>
                                <span className="font-medium">📧 Email:</span> kumarujjwalsingh76@gmail.com
                            </li>
                            <li>
                                <span className="font-medium">📞 Phone:</span> +91 87448 14775
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
