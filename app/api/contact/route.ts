import { NextRequest, NextResponse } from "next/server";

// Optional: Initialize Firebase Admin if service account is provided
let firestore: any = null;
try {
  const { initializeApp, getApps, cert } = require("firebase-admin/app");
  const { getFirestore } = require("firebase-admin/firestore");
  
  if (!getApps().length) {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (serviceAccount) {
      initializeApp({
        credential: cert(JSON.parse(serviceAccount)),
      });
    }
  }
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (serviceAccount && getApps().length > 0) {
    firestore = getFirestore();
  }
} catch (error) {
  console.log("Firebase Admin not configured, will skip Firestore saving");
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to Firestore (optional)
    if (firestore) {
      try {
        await firestore.collection("contacts").add({
          name,
          email,
          subject,
          message,
          createdAt: new Date().toISOString(),
          read: false,
        });
      } catch (firebaseError) {
        console.error("Firestore error:", firebaseError);
        // Continue even if Firestore fails - we'll still send email
      }
    }

    // Send email notification
    try {
      const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "code.with.dobby@gmail.com",
          subject: `Contact Form: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          `,
        }),
      });

      if (!emailResponse.ok) {
        console.error("Email sending failed");
      }
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

