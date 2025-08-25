"use client";

import { Badge } from "@/components/ui/badge";
import { TTag } from "@/Type";
import React from "react";

interface IProps extends TTag {
  children: React.ReactNode;
}

function BadgeGroup(prop: IProps) {
  function onTagSelected(tag: string) {
    const section = document.getElementById("tag-" + tag);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Badge
      className="cursor-pointer"
      variant="outline"
      key={prop.value}
      onClick={() => onTagSelected(prop.label)}
    >
      {prop.children}
    </Badge>
  );
}

export default BadgeGroup;
