import Button from "./Button";
import React, { useState } from "react";
import RecipeStep from "./RecipeStep";
import { useMutation, gql } from "@apollo/client";

const UPDATE_RECIPE_STEP = gql`
  mutation UpdateRecipeStep($id: ID!, $step: String!) {
    updateRecipeStep(data: { id: $id, step: $step }) {
      id
      step
      completed
    }
  }
`;

export default function Update({ id, startStep, completed }) {
  const [step, setStep] = useState("");
  // const [input, setInput] = useState("");
  const [updateRecipeStep, { loading, error }] = useMutation(
    UPDATE_RECIPE_STEP,
    {
      variables: { id },
    }
  );

  const handleUpdate = async (e) => {
    console.log(e);
    e.preventDefault();
    if (!step) return;

    try {
      const { data } = await updateRecipeStep({
        variables: { id, step },
        optimisticResponse: {
          updateRecipeStep: {
            __typename: "RecipeStep",
            id: id,
            step: step,
            completed: completed,
          },
        },
      });
      setStep("");
    } catch (error) {
      console.error("failed update step", error);
    }
  };

  if (error) return <p>error: {error.message}</p>;
  if (loading) return "Loading...";
  return (
    <div>
      <input
        type="text"
        value={step}
        onChange={(e) => setStep(e.target.value)}
        placeholder="Edit Step"
        className="p-2"
      />{" "}
      <Button
        text="Apply Edit"
        color="lightgreen"
        onClick={(e) => handleUpdate(e)}
      />
    </div>
  );
}
