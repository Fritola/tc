import {
  Card,
  CardContent as MuiCardContent,
  Container as MuiContainer,
} from "@mui/material";
import styled from "styled-components";

export const Container = styled(MuiContainer)`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
`;

export const CardContainer = styled(Card)`
  width: 350px;
  max-height: max-content;
`;

export const CardContent = styled(MuiCardContent)`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
`;

export const ActionButtonContainer = styled.div`
  top: 0;
  right: 0;
  position: absolute;
`;

export const EditContainer = styled.div`
  display: flex;
  align-items: center;
`;
