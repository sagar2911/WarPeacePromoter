import { Conflict } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

interface ConflictsTableProps {
  conflicts?: Conflict[];
  isLoading: boolean;
}

const ConflictsTable = ({ conflicts, isLoading }: ConflictsTableProps) => {
  if (isLoading) {
    return (
      <div className="overflow-x-auto">
        <Skeleton className="h-72 w-full" />
      </div>
    );
  }

  return (
    <table className="min-w-full divide-y divide-neutral-200">
      <thead className="bg-neutral-100">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider"
          >
            Conflict
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider"
          >
            Year
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider"
          >
            Duration
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider"
          >
            Military Deaths
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider"
          >
            Civilian Deaths
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider"
          >
            Source
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-neutral-200">
        {conflicts?.map((conflict, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
              {conflict.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
              {conflict.year}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
              {conflict.duration}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
              ~{conflict.militaryDeathsIndia.toLocaleString()} (India),{" "}
              ~{conflict.militaryDeathsPakistan.toLocaleString()} (Pakistan)
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
              {typeof conflict.civilianDeaths === "number"
                ? conflict.civilianDeaths.toLocaleString()
                : conflict.civilianDeaths}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
              <a href={conflict.sourceUrl} className="text-primary hover:underline">
                {conflict.source}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ConflictsTable;
