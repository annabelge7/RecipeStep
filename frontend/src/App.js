import React, { useEffect, useState } from "react";
import RecipeStep from "./RecipeStep";
import "./style.css";
import { useQuery, gql } from "@apollo/client";
import RecipeStepForm from "./RecipeStepForm";
import RecipeStepList from "./RecipeStepList";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-blue p-4">
      <header className="bg-blue text-black p-4">
        <h1 className="text-2xlg ">Recipe Step Tracker</h1>
      </header>

      <main className="flex-grow">
        <RecipeStepForm />
        <RecipeStepList />
      </main>
    </div>
  );
}
