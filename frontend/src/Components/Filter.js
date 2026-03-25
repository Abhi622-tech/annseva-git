import react from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./styles/Filter.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Filter = ({ frequests, forganizations, requests, organizations }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { lat, long } = user.location;

  function distance(lat1, lon1, lat2, lon2) {
    const toRadians = (degree) => (degree * Math.PI) / 180;

    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  }

  const setFinals = (val) => {
    console.log(lat, long);

    if (val === 5) {
      requests(
        frequests.filter((request) => {
          console.log(request);
          const distanceInKm = distance(
            lat,
            long,
            request.receiverLocation.lat,
            request.receiverLocation.long
          );
          return distanceInKm <= 5;
        })
      );
      organizations(
        forganizations.filter((organization) => {
          console.log(organization);
          const distanceInKm = distance(
            lat,
            long,
            organization.location.lat,
            organization.location.long
          );
          return distanceInKm <= 5;
        })
      );
    } else if (val === 10) {
      requests(
        frequests.filter((request) => {
          const distanceInKm = distance(
            lat,
            long,
            request.receiverLocation.lat,
            request.receiverLocation.long
          );
          return distanceInKm <= 10;
        })
      );
      organizations(
        forganizations.filter((organization) => {
          const distanceInKm = distance(
            lat,
            long,
            organization.location.lat,
            organization.location.long
          );
          return distanceInKm <= 10;
        })
      );
    } else if (val === "city") {
      requests(
        frequests.filter((request) => {
          const distanceInKm = distance(
            lat,
            long,
            request.receiverLocation.lat,
            request.receiverLocation.long
          );
          return distanceInKm <= 25;
        })
      );
      organizations(
        forganizations.filter((organization) => {
          const distanceInKm = distance(
            lat,
            long,
            organization.location.lat,
            organization.location.long
          );
          return distanceInKm <= 25;
        })
      );
    } else {
      requests(frequests);
      organizations(forganizations);
    }
  };

  return (
    <div
      className="filter"
      style={{
        backgroundColor: "#26C42E",
        borderRadius: "10px",
        padding: "10px",
        paddingLeft: "20px",
      }}
    >
      <div
        className="filter-content"
        style={{
          display: "flex",
          gap: "3vw",
          alignItems: "center",
        }}
      >
        <div
          className="filter-section"
          style={{
            paddingTop: "10px",
          }}
        >
          <h3>Filter</h3>
        </div>
        <div
          className="filter-section"
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button className="filter-button" onClick={() => setFinals(5)}>
            5km
          </button>
          <button className="filter-button" onClick={() => setFinals(10)}>
            10km
          </button>
          <button className="filter-button" onClick={() => setFinals("city")}>
            City
          </button>
          <button className="filter-button" onClick={() => setFinals("all")}>
            All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;