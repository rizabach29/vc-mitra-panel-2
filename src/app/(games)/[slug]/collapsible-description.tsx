"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";

function Description({ description }: { description: string }) {
  const [show, setShow] = useState<boolean>(false);
  const [overflowActive, setOverflowActive] = useState<boolean>(false);
  const overflowingText = useRef<HTMLDivElement>(null);

  const checkOverflow = (textContainer: HTMLSpanElement | null): boolean => {
    if (textContainer)
      return (
        textContainer.offsetHeight < textContainer.scrollHeight ||
        textContainer.offsetWidth < textContainer.scrollWidth
      );
    return false;
  };

  useEffect(() => {
    if (checkOverflow(overflowingText.current)) {
      setOverflowActive(true);
      return;
    }

    setOverflowActive(false);
  }, [overflowActive]);

  return (
    <div className="w-full">
      <div
        ref={overflowingText}
        className={`text-xs text-muted-foreground leading-5 ${
          !show ? "overflow-ellipsis line-clamp-3" : null
        } `}
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
      {overflowActive ? (
        <div className="flex items-center md:justify-center mt-3">
          {description && (
            <Button
              size="sm"
              variant="link"
              onClick={() => setShow((el) => !el)}
            >
              {show ? "Hide" : "Baca Selengkapnya"}
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Description;
