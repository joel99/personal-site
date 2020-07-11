import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const Button = props => (
  <ButtonWrapper props={props}>{props.children}</ButtonWrapper>
)

export const ButtonLink = props => {
  const { to, name, ...other } = props;

  return (
    <Link to={to}>
      <ButtonWrapper props={other}>{name}</ButtonWrapper>
    </Link>
  );
}

// TODO fix font here
// TODO heavy light presets

/**
 *   padding: ${props => props.props.padding || "10px 25px"};
 *   font-size: ${props => props.props.fontSize || "15px"};
 *   font-weight: ${props => props.props.fontWeight || "600"};
 */
const ButtonWrapper = styled.button`
  display: block;
  text-align: center;
  box-sizing: border-box;
  text-decoration: none;
  cursor: pointer;
  border: 1.2px solid #207DFF;

  background: ${props => props.props.background || "white"};
  color: ${props => props.props.color || "#207DFF"};
  padding: ${props => props.props.padding || "3px 8px"};
  font-size: ${props => props.props.fontSize || "12px"};
  font-weight: ${props => props.props.fontWeight || "400"};

  font-family: "sans-serif";
  border-radius: ${props => props.props.radius || "4px"};
  margin-top: ${props => props.props.marginTop};
  margin-bottom: ${props => props.props.marginBottom};

  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.25);
  }
`

export default Button
