import { Box, Container as MuiContainer } from "@mui/material";
import styled from "styled-components";

export const StyledBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
`;

export const Container = styled(MuiContainer)`
  border: solid 1px #000;
  flex-direction: column;
  display: flex;
  justify-content: center;
  padding: 20px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;
