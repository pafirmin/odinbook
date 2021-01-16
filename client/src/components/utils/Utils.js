import styled from "styled-components";

export const TextInput = styled.input`
  font: inherit;
  padding: 0.4em;
  border: 1px solid #c6c6c6;
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
  margin-top: 72px;
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  z-index: 1000;
`;

export const Notification = styled.div`
  border-radius: 50%;
  background-color: #f00;
  color: #fff;
  font-size: 0.8rem;
  width: 1.2em;
  height: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  margin-left: -3px;
  box-shadow: 2px 1px 3px #616161;
  position: absolute;
  top: -0.1em;
  right: -0.8em;
  cursor: pointer;
`;

export const DropDown = styled.div`
  color: #434343;
  position: fixed;
  flex-direction: column;
  top: 58px;
  right: 0;
  width: 300px;
  height: calc(100vh - 60px);
  overflow: auto;
  background-color: #fff;
  box-shadow: 2px 2px 8px #7d7d7d;
  padding: 0.5rem;
  text-align: center;
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
