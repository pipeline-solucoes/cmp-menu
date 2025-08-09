import React, { useRef, useState, useEffect } from 'react';
import { Box, styled } from '@mui/material';

const Container = styled(Box, {
  shouldForwardProp: (prop) =>
    !['border_radius', 'background_color', 'margin_card', 'width_card', 'flex_direction'].includes(prop as string),
})<{
  border_radius: string;
  background_color: string;
  margin_card: string;
  width_card: string;
  flex_direction: 'row' | 'column';
}>(({ border_radius, background_color, margin_card, width_card, flex_direction }) => ({
  display: 'flex',
  flexDirection: flex_direction,
  borderRadius: border_radius,
  width: width_card,
  height: 'fit-content',
  backgroundColor: background_color,
  margin: margin_card,
}));

const Map = styled('div', {
  shouldForwardProp: (prop) => !['border_radius', 'width', 'height'].includes(prop as string),
})<{
  border_radius: string;
  width: string;
  height: string;
}>(({ border_radius, width, height }) => ({
  width: width,
  height: height,
  borderRadius: `${border_radius} ${border_radius} 0 0`,
  position: 'relative',
  overflow: 'hidden',
}));

const Content = styled('div')({
  height: 'auto',
  padding: '20px 8px',
  flex: 1,
});

interface MapCardProps {
  srcGoogle: string;
  titleFrame: string;
  width_map: string;
  height_map: string;
  border_radius?: string;
  background_color?: string;
  margin?: string;
  flex_direction?: 'row' | 'column';
  root_margin?: string; // Começa a observar 300px antes do componente realmente entrar na tela
  children: React.ReactNode;
}

const MapCard: React.FC<MapCardProps> = ({
  srcGoogle,
  titleFrame,
  width_map,
  height_map,
  border_radius = '0px',
  background_color = 'transparent',
  margin = '0px',
  flex_direction = 'row',
  root_margin = '300px',
  children,
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const mapRef = useRef<HTMLDivElement | null>(null);

  const borderRadius =
    flex_direction === 'column' ? `${border_radius} ${border_radius} 0 0` : border_radius;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0,
        rootMargin: root_margin, 
      }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Container
      border_radius={border_radius}
      background_color={background_color}
      margin_card={margin}
      width_card="fit-content"
      flex_direction={flex_direction}
    >
      <Map ref={mapRef} border_radius={borderRadius} width={width_map} height={height_map}>
        {shouldLoad && (
          <iframe
            src={srcGoogle}
            title={titleFrame}
            style={{
              width: '100%',
              height: '100%',
              border: '0',
              borderRadius: borderRadius,
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        )}
      </Map>
      <Content>{children}</Content>
    </Container>
  );
};

export default MapCard;
