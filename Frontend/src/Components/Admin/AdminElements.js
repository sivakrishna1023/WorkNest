import React from "react";
import Ainterface from './AddNewRole'
import Uadmin from './Updateadmin'
import WorkAccordion from './Allworks';
import AppBar from "../../shared/Appbar";
export default function AdminElements() {
  return (
    <>
      <WorkAccordion />
      <Ainterface/>
    </>
  );
}
