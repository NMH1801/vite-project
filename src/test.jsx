import { useParams } from "react-router-dom";

export const Test =() =>{
  const { id } = useParams();
  return <h1>User ID: {id}</h1>;
}