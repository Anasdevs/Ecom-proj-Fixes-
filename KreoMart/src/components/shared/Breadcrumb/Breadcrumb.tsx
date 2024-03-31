// components/Breadcrumbs.tsx
import Link from "next/link";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  paths: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ paths }) => {
  return (
    <nav className="text-lg font-medium text-gray-default mb-4 gap-2">
      {paths.map((path, index) => (
        <span key={index}>
          {index > 0 && " / "}
          {path.href ? (
            <Link href={path.href}>{path.label}</Link>
          ) : (
            <span className="text-gray-600 ">{path.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
