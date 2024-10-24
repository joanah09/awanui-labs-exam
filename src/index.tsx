import React, { useState } from "react";
import "./index.css";
import useCollectionCentres from "../hooks/useCollectionCentres";
import Layout from "./containers/layout";
import CentreList from "./components/CentreList";
import { Loader } from "./helper/loader";

const Index: React.FC = () => {
  const { data, loading, error } = useCollectionCentres();
  const [searchQuery, setSearchQuery] = useState("");
  const preview = false;

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const searchResults = searchQuery
    ? data
        .flatMap((region) => region.data)
        .filter((centre) =>
          centre.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : [];

  return (
    <Layout preview={preview}>
      <div className="container xl:bg-slate-100 py-10 px-8 rounded-xl">
        <div className="title-section pb-10 mb-10 border-b-2 border-slate-200">
          <h1>Collection Centres latest news:</h1>
          <span className="text-base lg:text-2xl">
            For collection centre opening hours, please see full details here or
            in the list to the right.
          </span>
        </div>

        <div className="flex flex-col xl:flex-row gap-10">
          <section className="w-full xl:w-1/2">
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full h-[50px] px-3 border rounded"
            />

            {searchResults.length > 0 && (
              <div className="search-results mt-5">
                <h3>Search Results:</h3>
                <CentreList centres={searchResults} />
              </div>
            )}

            {searchQuery && searchResults.length === 0 && (
              <div className="mt-5">
                <p>No results found for "{searchQuery}".</p>
              </div>
            )}
          </section>

          <section className="collection-centres w-full xl:w-1/2">
            {Array.isArray(data) &&
              data.map((region) => (
                <div key={region.id} className="mb-5">
                  <details>
                    <summary>{region.title}</summary>
                  </details>
                  <div className="content px-4 py-2">
                    <CentreList centres={region.data} />
                  </div>
                </div>
              ))}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
