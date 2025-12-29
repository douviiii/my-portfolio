"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Xin chào! Tôi ở đây để giúp bạn tìm hiểu thêm về Duong A. Bạn có thể hỏi tôi về kỹ năng, kinh nghiệm, dự án, học vấn, chứng chỉ hoặc thông tin liên hệ. Tôi có thể trả lời bằng tiếng Việt hoặc tiếng Anh!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");

    // Get AI response
    const botResponse = await generateBotResponse(currentInput);
    const botMessage: Message = {
      id: messages.length + 2,
      text: botResponse,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  const [isLoading, setIsLoading] = useState(false);

  const generateBotResponse = async (userInput: string): Promise<string> => {
    try {
      setIsLoading(true);

      // Prepare conversation history (last 10 messages)
      const conversationHistory = messages
        .slice(-10)
        .map((msg) => ({
          text: msg.text,
          sender: msg.sender,
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userInput,
          conversationHistory: conversationHistory,
        }),
      });

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          console.error("API Error Response:", errorData);
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {
          try {
            const errorText = await response.text();
            console.error("API Error Text:", errorText);
            errorMessage = errorText || errorMessage;
          } catch (e2) {
            console.error("Failed to read error response");
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      if (data.error) {
        console.error("API returned error:", data.error);
        throw new Error(data.error);
      }
      
      return data.response || "I'm sorry, I couldn't generate a response. Please try again.";
    } catch (error) {
      console.error("Error calling AI API:", error);
      // Fallback to simple responses if API fails
      return generateFallbackResponse(userInput);
    } finally {
      setIsLoading(false);
    }
  };

  const generateFallbackResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    const isVietnamese = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(userInput);

    // Vietnamese responses
    if (isVietnamese) {
      // Skills and technologies
      if (lowerInput.includes("kỹ năng") || lowerInput.includes("skill") || lowerInput.includes("công nghệ") || lowerInput.includes("technology") || lowerInput.includes("tech")) {
        return "Duong A có chuyên môn về Kotlin, Java, JavaScript, React Native, Jetpack Compose, KMM, Git, Android Studio, Firebase, GitHub Actions, Jenkins, JUnit, và Espresso.";
      }

      // Experience
      if (lowerInput.includes("kinh nghiệm") || lowerInput.includes("experience") || lowerInput.includes("làm việc") || lowerInput.includes("work") || lowerInput.includes("công ty") || lowerInput.includes("job")) {
        return "Duong A có hơn 3 năm kinh nghiệm làm Mobile Developer tại các công ty như Staffun, CastTV, NAB Innovation Centre Vietnam, và Blue Otter Vietnam. Hiện đang làm Android Developer tại Staffun.";
      }

      // Projects
      if (lowerInput.includes("dự án") || lowerInput.includes("project") || lowerInput.includes("portfolio")) {
        return "Một số dự án đáng chú ý bao gồm KMM-Movies-Demo, Calendar Working Training, ML Android Scan Object, và IELTS Millionaire. Bạn có thể xem các repository GitHub trong phần Projects!";
      }

      // Education
      if (lowerInput.includes("học vấn") || lowerInput.includes("education") || lowerInput.includes("trường") || lowerInput.includes("school") || lowerInput.includes("bằng") || lowerInput.includes("degree")) {
        return "Duong A học Công nghệ Thông tin tại Passerelles numériques Vietnam từ tháng 9/2019 đến tháng 10/2022.";
      }

      // Contact
      if (lowerInput.includes("liên hệ") || lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("số điện thoại") || lowerInput.includes("phone")) {
        return "Bạn có thể liên hệ Duong A qua email: code.with.dobby@gmail.com hoặc số điện thoại: 0869963501. Cũng có thể xem LinkedIn và GitHub trong phần contact!";
      }

      // GitHub
      if (lowerInput.includes("github") || lowerInput.includes("git") || lowerInput.includes("repository") || lowerInput.includes("repo")) {
        return "GitHub của Duong A là: https://github.com/douviiii. Bạn có thể xem các dự án và code của anh ấy ở đó!";
      }

      // Certifications
      if (lowerInput.includes("chứng chỉ") || lowerInput.includes("certification") || lowerInput.includes("certificate") || lowerInput.includes("cert")) {
        return "Duong A có các chứng chỉ: AWS Cloud Practitioner, Microsoft Azure Fundamentals, và HackerRank Software Engineer Certificate.";
      }

      // Languages
      if (lowerInput.includes("ngôn ngữ") || lowerInput.includes("language") || lowerInput.includes("nói")) {
        return "Duong A nói tiếng Việt như ngôn ngữ mẹ đẻ và có trình độ tiếng Anh chuyên nghiệp.";
      }

      // Default responses
      if (lowerInput.includes("xin chào") || lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey") || lowerInput.includes("chào")) {
        return "Xin chào! Tôi ở đây để giúp bạn tìm hiểu thêm về Duong A. Bạn có thể hỏi về kỹ năng, kinh nghiệm, dự án, hoặc bất cứ điều gì khác!";
      }

      if (lowerInput.includes("giúp") || lowerInput.includes("help")) {
        return "Tôi có thể giúp bạn tìm hiểu về kỹ năng, kinh nghiệm làm việc, dự án, học vấn, chứng chỉ và thông tin liên hệ của Duong A. Hãy hỏi tôi bất cứ điều gì!";
      }

      return "Đó là một câu hỏi thú vị! Bạn có thể cụ thể hơn không? Tôi có thể kể về kỹ năng, kinh nghiệm, dự án, học vấn, chứng chỉ hoặc thông tin liên hệ của Duong A.";
    }

    // English responses (fallback)
    // Skills and technologies
    if (lowerInput.includes("skill") || lowerInput.includes("technology") || lowerInput.includes("tech")) {
      return "Duong A has expertise in Kotlin, Java, JavaScript, React Native, Jetpack Compose, KMM, Git, Android Studio, Firebase, GitHub Actions, Jenkins, JUnit, and Espresso.";
    }

    // Experience
    if (lowerInput.includes("experience") || lowerInput.includes("work") || lowerInput.includes("job")) {
      return "Duong A has over 3 years of experience as a Mobile Developer, working at companies like Staffun, CastTV, NAB Innovation Centre Vietnam, and Blue Otter Vietnam. Currently working as an Android Developer at Staffun.";
    }

    // Projects
    if (lowerInput.includes("project") || lowerInput.includes("portfolio")) {
      return "Some notable projects include KMM-Movies-Demo, Calendar Working Training, ML Android Scan Object, and IELTS Millionaire. You can check out the GitHub repositories in the Projects section!";
    }

    // Education
    if (lowerInput.includes("education") || lowerInput.includes("school") || lowerInput.includes("degree")) {
      return "Duong A studied Information Technology at Passerelles numériques Vietnam from September 2019 to October 2022.";
    }

    // Contact
    if (lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("phone") || lowerInput.includes("reach")) {
      return "You can contact Duong A via email at code.with.dobby@gmail.com or phone at 0869963501. Also check out the LinkedIn and GitHub profiles in the contact section!";
    }

    // GitHub
    if (lowerInput.includes("github") || lowerInput.includes("git") || lowerInput.includes("repository") || lowerInput.includes("repo")) {
      return "Duong A's GitHub is: https://github.com/douviiii. You can check out his projects and code there!";
    }

    // Certifications
    if (lowerInput.includes("certification") || lowerInput.includes("certificate") || lowerInput.includes("cert")) {
      return "Duong A holds certifications in AWS Cloud Practitioner, Microsoft Azure Fundamentals, and HackerRank Software Engineer Certificate.";
    }

    // Languages
    if (lowerInput.includes("language") || lowerInput.includes("speak")) {
      return "Duong A is a native Vietnamese speaker and has professional proficiency in English.";
    }

    // Default responses
    if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
      return "Hello! I'm here to help you learn more about Duong A. Feel free to ask about skills, experience, projects, or anything else!";
    }

    if (lowerInput.includes("help")) {
      return "I can help you learn about Duong A's skills, work experience, projects, education, certifications, and contact information. Just ask me anything!";
    }

    return "That's an interesting question! Could you be more specific? I can tell you about Duong A's skills, experience, projects, education, certifications, or contact information.";
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-[#E2852E] via-[#F5C857] to-[#ABE0F0] rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center group"
        style={{
          backgroundSize: "200% 200%",
          animation: isOpen ? "gradient-shift 3s ease infinite" : "none",
        }}
      >
        {isOpen ? (
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#E2852E] via-[#F5C857] to-[#ABE0F0] p-4 rounded-t-2xl flex items-center justify-between"
            style={{
              backgroundSize: "200% 200%",
              animation: "gradient-shift 3s ease infinite",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[#E2852E]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Chat Assistant</h3>
                <p className="text-white/80 text-xs">Ask me anything!</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-[#E2852E] to-[#F5C857] text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user" ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#E2852E] focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="w-10 h-10 bg-gradient-to-r from-[#E2852E] to-[#F5C857] text-white rounded-full flex items-center justify-center hover:scale-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg
                    className="w-5 h-5 animate-spin"
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
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

