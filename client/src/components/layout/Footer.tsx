import { useEffect, useState } from "react";

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
    <footer className="bg-primary text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="font-heading font-bold text-xl">War Impact Tracker</h3>
            <p className="text-secondary text-sm mt-1">
              Promoting peace through objective information
            </p>
          </div>

          <div className="text-center md:text-right">
            <div className="text-sm text-secondary mb-2">
              Data last updated: <span>{lastUpdated}</span>
            </div>
            <p className="text-xs">
              © {new Date().getFullYear()} War Impact Tracker. All data is presented for educational purposes.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
