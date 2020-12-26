import styled from "styled-components";

export const TextInput = styled.input`
  font: inherit;
  padding: 0.4em;
  border: none;
  border-radius: 0;
  background-color: #fff;
`;

export const Button = styled.button`
  color: ${({ variant }) => getColour(variant).font};
  border: none;
  background-color: ${({ variant }) => getColour(variant).bg};
  padding: 0.5em;
  cursor: pointer;
  font: inherit;
`;

export const Alert = styled.div`
  background-color: ${({ variant }) => getColour(variant).bg};
  border-radius: 20px;
  padding: 6px;
  margin: 6px auto;
  color: ${({ variant }) => getColour(variant).font};
  text-align: center;
  width: 1000px;
  max-width: 90%;
`;

export const AlertContainer = styled.div`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
`;

const getColour = (variant) => {
  switch (variant) {
    case "success":
      return { bg: "#6dd029", font: "#fff" };
    case "danger":
      return { bg: "#f33434", font: "#fff" };
    case "warning":
      return { bg: "#fdc52a", font: "#4f4e4e;" };
    default:
      return { bg: "#2d9ee9", font: "#fff" };
  }
};
