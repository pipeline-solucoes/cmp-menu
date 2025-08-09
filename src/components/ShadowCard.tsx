import React from 'react';
import { Box, styled } from '@mui/material';
import { ShadowConfig } from '@/types/ShadowConfig';

const Container = styled(Box, {
  shouldForwardProp: (prop) =>
    !['border_radius', 'background_color', 'margin_card','width_card',
      'height_card', 'sombraClara', 'sombraEscura', 'padding'].includes(prop as string),
})<{
  border_radius: string;
  background_color: string;
  margin_card: string;
  width_card: string;
  height_card: string;
  sombraClara: ShadowConfig;
  sombraEscura: ShadowConfig;
  padding: string;
}>(({ border_radius, background_color, margin_card, 
  sombraClara, sombraEscura, width_card, height_card, padding }) => ({
  borderRadius: border_radius,
  width: width_card,
  height: height_card,
  backgroundColor: background_color,
  margin: margin_card,
  padding: padding,
  boxShadow: `
    ${sombraClara.offsetX} ${sombraClara.offsetY} ${sombraClara.blur} ${sombraClara.color},
    ${sombraEscura.offsetX} ${sombraEscura.offsetY} ${sombraEscura.blur} ${sombraEscura.color}
  `,
  borderTop: `3px solid ${sombraClara.color}`,
  borderLeft: `3px solid ${sombraClara.color}`
}));

interface ShadowCardProps {  
  width: string; //largura do card
  height: string; //altura do map      
  border_radius?: string;
  background_color?: string;
  margin?: string;
  padding?: string;
  sombraClara: ShadowConfig;
  sombraEscura: ShadowConfig;
  children: React.ReactNode;
}

const ShadowCard: React.FC<ShadowCardProps> = ({  
  width,
  height,  
  border_radius = '0px',
  background_color = 'transparent', 
  margin = '0px',
  padding = '20px',
  sombraClara,
  sombraEscura,
  children,
}) => {
  return (
    <Container
      border_radius={border_radius}
      background_color={background_color}  
      margin_card={margin} 
      padding={padding} 
      sombraClara={sombraClara}
      sombraEscura={sombraEscura} 
      width_card={width}
      height_card={height} 
    >            
      {children}            
    </Container>
  );
};

export default ShadowCard;