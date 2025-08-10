'use client';

import React from 'react';
import { styled } from '@mui/material';

const ButtonStyled = styled('a', {
  shouldForwardProp: (prop) =>
    ![
      'background_color',
      'background_color_hover',
      'color',
      'color_hover',
      'padding',
      'border_radius',
      'border_color',
      'border_color_underline',
      'width',
      'margin',
    ].includes(prop as string),
})<{
  background_color: string;
  background_color_hover: string;
  color: string;
  color_hover: string;
  padding: string;
  border_radius: string;
  border_color: string;
  border_color_underline: string;
  width: string;
  margin: string;
}>(({
  background_color,
  background_color_hover,
  color,
  color_hover,
  padding,
  border_radius,
  border_color,
  border_color_underline,
  width,
  margin,
}) => ({
  width: width,
  cursor: 'pointer',
  textDecoration: 'none',
  textTransform: 'none',
  textAlign: 'center',
  boxShadow: 'none',
  backgroundColor: background_color,
  color: color,
  border: `1px solid ${border_color}`,
  borderRadius: border_radius,
  padding: padding,
  margin: margin,

  '&:hover': {
    backgroundColor: background_color_hover,
    borderBottom: `1px solid ${border_color_underline}`,
    color: color_hover,
  },
}));

interface NavigationButtonProps {  
  url: string;
  aria_label: string;
  background_color?: string;
  background_color_hover?: string;
  color: string;
  color_hover?: string; 
  border_color?: string;
  border_radius?: string;
  text_decoration: 'none' | 'underline';  
  layout: 'button' | 'link';
  width: string;
  margin?: string;
  children: React.ReactNode;     
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ 
  url, aria_label, background_color, background_color_hover,
  color, color_hover, border_radius, border_color, text_decoration = 'none',
  layout, width, margin, children }) => {
  
    const backgroundColor : string = background_color ?? 'transparent';
    const backgroundColorHover : string = background_color_hover ?? backgroundColor;
    const colorHover : string = color_hover ?? color;    
    const borderRadius : string = border_radius ?? '0px';
    const padding : string = layout == 'button' ? '8px 24px' : '0px';

    const borderColor : string = text_decoration == 'underline' ? 'transparent' : (border_color ?? 'transparent');
    const borderColorUnderline : string = (text_decoration == 'underline') ? color : (border_color ?? 'transparent');
    const marginButton : string = margin ?? '0px'; 
    
    if (url.indexOf('http') != -1) {

      return (
        <ButtonStyled 
          href={url}
          width={width}
          background_color={backgroundColor}
          background_color_hover={backgroundColorHover}
          color={color} 
          color_hover={colorHover}
          border_radius={borderRadius}
          border_color={borderColor}
          border_color_underline={borderColorUnderline}
          padding={padding}
          margin={marginButton}
          aria-label= {aria_label}  
          target="_blank"
          rel="noopener noreferrer">
          {children}
        </ButtonStyled>
      );    
    }
    else{

      const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Se for um link interno com hash
      if (url.startsWith('#')) {
        e.preventDefault();
        const id = url.replace('#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    };

      return (
        <ButtonStyled
          href={url} 
          onClick={handleClick}
          width={width}
          background_color={backgroundColor}
          background_color_hover={backgroundColorHover}
          color={color} 
          color_hover={colorHover}
          border_radius={borderRadius}
          border_color={borderColor}
          border_color_underline={borderColorUnderline}
          padding={padding}
          margin={marginButton}
          aria-label= {aria_label}              
        >
          {children}
        </ButtonStyled>
      );  
    }        
};

export default NavigationButton;