import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function Journey() {
  const data = [
    {
      title: "2026",
      content: (
        <div>
          <img src="https://ui-avatars.com/api/?name=Propwise&background=0D8ABC&color=fff&rounded=true" alt="Propwise Logo" className="h-12 w-12 rounded-full mb-4 object-cover" />
          <h3 className="text-xl md:text-2xl font-bold text-neutral-100 mb-2">Propwise - Full Stack Engineer</h3>
          <p className="text-neutral-400 text-xs md:text-sm font-normal mb-8 uppercase tracking-wider">Remote</p>
          <ul className="list-disc pl-5 text-neutral-300 text-sm md:text-base space-y-2 mb-8">
            <li>Built Python (FastAPI) backend services for property report generation and exports, moving synchronous flows to async job pipelines (SQS + Lambda) and reducing average report latency by ~35%.</li>
            <li>Designed RBAC-secured APIs and audit logging for investor and advisor roles, hardening multi-tenant access and preventing cross-tenant data exposure in production.</li>
            <li>Implemented signed URL–based delivery for sensitive reports and enforced short-lived access tokens, aligning document delivery with enterprise security requirements.</li>
            <li>Introduced prompt versioning and basic regression tests for LLM-assisted features, reducing prompt-related production incidents by ~60% across model and prompt updates.</li>
          </ul>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <img src="https://ui-avatars.com/api/?name=Opas+Mobile&background=4CAF50&color=fff&rounded=true" alt="Opas Mobile Logo" className="h-12 w-12 rounded-full mb-4 object-cover" />
          <h3 className="text-xl md:text-2xl font-bold text-neutral-100 mb-2">Opas Mobile - Software Developer Co-op</h3>
          <p className="text-neutral-400 text-xs md:text-sm font-normal mb-8 uppercase tracking-wider">Halifax, NS</p>
          <ul className="list-disc pl-5 text-neutral-300 text-sm md:text-base space-y-2 mb-8">
            <li>Architected Nightly and QA servers on AWS using Terraform.</li>
            <li>Upgraded the app deployment process on GitHub Actions, cutting down build times by 78%.</li>
            <li>Implemented a containerization strategy using Docker and Kubernetes for the OPAS Mobile app.</li>
            <li>Produced rich technical documentation and user guides on the company’s internal wiki on Notion.</li>
          </ul>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div>
          <img src="/company/dalLogo.png" alt="Dalhousie Logo" className="h-12 w-12 rounded-full mb-4 object-cover" />
          <h3 className="text-xl md:text-2xl font-bold text-neutral-100 mb-2">Dalhousie University</h3>
          <p className="text-primary text-sm md:text-base font-medium mb-1">Master of Applied Computer Science</p>
          <p className="text-neutral-400 text-xs md:text-sm font-normal mb-8 uppercase tracking-wider">Halifax, NS • GPA: 4.0/4.3</p>
        </div>
      ),
    },
    {
      title: "2019",
      content: (
        <div>
          <img src="/company/cds.png" alt="Crest Data Systems Logo" className="h-12 w-12 rounded-full mb-4 object-cover" />
          <h3 className="text-xl md:text-2xl font-bold text-neutral-100 mb-2">Crest Data Systems - Software Engineer</h3>
          <p className="text-neutral-400 text-xs md:text-sm font-normal mb-8 uppercase tracking-wider">Ahmedabad, India</p>
          <ul className="list-disc pl-5 text-neutral-300 text-sm md:text-base space-y-2 mb-8">
            <li>Enabled real-time stock synchronization across platforms using Kafka, matching a 90% latency reduction.</li>
            <li>Designed and implemented 100+ scalable REST APIs on a microservices architecture using Java and Python.</li>
            <li>Crafted a custom, TypeScript-compatible UI library with ReactJS for real-time data visualization.</li>
            <li>Developed and maintained 11 full-stack Splunk applications in collaboration with Fortune 500 clients.</li>
            <li>Engineered Jenkins-driven CI/CD pipelines reducing deployment failures by 40%.</li>
            <li>Streamlined the app-vetting process by developing an AWS Lambda automation script, saving $75,000 annually.</li>
          </ul>
        </div>
      ),
    },
  ];
  return (
    <section className="about" id="journey">
      <h2 className="text-4xl md:text-5xl font-bold mb-8 text-neutral-100 font-sans tracking-tight">
        My Journey
      </h2>
      <div className="w-full mx-auto" style={{ maxWidth: "1280px" }}>
        <Timeline data={data} />
      </div>
    </section>
  );
}
