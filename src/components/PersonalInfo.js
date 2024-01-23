// src/components/PersonalInfo.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import "./Info.css";

const PersonalInfo = () => {
  const { t } = useTranslation();
  const [infos, setInfos] = useState([]);
  const [error, setError] = useState(null);

  const { i18n } = useTranslation();

  useEffect(() => {
    const getData = async () => {
      try {
        const config = {
          headers: {
            "Accept-Language": i18n.language,
          },
        };
        const results = await axios.get(
          "http://localhost:3000/personalinfo/lang",
          config
        );
        setInfos(results.data);
        //console.log(results.data);
      } catch (err) {
        setError(err.message);
      }
    };
    getData();
  }, [i18n.language]); // Add i18n.language as a dependency

  if (error) {
    return <div className="info">Error: {error}</div>;
  }

  return (
    <div className="info">
      <h2>{t("personalInfo")}</h2>
      {infos.length > 0 ? (
        infos.map((info, index) => (
          <div key={index}>
            <p>
              {t("name")}: {info.name}
            </p>
            <p>
              {t("dateOfBirth")}: {info.birthdate}
            </p>
            <p>
              {t("Nationality")}: {info.nationality}
            </p>
            <p>
              {t("driversLicense")}: {info.driversLicense}
            </p>
            <p>
              {t("militaryService")}: {info.militaryService}
            </p>
          </div>
        ))
      ) : (
        <p>Loading contact info...</p>
      )}
    </div>
  );
};

export default PersonalInfo;
