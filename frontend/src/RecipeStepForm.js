import React, { useState } from "react";
import RecipeStep from "./RecipeStep";
import { useMutation, gql } from "@apollo/client";

const ADD_RECIPE_STEP = gql`
  mutation AddStep($step: String!) {
    addRecipeStep(data: { step: $step }) {
      id
      step
      completed
    }
  }
`;
// const GET_RECIPE_STEPS = gql`
//   query AllRecipeSteps {
//     recipeSteps {
//       id
//       step
//       completed
//     }
//   }
// `;

export default function RecipeStepForm() {
  //   document.getElementById("recipe-step").addEventListener("input", function () {
  //     console.log(this.value);
  //   });

  const [input, setInput] = useState(""); //sets input
  const [addRecipeStep, { loading, error, data }] =
    useMutation(ADD_RECIPE_STEP);
  //I copied this directly from apollo docs and it was fairly easy to do except i
  //then had to rewrite the get_recipe steps query since it is in a differnt component
  //which felt like a waste of code to me
  //     {
  //       update(cache, { data: { addRecipeStep } }) {
  //         const existingSteps = cache.readQuery({ query: GET_RECIPE_STEPS });
  //         if (existingSteps && addRecipeStep) {
  //           cache.writeQuery({
  //             query: GET_RECIPE_STEPS,
  //             data: {
  //               recipeSteps: [...existingSteps.recipeSteps, addRecipeStep],
  //             },
  //           });
  //         }
  //       },
  //     }
  //   ); //usemutation is apollo client call

  const handleAdd = async (e) => {
    //handle submit waits for the event to occur
    e.preventDefault(); //prevents from reloading
    if (!input) return; //if input is non return because nothing there
    const { data } = await addRecipeStep({
      //awaits the data from add recipe step
      variables: { step: input }, //this is the variable we are referencing above then mutates backend (awaiting) with variable
    });

    setInput(""); //once mutated sets input back to none
  };

  if (error) return <p>Error: {error.message}</p>;
  if (loading) return "Loading...";

  return (
    <form className="flex flex-col mt-4 p-4 bg-white" onSubmit={handleAdd}>
      <label className="text-sm pb-4 text-black">Add task:</label>
      <textarea
        className="border border-gray p-2 mb-4"
        value={input}
        onChange={(e) => setInput(e.target.value)} //sets the input as event change
        placeholder="Enter New Recipe Step"
      ></textarea>
      <button
        type="submit"
        className="pt-2 pb-2 pr-4 pl-4 bg-purple text-white hover:bg-lightgreen"
      >
        Add
      </button>
    </form>
  );
}
