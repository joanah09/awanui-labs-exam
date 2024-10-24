import { useState, useEffect } from 'react';
import * as _ from 'lodash';
import { CollectionCentre } from '../src/interface/IComponent';

const useCollectionCentres = () => {
  const [data, setData] = useState<CollectionCentre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://loc.aphg.co.nz/wp-json/labtests/v1/collection-centres/?website=labtests'
        );
        if (!response.ok) {
          throw new Error('Network response error');
        }
        const result = await response.json();
        const centres: CollectionCentre[] = _.compact(
          Object.values(result).map((region: any) => {
            if (!Array.isArray(region)) return region;
            return undefined;
          })
        );
        setData(centres);
        setLoading(false);
        console.log(centres);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useCollectionCentres;
