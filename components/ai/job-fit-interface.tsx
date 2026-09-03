"use client";

import { useState } from "react";
import { JobFitApiResponse, JobFitResult } from "@/types/job-fit";
import { JobFitResultView } from "./job-fit-result";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, FileSearch, Loader2, Lock, Sparkles, UserCheck } from "lucide-react";

const SAMPLE_JDS = [
  {
    label: "Full-Stack AI SaaS Engineer Role",
    text: "We are seeking a Senior Full-Stack AI Software Engineer to build conversational voice receptionists and automated SaaS platforms. Key requirements: React, Next.js, TypeScript, Node.js, Express, Twilio Telephony, Stripe billing, Google Calendar OAuth, and Groq/Retell AI integrations.",
  },
  {
    label: "E-Commerce Automation Engineer Role",
    text: "Looking for a Backend & Automation Engineer to build automated inventory and order fulfillment operations hubs. Required stack: Next.js App Router, TypeScript, PostgreSQL, Prisma ORM, n8n-based automation workflows, and REST API design.",
  },
  {
    label: "DevOps & Cloud Heavy Role (With Gaps)",
    text: "Seeking a Cloud DevOps Infrastructure Lead with candidate requirements: React, Node.js, 7+ years Kubernetes, AWS Solutions Architect certification, Terraform, and GraphQL API design.",
  },
];

export function JobFitInterface() {
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<JobFitResult | null>(null);

  const handleAnalyze = async (textToAnalyze?: string) => {
    const text = (textToAnalyze || jobDescription).trim();
    if (!text || isLoading) return;

    if (text.length < 50) {
      setError("Job description is too short. Please paste at least 50 characters of job text.");
      return;
    }

    if (text.length > 6000) {
      setError("Job description exceeds maximum length limit of 6,000 characters.");
      return;
    }

    setError(null);
    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/ai/job-fit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobDescription: text }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error ${res.status}`);
      }

      const data: JobFitApiResponse = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      if (data.result) {
        setResult(data.result);
      }
    } catch (err) {
      console.error("Job Fit Analysis Error:", err);
      setError(err instanceof Error ? err.message : "Failed to analyze job description.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card/40 border-border/60 backdrop-blur rounded-2xl p-6 shadow-xl space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-primary" />
              Recruiter Job-Fit Analyzer
            </h3>
            <span className="text-[11px] text-muted-foreground font-mono flex items-center gap-1">
              <Lock className="h-3 w-3 text-emerald-400" />
              Ephemeral &amp; Private Analysis
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Paste a job description to compare its requirements against Piyush&apos;s verified portfolio evidence. Scores are computed deterministically, highlighting both verified strengths and open gaps.
          </p>
        </div>

        {/* Sample JD loader chips */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Try a sample job description:
          </span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_JDS.map((sample) => (
              <Button
                key={sample.label}
                variant="outline"
                size="sm"
                onClick={() => {
                  setJobDescription(sample.text);
                  handleAnalyze(sample.text);
                }}
                disabled={isLoading}
                className="text-xs border-border/60 bg-card/40 hover:border-primary/40"
              >
                {sample.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Textarea Input */}
        <div className="space-y-2">
          <div className="relative">
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description text here (minimum 50 characters)..."
              rows={6}
              disabled={isLoading}
              maxLength={6000}
              className="w-full bg-background/80 border border-border/60 rounded-xl p-4 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 resize-y"
            />
            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-muted-foreground">
              {jobDescription.length}/6000 chars
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex justify-end">
          <Button
            onClick={() => handleAnalyze()}
            disabled={isLoading || jobDescription.trim().length < 50}
            className="gap-2 font-medium px-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing Requirements &amp; Evidence...
              </>
            ) : (
              <>
                <FileSearch className="h-4 w-4" />
                Analyze Job Fit
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Results Panel */}
      {result && <JobFitResultView result={result} />}
    </div>
  );
}
