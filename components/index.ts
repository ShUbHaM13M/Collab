import React from "react";
import styled from "styled-components/native";

export const Colors = {
  purple: "hsla(238, 28%, 43%, 1)",
  purple_400: "hsla(238, 28%, 43%, 0.4)",
};

const Input = styled.TextInput`
  padding-horizontal: 10px;
  padding-vertical: 10px;
  border-radius: 10px;
  border-width: 2px;
  border-color: ${Colors.purple};
  min-width: 75%;
  margin-vertical: 10px;
`;

const Button = styled.Pressable`
  background-color: ${(props: any) =>
    props.primary ? Colors.purple : "transparent"};
  border-width: ${(props: any) => (props.primary ? "0px" : "2px")};
  border-color: ${(props: any) =>
    props.primary ? "transparent" : Colors.purple};
  border-radius: 10px;
  padding-vertical: 20px;
  min-width: 60%;
  align-items: center;
`;

export { Input, Button };
