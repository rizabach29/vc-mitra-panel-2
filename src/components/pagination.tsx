import React from "react";
import { Button } from "./ui/button";
import { TPaginationMeta } from "@/types/utils";

export type TPaginationProp = {
  meta: TPaginationMeta;
  onChange: (val: number) => void;
};

function Pagination(props: TPaginationProp) {
  console.log(props.meta);
  var total = Math.ceil(props.meta.total / props.meta.limit);

  return (
    <div className="flex items-center justify-between space-x-2 py-4 mt-2">
      <p className="text-xs text-muted-foreground mx-2">
        Total {props.meta.total} data
      </p>
      <div className="flex items-center justify-end space-x-2">
        <p className="text-xs mr-2">
          Page {props.meta.page} of {total}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => props.onChange(props.meta.page - 1)}
          disabled={props.meta.page == 1}
          className="flex items-center justify-center"
        >
          <span>Prev</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => props.onChange(props.meta.page + 1)}
          disabled={props.meta.page >= total}
          className="flex justify-center items-center"
        >
          <span>Next</span>
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
