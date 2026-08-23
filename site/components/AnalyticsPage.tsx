"use client";

import { DashboardSection } from "@/components/DashboardSection";
import { DataQualitySection } from "@/components/DataQualitySection";
import { DuplicateAnalysisSection } from "@/components/DuplicateAnalysisSection";
import { IncidentTimelineSection } from "@/components/IncidentTimelineSection";
import { ConversionAnalysisSection } from "@/components/ConversionAnalysisSection";
import { AuditLessonsSection } from "@/components/AuditLessonsSection";
import { CustomerSegmentationSection } from "@/components/CustomerSegmentationSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { InsightsSection } from "@/components/InsightsSection";
import { MethodologySection } from "@/components/MethodologySection";
import { MachineLearningSection } from "@/components/MachineLearningSection";
import { MetricsSection } from "@/components/MetricsSection";
import { Navbar } from "@/components/Navbar";
import { TeamSection } from "@/components/TeamSection";
import { TeamEasterEgg } from "@/components/TeamEasterEgg";

export function AnalyticsPage() {
  return (
    <>
      <TeamEasterEgg />
      <Navbar />
      <main>
        <Hero />
        <MetricsSection />
        <InsightsSection />
        <CustomerSegmentationSection />
        <DataQualitySection />
        <DuplicateAnalysisSection />
        <IncidentTimelineSection />
        <ConversionAnalysisSection />
        <AuditLessonsSection />
        <MachineLearningSection />
        <DashboardSection />
        <MethodologySection />
        <TeamSection />
      </main>
      <Footer />
    </>
  );
}
