import React from "react";
import Button from "./Button";
import { useMutation, gql } from "@apollo/client";

const DELETE_RECIPE_STEP = gql`
  mutation DeleteStep($id: ID!) {
    deleteRecipeStep(data: { id: $id }) {
      id
    }
  }
`;

export default function Delete({ id }) {
  const [deleteRecipeStep, { loading, error }] = useMutation(
    DELETE_RECIPE_STEP,
    {
      variables: { id },
    }
  );

  const handleDelete = () => {
    deleteRecipeStep();
  };
  if (error) return <p>error: {error.message}</p>;
  if (loading) return "Loading...";

  return (
    <Button text={"Delete Step"} color={"lightgreen"} onClick={handleDelete} />
  );
}
