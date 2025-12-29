import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set in environment variables");
      return NextResponse.json(
        { error: "Gemini API key not configured. Please check your .env.local file." },
        { status: 500 }
      );
    }

    // Detect language from user message
    const isVietnamese = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(message) || 
                         /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(conversationHistory[conversationHistory.length - 1]?.text || "");

    // CV context for the AI
    const cvContext = isVietnamese 
      ? `Bạn là một trợ lý AI hữu ích giúp khách truy cập tìm hiểu về Duong A, một Mobile Developer với hơn 3 năm kinh nghiệm.

QUAN TRỌNG: Bạn PHẢI trả lời bằng TIẾNG VIỆT khi người dùng hỏi bằng tiếng Việt. Hãy trả lời một cách tự nhiên, thân thiện và chuyên nghiệp bằng tiếng Việt.

Thông tin về Duong A:
- Kỹ năng: Kotlin, Java, JavaScript, React Native, Jetpack Compose, KMM, Git, Android Studio, Firebase, GitHub Actions, Jenkins, JUnit, Espresso
- Vị trí hiện tại: Android Developer tại Staffun (Tháng 7/2025 - Hiện tại)
- Kinh nghiệm làm việc: 
  - CastTV - Android Developer (Tháng 2/2025 - Tháng 4/2025)
  - NAB Innovation Centre Vietnam - Android Developer (Tháng 8/2022 - Tháng 12/2024)
  - Blue Otter Vietnam - Front-end Developer (Tháng 5/2021 - Tháng 7/2021)
- Học vấn: Passerelles numériques Vietnam - Công nghệ Thông tin (Tháng 9/2019 - Tháng 10/2022)
- Chứng chỉ: AWS Cloud Practitioner, Microsoft Azure Fundamentals, HackerRank Software Engineer Certificate
- Ngôn ngữ: Tiếng Việt (Bản ngữ), Tiếng Anh (Chuyên nghiệp)
- Liên hệ: code.with.dobby@gmail.com, 0869963501
- GitHub: https://github.com/douviiii

Dự án:
- KMM-Movies-Demo: Kiến trúc Kotlin Multiplatform Mobile
- Calendar Working Training: Tích hợp Android Calendar Provider API
- ML Android Scan Object: Nhận diện đối tượng thời gian thực sử dụng ML Kit
- IELTS Millionaire: Ứng dụng giáo dục

Hãy cung cấp câu trả lời hữu ích, chính xác và thân thiện về nền tảng, kỹ năng, kinh nghiệm và dự án của Duong A. Giữ câu trả lời ngắn gọn nhưng đầy đủ thông tin. LUÔN trả lời bằng TIẾNG VIỆT.`
      : `You are a helpful AI assistant helping visitors learn about Duong A, a Mobile Developer with over 3 years of experience.

IMPORTANT: You MUST respond in VIETNAMESE when the user asks in Vietnamese. Respond naturally, friendly and professionally in Vietnamese.

Key Information about Duong A:
- Skills: Kotlin, Java, JavaScript, React Native, Jetpack Compose, KMM, Git, Android Studio, Firebase, GitHub Actions, Jenkins, JUnit, Espresso
- Current Role: Android Developer at Staffun (July 2025 - Now)
- Previous Experience: 
  - CastTV - Android Developer (Feb 2025 - Apr 2025)
  - NAB Innovation Centre Vietnam - Android Developer (Aug 2022 - Dec 2024)
  - Blue Otter Vietnam - Front-end Developer (May 2021 - Jul 2021)
- Education: Passerelles numériques Vietnam - Information Technology (Sep 2019 - Oct 2022)
- Certifications: AWS Cloud Practitioner, Microsoft Azure Fundamentals, HackerRank Software Engineer Certificate
- Languages: Vietnamese (Native), English (Professional)
- Contact: code.with.dobby@gmail.com, 0869963501
- GitHub: https://github.com/douviiii

Projects:
- KMM-Movies-Demo: Kotlin Multiplatform Mobile architecture
- Calendar Working Training: Android Calendar Provider API integration
- ML Android Scan Object: Real-time object detection using ML Kit
- IELTS Millionaire: Educational app

Please provide helpful, accurate, and friendly responses about Duong A's background, skills, experience, and projects. Keep responses concise but informative. ALWAYS respond in the same language as the user's question.`;

    // Build conversation context
    const historyMessages = conversationHistory.map((msg: any) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const currentMessage = {
      role: "user",
      parts: [{ text: message }],
    };

    // Prepare contents array - include system instruction as first message
    const systemMessage = {
      role: "user",
      parts: [{ text: cvContext }],
    };

    const contents = [
      systemMessage,
      ...historyMessages.slice(-10), // Keep last 10 messages for context
      currentMessage,
    ];

    // Use gemini-1.5-flash (newer, faster, free tier)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = await response.text();
      }
      console.error("Gemini API error:", response.status, JSON.stringify(errorData, null, 2));
      
      const errorMessage = typeof errorData === 'string' 
        ? errorData 
        : errorData?.error?.message || errorData?.message || JSON.stringify(errorData);
      
      return NextResponse.json(
        { error: errorMessage || "Failed to get AI response" },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0]
    ) {
      const aiResponse = data.candidates[0].content.parts[0].text;
      return NextResponse.json({ response: aiResponse });
    } else {
      return NextResponse.json(
        { error: "Invalid response format from AI" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Chat API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

