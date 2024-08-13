import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const UPDATE_RECIPE_STEP = gql`
  mutation UpdateRecipeStep($id: ID!, $completed: Boolean!) {
    updateRecipeStep(data: { id: $id, completed: $completed }) {
      id
      step
      completed
    }
  }
`;

export default function RecipeStep({ id, step, completed }) {
  /**
   * TODO #5:
   * 1. Add state for tracking if step is completed
   * 2. Update styles based on state
   */
  const [isComplete, setComplete] = useState(completed);
  const [updateRecipeStep, { loading, error }] = useMutation(
    UPDATE_RECIPE_STEP,
    {
      variables: { id, completed },
    }
  );

  const handleCheckbox = async (e) => {
    const newComplete = !isComplete;
    console.log(newComplete);
    e.preventDefault();
    setComplete(newComplete);

    try {
      const { data } = await updateRecipeStep({
        variables: { id, step, completed: newComplete },
        optimisticResponse: {
          updateRecipeStep: {
            id: id,
            step: step,
            completed: newComplete,
            __typename: "RecipeStep",
          },
        },
      });
    } catch (error) {
      console.error("failed update completed", error);
    }
  };

  if (error) return <p>error: {error.message}</p>;
  if (loading) return "Loading...";
  return (
    <li>
      <label
        style={{ textDecoration: isComplete ? "line-through" : "none" }}
        className="m-2"
      >
        {step}
      </label>
      <input
        type="checkbox"
        checked={isComplete}
        onChange={handleCheckbox}
      ></input>
    </li>
  );
}
