import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const MapDashboard = () => {
  const [locations, setLocations] = useState([]);

  //   const updateCoordinates = () => {
  //     setLocations((prevLocations) =>
  //       prevLocations.map((person) => ({
  //         ...person,
  //         latitude: person.latitude + (Math.random() < 0.5 ? 0.01 : -0.01), // Change by 0.01
  //         longitude: person.longitude + (Math.random() < 0.5 ? 0.01 : -0.01), // Change by 0.01
  //       }))
  //     );
  //   };

  // Fetch locations from the API initially
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/locations"
        );
        setLocations(response.data.locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  //   useEffect(() => {
  //     const intervalId = setInterval(() => {
  //       updateCoordinates();
  //     }, 2000);

  //     return () => clearInterval(intervalId);
  //   }, []);

  const FitMapBounds = () => {
    const map = useMap();

    useEffect(() => {
      if (locations.length > 0) {
        const bounds = locations.map((person) => [
          person.latitude,
          person.longitude,
        ]);
        map.fitBounds(bounds); // Automatically fit bounds to the markers
      }
    }, [map]);

    return null;
  };

  const openSpecificLocationInGoogleMaps = (name) => {
    const googleMapsUrl =
      name === "Central Park"
        ? "https://www.google.com/maps/place/Central+Park+SOLE/@40.7849215,-73.9724596,17z/data=!3m2!4b1!5s0x89c2589ade15583d:0x821382832c28b36a!4m6!3m5!1s0x89c2591fed635c23:0xebe6f9cb3030e526!8m2!3d40.7849175!4d-73.9698847!16s%2Fg%2F11q1g90mvp?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D"
        : name === "Times Square"
        ? "https://www.google.com/maps/place/Times+Square/@40.7484405,-73.9856644,17z/data=!4m6!3m5!1s0x89c25855c6480299:0x55194ec5a1ae072e!8m2!3d40.7579747!4d-73.9855426!16zL20vMDdxZHI?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D"
        : "https://www.google.com/maps/place/Empire+State+Building/@40.7484445,-73.9882393,17z/data=!3m2!4b1!5s0x8b398fecd1aea119:0x76fa1e3ac5a94c70!4m6!3m5!1s0x89c259a9b3117469:0xd134e199a405a163!8m2!3d40.7484405!4d-73.9856644!16zL20vMDJuZF8?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D";
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "800px",
      }}
    >
      <h2>People&apos;s Locations (Real-Time Update)</h2>

      <MapContainer
        center={[40.785091, -73.968285]}
        zoom={13}
        style={{ width: "100%", height: "500px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {locations.map((person) => (
          <Marker
            key={person.id}
            position={[
              parseFloat(person.latitude),
              parseFloat(person.longitude),
            ]}
          >
            <Popup>
              <div>
                <p>{person.name}</p>
                <button
                  onClick={() => openSpecificLocationInGoogleMaps(person.name)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Open in Google Maps
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        <FitMapBounds />
      </MapContainer>
    </div>
  );
};

export default MapDashboard;

// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import io from "socket.io-client";
// import { Snackbar, Alert } from "@mui/material";

// const socket = io("http://localhost:3000"); // Connect to the backend server

// const MapDashboard = () => {
//   const [locations, setLocations] = useState([]);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

//   // Fetch locations from the API initially
//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/auth/locations"
//         );
//         setLocations(response.data.locations);
//       } catch (error) {
//         console.error("Error fetching locations:", error);
//       }
//     };

//     fetchLocations();
//   }, []);

//   // Set up Socket.IO for real-time notifications
//   useEffect(() => {
//     socket.on("notification", (notification) => {
//       setSnackbar({
//         open: true,
//         message: `${notification.title}: ${notification.message}`,
//         severity: "info",
//       });
//     });

//     return () => {
//       socket.off("notification"); // Cleanup socket connection
//     };
//   }, []);

//   const handleSnackbarClose = () => {
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         width: "800px",
//       }}
//     >
//       <h2>People&apos;s Locations (Real-Time Update)</h2>

//       {/* Snackbar for Notifications */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={5000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>

//       {/* Map */}
//       <MapContainer
//         center={[40.785091, -73.968285]}
//         zoom={13}
//         style={{ width: "100%", height: "500px" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />

//         {locations.map((person) => (
//           <Marker
//             key={person.id}
//             position={[
//               parseFloat(person.latitude),
//               parseFloat(person.longitude),
//             ]}
//           >
//             <Popup>{person.name}</Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// };

// export default MapDashboard;
