"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2 className="text-lg text-center justify-center text-gray-default">
        Something went wrong!
      </h2>
      <button
        className="text-center justify-center text-gray-default"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
