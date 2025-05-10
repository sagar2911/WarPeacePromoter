import { useQuery } from "@tanstack/react-query";
import { Mail, Twitter } from "lucide-react";
import { AboutData } from "@/lib/types";

const About = () => {
  const { data, isLoading } = useQuery<AboutData>({
    queryKey: ["/api/about"],
  });

  return (
    <section id="about" className="py-8 md:py-12 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2">
            About & Data Sources
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Transparency in our methodology and information sources
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h3 className="font-heading text-xl font-bold mb-4">Our Purpose</h3>
          <p className="text-neutral-700 mb-4">
            This platform was created with a singular purpose: to promote peace
            by objectively showing the human and economic costs of armed
            conflict. We believe that presenting factual data about war
            casualties can help people understand the true impact of military
            escalation.
          </p>
          <p className="text-neutral-700">
            By presenting real-time data, historical context, and simulation
            tools, we hope to contribute to a more informed public discourse
            about the India-Pakistan conflict and advocate for peaceful
            resolution.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h3 className="font-heading text-xl font-bold mb-4">Methodology</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-heading text-lg font-semibold mb-2">
                Current Conflict Data
              </h4>
              <p className="text-neutral-700">
                All current conflict data is collected from international news
                sources, verified government statements, and reports from
                recognized international organizations. We update our dashboard
                as new information becomes available and has been confirmed by at
                least two credible sources.
              </p>
            </div>
            <div>
              <h4 className="font-heading text-lg font-semibold mb-2">
                Historical Data
              </h4>
              <p className="text-neutral-700">
                Historical casualty figures are compiled from academic studies,
                historical records, and established encyclopedic sources. Where
                conflicting numbers exist, we present ranges or note the
                discrepancies.
              </p>
            </div>
            <div>
              <h4 className="font-heading text-lg font-semibold mb-2">
                Simulation Model
              </h4>
              <p className="text-neutral-700">
                Our war simulation tool is based on a model that incorporates
                historical conflict data, current military capabilities,
                population density information, and academic research on modern
                warfare. The model is simplified for educational purposes and
                should not be considered a precise prediction tool.
              </p>
            </div>
            <div>
              <h4 className="font-heading text-lg font-semibold mb-2">
                Update Frequency
              </h4>
              <p className="text-neutral-700">
                The Live War Dashboard is updated multiple times daily as new
                verified information becomes available. Historical data and the
                simulation model are reviewed and updated monthly to incorporate
                new research or methodology improvements.
              </p>
            </div>
          </div>
        </div>

        {/* Sources */}
        <div id="sources" className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h3 className="font-heading text-xl font-bold mb-4">Data Sources</h3>
          <div className="space-y-4">
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div>
                  <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-1"></div>
                  <div className="h-4 bg-gray-300 rounded mb-1"></div>
                  <div className="h-4 bg-gray-300 rounded mb-1"></div>
                </div>
                <div>
                  <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-1"></div>
                  <div className="h-4 bg-gray-300 rounded mb-1"></div>
                  <div className="h-4 bg-gray-300 rounded mb-1"></div>
                </div>
              </div>
            ) : (
              <>
                {data?.dataSources?.map((category, index) => (
                  <div key={index}>
                    <h4 className="font-heading text-lg font-semibold mb-2">
                      {category.category}
                    </h4>
                    <ul className="list-disc list-inside text-neutral-700 space-y-2">
                      {category.sources.map((source, idx) => (
                        <li key={idx}>{source}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Ethical Statement */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h3 className="font-heading text-xl font-bold mb-4">
            Ethical Statement
          </h3>
          <p className="text-neutral-700 mb-4">
            We acknowledge the sensitivity of conflict data and are committed to
            presenting information in a way that:
          </p>
          <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-4">
            <li>Respects the dignity of all victims</li>
            <li>Avoids assigning blame or making political judgments</li>
            <li>Presents verified facts without sensationalism</li>
            <li>Acknowledges uncertainties in data where they exist</li>
            <li>Promotes informed dialogue rather than fear or hatred</li>
          </ul>
          <p className="text-neutral-700">
            Our ultimate goal is to contribute to peace by showing that armed
            conflict exacts a terrible human cost on all sides. We believe that
            accurate information can help prevent escalation and promote
            diplomatic solutions.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="font-heading text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-neutral-700 mb-4">
            If you have questions about our methodology, data sources, or wish to
            report inaccuracies, please contact us:
          </p>
          <div className="flex items-center text-neutral-700 mb-2">
            <Mail className="mr-2 text-primary h-5 w-5" />
            <span>info@warimpacttracker.org</span>
          </div>
          <div className="flex items-center text-neutral-700">
            <Twitter className="mr-2 text-primary h-5 w-5" />
            <span>@WarImpactData</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
