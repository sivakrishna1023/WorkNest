import React from "react";
import Ainterface from './AddNewRole'
import Uadmin from './Updateadmin'
import WorkAccordion from './Allworks';
import AppBar from "../Components/Appbar";
export default function AdminElements() {
  return (
    <>
      <AppBar
        name3={<Uadmin> </Uadmin>}
        name4="delete Account"
        name5="Sign Out"
      />
      <WorkAccordion />
      <Ainterface/>
    </>
  );
}
