'use client';

import React from 'react';
import { styled } from '@mui/material';

export const ButtonHoverBorderBottomStyled = styled('button', {
  shouldForwardProp: (prop) =>
    ![
      'background_color',
      'color',
      'color_hover',
      'type_padding',
      'border_radius',
      'border_color',
      'width',
    ].includes(prop as string),
})<{
  background_color?: string;
  color: string;
  color_hover?: string;
  type_padding: 'none' | 'default';
  border_radius?: string;
  border_color?: string;
  width: string;
}>(({ background_color, color, color_hover, type_padding, border_radius, border_color, width }) => ({
  width: width,
  cursor: 'pointer',
  textDecoration: 'none',
  textTransform: 'none',
  borderBottom: '2px solid transparent',
  margin: '0px',
  boxShadow: 'none',
  backgroundColor: background_color || 'transparent',
  color: color,
  borderRadius: border_radius || '0px',
  border: border_color ? `1px solid ${border_color}` : 'none',
  padding: type_padding === 'default' ? '8px 24px' : '0px',

  '&:hover': {
    borderBottom: `2px solid ${color_hover || color}`,
    color: color_hover || color,
  },
}));

export const ButtonHoverColorStyled = styled('button', {
  shouldForwardProp: (prop) =>
    ![
      'background_color',
      'color',
      'color_hover',
      'type_padding',
      'border_radius',
      'border_color',
      'width',
    ].includes(prop as string),
})<{
  background_color?: string;
  color: string;
  color_hover?: string;
  type_padding: 'none' | 'default';
  border_radius?: string;
  border_color?: string;
  width: string;
}>(({ background_color, color, color_hover, type_padding, border_radius, border_color, width }) => ({
  width: width,
  cursor: 'pointer',
  textDecoration: 'none',
  textTransform: 'none',  
  margin: '0px',
  boxShadow: 'none',
  backgroundColor: background_color || 'transparent',
  color: color,
  borderRadius: border_radius || '0px',
  border: border_color ? `1px solid ${border_color}` : 'none',
  padding: type_padding === 'default' ? '8px 24px' : '0px',

  '&:hover': {
    color: color_hover || color,
  },
}));

interface NavigationHamburguerButtonProps {
  url: string;
  aria_label: string;
  background_color?: string;
  color: string;
  color_hover?: string; 
  border_color?: string;
  border_radius?: string; 
  text_decoration: 'none' | 'underline';
  layout: 'button' | 'link';
  width: string;
  children: React.ReactNode;
  afterNavigation: () => void;   
}

const NavigationHamburguerButton: React.FC<NavigationHamburguerButtonProps> = ({ 
  url, aria_label, background_color,
  color, color_hover, border_radius, border_color, text_decoration, 
  layout, width, children, afterNavigation }) => {
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Caso seja âncora (#id)
    if (url.startsWith('#')) {
      if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        const targetElement = document.querySelector(url);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          // Não altera a URL — removido o pushState
        }
      } else {          
        window.location.href = url; 
      }
    } 
    // Caso seja link interno sem http
    else if (!url.startsWith('http')) {
      window.open(url, '_blank', 'noopener noreferrer'); 
    } 
    // Caso seja link externo
    else {
      window.location.href = url; 
    }

    afterNavigation();
  };

  if (text_decoration === 'underline') {
    return (
      <ButtonHoverBorderBottomStyled
        width={width}
        background_color={background_color}
        color={color} 
        color_hover={color_hover}
        border_radius={border_radius}
        border_color={border_color}
        type_padding={layout === 'button' ? 'default' : 'none'}
        aria-label={aria_label}
        onClick={handleClick}
      >        
        {children}             
      </ButtonHoverBorderBottomStyled>
    );  
  }
  
  return (
    <ButtonHoverColorStyled
      width={width}
      background_color={background_color}
      color={color} 
      color_hover={color_hover}
      border_radius={border_radius} 
      border_color={border_color}    
      type_padding={layout === 'button' ? 'default' : 'none'}
      aria-label={aria_label}
      onClick={handleClick}
    >        
      {children}             
    </ButtonHoverColorStyled>
  );  
};

export default NavigationHamburguerButton;
