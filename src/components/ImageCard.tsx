import React from 'react';
import { Box, styled } from '@mui/material';
import Image from 'next/image';

const Container = styled(Box, {
  shouldForwardProp: (prop) =>
    !['border_radius', 'background_color', 
      'margin_card', 'flex_direction'].includes(prop as string),
})<{
  border_radius: string;
  background_color: string;
  margin_card: string;  
  flex_direction: 'row' | 'column';
}>(({ border_radius, background_color,  
      margin_card, flex_direction}) => ({
  display: 'flex',
  flexDirection: flex_direction,      
  borderRadius: border_radius,
  width: 'fit-content',
  height: 'fit-content',
  backgroundColor: background_color,
  margin: margin_card,  
}));

const DivImage = styled('div', {
  shouldForwardProp: (prop) =>
    !['border_radius', 'width', 'height'].includes(prop as string),
})<{
  border_radius: string;  
  height: number;
}>(({ border_radius, height }) => ({
  width: 'fit-content',
  height: `${height}px`,
  position: 'relative',
  overflow: 'hidden',
  borderRadius: `${border_radius} ${border_radius} 0 0`,
}));

interface ImageCardProps {
  src: string;
  alt: string;    
  widthImage: number; 
  heightImage: number; 
  border_radius?: string;
  background_color?: string;
  margin?: string;
  flex_direction?: 'row' | 'column';
  children: React.ReactNode;
}

const ImageCard: React.FC<ImageCardProps> = ({
  src,
  alt,
  widthImage, 
  heightImage, 
  border_radius = '0px',
  background_color = 'transparent', 
  margin = '0px',
  flex_direction = 'row', 
  children,
}) => {

    const borderRadius = flex_direction == 'column' ? `${border_radius} ${border_radius} 0 0` :  border_radius;
  
    return (
        <Container border_radius={border_radius}
          background_color={background_color}  
          margin_card={margin}
          flex_direction={flex_direction}
        >
          <DivImage border_radius={borderRadius} height={heightImage}>
            <Image
              src={src}
              alt={alt}
              width={widthImage}
              height={heightImage}
              style={{ objectFit: 'cover', borderRadius: borderRadius}}
              quality={80}
            />
          </DivImage>
          <Box sx={{height: 'auto', flex: '1'}}>
            {children}
          </Box>      
        </Container>
      );
};

export default ImageCard;
