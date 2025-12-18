import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumb" className="text-sm font-medium text-gray-600">
      <ol className="flex space-x-2">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li key={idx} className="flex items-center">
              {!isLast && item.href ? (
                <Link
                  href={item.href}
                  className="text-blue-600 hover:underline"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className="text-gray-800 font-semibold"
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <svg
                  className="mx-2 h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
