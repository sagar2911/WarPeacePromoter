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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            <span className="text-danger">Our Mission:</span>{" "}
            <span className="text-primary">Fighting for Peace</span>
          </h2>
          <div className="max-w-3xl mx-auto bg-danger bg-opacity-10 p-4 rounded-lg border-l-4 border-danger">
            <p className="text-neutral-800 font-medium text-lg">
              This platform exists for one reason only: to show the true human cost of war and 
              advocate for immediate de-escalation and diplomatic solutions.
            </p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 border-t-4 border-danger">
          <h3 className="font-heading text-xl font-bold mb-4 text-danger">Our Purpose</h3>
          <div className="p-4 bg-neutral-100 rounded-lg mb-4">
            <p className="text-neutral-700 mb-4 font-medium">
              <strong>War cannot be justified by national pride or patriotism.</strong> This platform was created to 
              promote peace by showing the devastating human and economic costs of armed conflict. 
              We believe that presenting factual data about war casualties makes it impossible to 
              ignore the true impact of military escalation.
            </p>
            <p className="text-neutral-700 font-medium">
              Every act of violence creates new victims, new grief, and new reasons for retaliation. 
              This cycle must be broken.
            </p>
          </div>
          <p className="text-neutral-700">
            By presenting real-time data, historical context, and simulation tools, we hope to 
            contribute to a more informed public discourse about the India-Pakistan conflict 
            and advocate for immediate peaceful resolution before more lives are lost.
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
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 border-t-4 border-danger">
          <h3 className="font-heading text-xl font-bold mb-4 text-danger">
            Our Commitment to Peace
          </h3>
          <div className="p-4 bg-danger bg-opacity-10 rounded-lg mb-6">
            <p className="text-neutral-800 font-medium">
              The data presented on this site is not just statistics - it represents real people whose lives 
              were cut short by conflict. We stand firmly against all forms of violence, regardless of which 
              side initiates it or claims justification.
            </p>
          </div>
          <p className="text-neutral-700 mb-4">
            We acknowledge the sensitivity of conflict data and are committed to
            presenting information in a way that:
          </p>
          <ul className="list-disc list-inside text-neutral-700 space-y-3 mb-6 font-medium">
            <li>
              <span className="font-bold">Respects the dignity of all victims</span>
              <p className="ml-6 text-sm mt-1">Every casualty was a person with hopes, dreams, and loved ones</p>
            </li>
            <li>
              <span className="font-bold">Rejects nationalism and patriotic excuses for violence</span>
              <p className="ml-6 text-sm mt-1">No national interest justifies the taking of human life</p>
            </li>
            <li>
              <span className="font-bold">Presents verified facts without sensationalism</span>
              <p className="ml-6 text-sm mt-1">The truth of war's impact requires no embellishment</p>
            </li>
            <li>
              <span className="font-bold">Acknowledges that no side wins in conflict</span>
              <p className="ml-6 text-sm mt-1">Even the "victors" suffer immeasurable losses</p>
            </li>
            <li>
              <span className="font-bold">Advocates for immediate de-escalation and diplomacy</span>
              <p className="ml-6 text-sm mt-1">Every day without peace means more lives lost</p>
            </li>
          </ul>
          <div className="bg-primary text-white p-4 rounded-lg">
            <p className="font-medium">
              Our ultimate goal is to contribute to peace by showing that armed
              conflict exacts a terrible human cost on all sides. We believe that
              accurate information can help prevent escalation and promote
              diplomatic solutions before more families are torn apart by violence.
            </p>
          </div>
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
