import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import mysql from "npm:mysql2/promise@3.9.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const pool = mysql.createPool({
  host: Deno.env.get('MYSQL_HOST'),
  user: Deno.env.get('MYSQL_USER'),
  password: Deno.env.get('MYSQL_PASSWORD'),
  database: Deno.env.get('MYSQL_DATABASE'),
  ssl: {
    rejectUnauthorized: true
  }
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, selectedPlan, requirements } = await req.json();

    // Create table if not exists
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        selected_plan VARCHAR(100) NOT NULL,
        requirements TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert inquiry
    await pool.execute(
      'INSERT INTO inquiries (name, email, company, selected_plan, requirements) VALUES (?, ?, ?, ?, ?)',
      [name, email, company, selectedPlan, requirements]
    );

    return new Response(
      JSON.stringify({ message: "Inquiry saved successfully" }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: "Failed to save inquiry" }),
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