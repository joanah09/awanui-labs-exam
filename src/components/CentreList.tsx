import React from "react";
import { RegionData } from "../interface/IComponent";
import { Link } from "react-router-dom";

const CentreList: React.FC<{ centres: RegionData[] }> = ({ centres }) => {
  return (
    <ul>
      {centres.map((centre) => {
        const { id, slug, ...linkState } = centre;
        return (
          <li key={id} className="mb-2">
            <Link to={`/${slug}`} state={linkState}>
              {centre.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default CentreList;
