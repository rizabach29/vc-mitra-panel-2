import { Card, CardContent } from "@/components/ui/card";
import React from "react";

function FormWrapper({
  children,
  number,
  title,
}: {
  children: React.ReactNode;
  number: number;
  title: string;
}) {
  return (
    <Card className="w-full my-2">
      <CardContent>
        <div className="flex gap-2 items-center mt-3 mb-4">
          <div
            className={` p-2 w-7 h-7 flex justify-center items-center rounded-full bg-primary`}
          >
            <p className="font-bold rounded-full text-white">{number}</p>
          </div>
          <h2 className={`font-medium ml-1 text-primary text-base p-0 m-0`}>
            {title}
          </h2>
        </div>
        <div>{children}</div>
      </CardContent>
    </Card>
  );
}

export default FormWrapper;
