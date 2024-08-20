import React from "react";
import SearchList from "./search-list";

function PublicPage() {
  return (
    <div className="bg-no-repeat bg-center rounded-xl">
      <div className="h-full min-h-[80vh] flex pt-4 md:pt-8 md:px-0 items-center flex-col">
        <div className="max-w-[60rem] bg-opacity-90 min-h-full w-full">
          <div className="px-4">
            <h3 className="text-3xl max-w-[40rem] font-semibold">
              Cek Pesananku
            </h3>
          </div>
          <SearchList />
        </div>
      </div>
    </div>
  );
}

export default PublicPage;
