import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "npm:nodemailer@6.9.9";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface EmailData {
  name: string;
  email: string;
  company: string;
  selectedPlan: string;
  requirements: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, selectedPlan, requirements }: EmailData = await req.json();

    const emailContent = `
New Inquiry for ${selectedPlan}

Name: ${name}
Email: ${email}
Company: ${company}
Selected Plan: ${selectedPlan}
Requirements: ${requirements}

This inquiry was automatically generated from the CloudOps Hive website.
    `;

    const transporter = new SmtpClient({
      host: Deno.env.get("SMTP_HOST"),
      port: Number(Deno.env.get("SMTP_PORT")),
      secure: true,
      auth: {
        user: Deno.env.get("SMTP_USER"),
        pass: Deno.env.get("SMTP_PASS"),
      },
    });

    await transporter.sendMail({
      from: Deno.env.get("SMTP_FROM"),
      to: Deno.env.get("SMTP_TO"),
      subject: `New ${selectedPlan} Inquiry from ${company}`,
      text: emailContent,
      replyTo: email,
    });

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: "Failed to send email", details: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});