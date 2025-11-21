import { ArrowLeft, ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  items: { label: string; onClick?: () => void }[];
  onBack?: () => void;
}

export function Breadcrumb({ items, onBack }: BreadcrumbProps) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2.5 rounded-lg shadow">
      <button
        onClick={handleBack}
        className="flex items-center gap-1.5 hover:text-blue-600 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <button
        onClick={items[0]?.onClick}
        className="flex items-center gap-1 hover:text-blue-600 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Dashboard</span>
      </button>
      {items.slice(1).map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className="hover:text-blue-600 transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className={index === items.length - 2 ? "text-gray-900 font-medium" : "text-gray-500"}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
