import { useEffect, useState } from "react";
import { Heart, Skull, Users } from "lucide-react";

const Footer = () => {
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const now = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    } as Intl.DateTimeFormatOptions;

    const formattedDate = now.toLocaleDateString("en-US", options) + " UTC";
    setLastUpdated(formattedDate);
  }, []);

  return (
    <footer className="bg-primary text-white">
      <div className="bg-danger py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <Skull className="h-10 w-10 mb-2" />
              <h4 className="font-bold text-lg">War Destroys Lives</h4>
              <p className="text-sm mt-1">Every casualty is someone's child, parent, or friend</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-10 w-10 mb-2" />
              <h4 className="font-bold text-lg">War Creates No Winners</h4>
              <p className="text-sm mt-1">Both sides suffer immeasurable, irreversible losses</p>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="h-10 w-10 mb-2" />
              <h4 className="font-bold text-lg">Peace Is The Only Path</h4>
              <p className="text-sm mt-1">Diplomacy saves lives that violence destroys</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-heading font-bold text-xl">Cost of War Tracker</h3>
              <p className="text-secondary text-sm mt-1">
                <strong>War cannot be justified by national pride or honor.</strong>
              </p>
              <p className="text-white text-sm mt-1">
                Promoting peace through awareness of war's true cost
              </p>
            </div>

            <div className="text-center md:text-right">
              <div className="text-sm text-secondary mb-2">
                Data last updated: <span>{lastUpdated}</span>
              </div>
              <p className="text-xs">
                © {new Date().getFullYear()} Cost of War Tracker. All data is presented to advocate for peace.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
