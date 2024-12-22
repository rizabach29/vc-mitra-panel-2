import Spinner from "@/components/spinner";
import React from "react";

function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Spinner size="md" />
    </div>
  );
}

export default Loading;
