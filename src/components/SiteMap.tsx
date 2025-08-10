'use client';

import * as React from 'react';
import { useEffect } from 'react';
import NavigationButton from './NavigationButton';
import { ItemMenuConfig } from '@/types/ItemMenuConfig';
import { SpanBody1 } from './BarraFerramentasStyled';
import { styled } from '@mui/material';

export const Container = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexGrow: 1,
    gap: '16px',
    width: '100%',    
}));

interface SiteMapProps {    
    listaItemMenu: ItemMenuConfig[];   
    color: string;    
    color_hover: string;       
}

const SiteMap: React.FC<SiteMapProps> = ({
    listaItemMenu, color, color_hover }) => {

  const [buttons, setButtons] = React.useState<React.ReactNode[] | null>(null);
    
    useEffect(() => {
      if (listaItemMenu) {
          
        const constructedButtons = listaItemMenu.map((item) => (
              
          <NavigationButton
            key={item.url}
            url={item.url}
            color={color}
            color_hover={color_hover}
            aria_label={`item menu ${item.text}`}
            layout="link"
            width="auto"                                   
            text_decoration="none"
          >
            <SpanBody1 text_color={color}>{item.text}</SpanBody1>
          </NavigationButton>
        ));
        setButtons(constructedButtons);
      }
  }, [listaItemMenu, color, color_hover]);

  if (buttons){
    return (                
      <Container>
        {buttons}
      </Container>                    
    );
  }
  else{
    <Container>
      carregando...
    </Container>
  }
}

export default SiteMap;
