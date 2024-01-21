// src/components/ContactInfo.js
/* import React from 'react';

import './Info.css'

const ContactInfo = () => (
  <div className='info'>
    <h2>Contact info</h2>
    <p>Email: a-p.kvs@protonmail.com</p>
    <p>Phone: 0408215137</p>
    <p>Adress: Muuripadantie 1A4, 90630 Oulu</p>
  </div>
);

export default ContactInfo; */


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Info.css';
console.log("ContactInfo component rendered");
const ContactInfo = () => {
  useEffect(() => {
    console.log("mitä vittua");
  }, []);
/*   const [contactInfo, setContactInfo] = useState(null);
  console.log("contact info")
 
    useEffect(() => {
      const getData = async () => {
      const results = await axios.get('http://localhost:3000/contactinfo')
        console.log(results)
      setContactInfo(results.data);
      }
      getData();
    }, []); */

  

  return (
    <div className='info'>
      <h2>Contact info</h2>
{/*       {contactInfo ? (
        <>
          <p>Email: {contactInfo.email}</p>
          <p>Phone: {contactInfo.phone}</p>
          <p>Address: {contactInfo.address}</p>
        </>
      ) : (
        <p>Loading contact info...</p>
      )} */}
    </div>
  );
};

export default ContactInfo;
