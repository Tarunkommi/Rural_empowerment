import React from 'react';
import { useParams } from 'react-router-dom';
import { useSchemeDetails } from '../hooks/useScheme';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import ErrorState from '../components/common/ErrorState';

// Sub-components
import SchemeHero from '../components/schemes/SchemeHero';
import SchemeOverview from '../components/schemes/SchemeOverview';
import BenefitCard from '../components/schemes/BenefitCard';
import EligibilityCard from '../components/schemes/EligibilityCard';
import DocumentsChecklist from '../components/schemes/DocumentsChecklist';
import ApplicationTimeline from '../components/schemes/ApplicationTimeline';
import FeatureCard from '../components/schemes/FeatureCard';
import StatisticsSection from '../components/schemes/StatisticsSection';
import FAQAccordion from '../components/schemes/FAQAccordion';
import RelatedSchemes from '../components/schemes/RelatedSchemes';
import SchemeMotto from '../components/schemes/SchemeMotto';
import SchemeCTA from '../components/schemes/SchemeCTA';

const SchemeDetails = () => {
  const { slug } = useParams();
  const { scheme, loading, error, refetch } = useSchemeDetails(slug);

  if (loading) {
    return <LoadingSkeleton type="detail" />;
  }

  if (error || !scheme) {
    return (
      <ErrorState 
        error={error || "The scheme you're looking for doesn't exist or has been moved."} 
        onRetry={refetch} 
        backLink="/government-schemes" 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SchemeHero scheme={scheme} />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column (Left) */}
          <div className="lg:col-span-2">
            <SchemeOverview overview={scheme.overview} />

            {/* Benefits Grid */}
            {scheme.benefits && scheme.benefits.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-[#1F2937] mb-6 border-b pb-2">Key Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {scheme.benefits.map((benefit, index) => (
                    <BenefitCard key={index} {...benefit} index={index} />
                  ))}
                </div>
              </div>
            )}

            <ApplicationTimeline steps={scheme.applicationSteps} />

            <FAQAccordion faqs={scheme.faq} />
          </div>

          {/* Sidebar Column (Right) */}
          <div className="lg:col-span-1 space-y-8">
            <EligibilityCard eligibility={scheme.eligibility} />
            <DocumentsChecklist documents={scheme.documentsRequired} />
            
            {/* Features List */}
            {scheme.features && scheme.features.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-[#D9E2EC] p-6">
                <h2 className="text-xl font-bold text-[#1F2937] mb-6">Scheme Features</h2>
                <div className="flex flex-col gap-3">
                  {scheme.features.map((feature, index) => (
                    <FeatureCard key={index} feature={feature} index={index} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full-width bottom sections */}
        <div className="mt-12">
          <StatisticsSection statistics={scheme.statistics} />
          <RelatedSchemes schemes={scheme.relatedSchemes} />
          <SchemeMotto motto={scheme.motto} />
          <SchemeCTA applyLink={scheme.applyLink} officialWebsite={scheme.officialWebsite} />
        </div>
      </div>
    </div>
  );
};

export default SchemeDetails;
