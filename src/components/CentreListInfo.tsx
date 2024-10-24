import { useLocation } from "react-router-dom";
import Layout from "../containers/layout";
import { GoogleMap, Marker } from "@react-google-maps/api";
import React, { useState, useEffect } from "react";

const CentreListInfo: React.FC = () => {
  const location = useLocation();
  const {
    name,
    address,
    region,
    post_code,
    street,
    city,
    opening_hours,
    phone_number,
    payment_facilities,
    test_type,
    accessibility,
    services,
    longitude,
    latitude,
    map_marker,
  } = location.state || {};

  const containerStyle = {
    width: "100%",
    height: "100%",
    minHeight: "400px",
  };

  const center = {
    lat: latitude ? Number(latitude) : 0,
    lng: longitude ? Number(longitude) : 0,
  };

  const [markers, setMarkers] = useState<
    { lat: number; lng: number; name: string }[]
  >([]);

  useEffect(() => {
    if (map_marker && Array.isArray(map_marker)) {
      setMarkers(map_marker);
    } else if (latitude && longitude) {
      setMarkers([
        {
          name: name || "Main Centre",
          lat: center.lat,
          lng: center.lng,
        },
      ]);
    }
  }, [latitude, longitude, map_marker, name]);

  return (
    <Layout preview={false}>
      <div className="centre-list xl:bg-slate-100 py-10 px-8 rounded-xl">
        <h2>{name}</h2>
        <div className="flex flex-col xl:flex-row gap-10 pt-10">
          <section className="w-full xl:w-2/3">
            {longitude && latitude ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
              >
                {markers.map((marker, index) => (
                  <Marker
                    key={index}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    title={marker.name}
                  />
                ))}
              </GoogleMap>
            ) : (
              <p>Location not available</p>
            )}
          </section>

          <section className="w-full xl:w-1/3 flex flex-col sm:flex-row xl:flex-col xl:border-l-2 border-slate-200 xl:pl-5">
            <article className="sec-1">
              <div className="address">
                <h3>Address:</h3>
                <p>{address}</p>
                <p>{street}</p>
                <p>
                  {city}, {region}
                </p>
                <p>{post_code}</p>
              </div>

              <div className="opening">
                <h3>Opening:</h3>
                {opening_hours && opening_hours.length > 0 && (
                  <ul>
                    {opening_hours.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="phone">
                <h3>Phone:</h3>
                <p>{phone_number}</p>
              </div>

              <div className="payment">
                <h3>Payment:</h3>
                <p>{payment_facilities}</p>
              </div>

              <div className="services">
                <h3>Services:</h3>
                <p>{services}</p>
              </div>
            </article>

            <article className="sec-2 w-full mt-5">
              <div className="test-type">
                <h3>Test type:</h3>
                {test_type && test_type.length > 0 && (
                  <ul>
                    {test_type.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="accessibility">
                <h3>Accessibility:</h3>
                {accessibility && accessibility.length > 0 && (
                  <ul>
                    {accessibility.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default CentreListInfo;
