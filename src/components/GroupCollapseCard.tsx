'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, Typography, Box, styled } from '@mui/material'
import { ShadowConfig } from '@/types/ShadowConfig'
import { SvgIconComponent } from '@mui/icons-material'
import { DataCard } from '@/types/DataCard'

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) =>
    !['border_radius', 'background_color', 'color',
      'width_card', 'min_height_card', 
      'border_width', 'sombraClara', 'sombraEscura'].includes(prop as string),
})<{
  border_radius: string;
  color: string;
  background_color: string;  
  width_card: string;
  min_height_card: string;  
  border_width: string;
  sombraClara: ShadowConfig;
  sombraEscura: ShadowConfig;
}>(({ border_radius, color, background_color, width_card, min_height_card, 
    border_width, sombraClara, sombraEscura }) => ({

    backgroundColor: background_color,
    color: color,
    borderRadius: border_radius,
    minHeight: min_height_card,    
    transition: 'background-color 0.3s ease',
    width: width_card, 
    height: 'auto',   
    boxShadow: `
        ${sombraClara.offsetX} ${sombraClara.offsetY} ${sombraClara.blur} ${sombraClara.color},
        ${sombraEscura.offsetX} ${sombraEscura.offsetY} ${sombraEscura.blur} ${sombraEscura.color}
    `,
    borderTop: `${border_width} solid ${sombraClara.color}`,
    borderLeft: `${border_width} solid ${sombraClara.color}`,
    padding: '0 0 16px 0' 
}))

const DivTitle = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',    
    gap: '16px',
    width: '100%',        
}));

const CustomCardContent = styled(CardContent)({
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center', 
  padding: '0px',
  '&:last-child': {
    padding: '8px 32px',
  },
});

const ContainerList = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',        
    width: '100%',  
    marginTop: '16px',
    gap: '8px'          
}));
 
interface  GroupCollapseCardProps {
  cards: DataCard[]; //Dados dos cards 
  icon: SvgIconComponent; //Icone quando o card estiver collapsado
  icon_expanded: SvgIconComponent; //Icone quando o card estiver expandido
  background_color: string; //Fundo quando o card estiver collapsado
  background_color_expanded: string; //Icone quando o card estiver expandido
  color: string; //Cor da Fonte quando o card estiver collapsado
  color_expanded: string; //Cor da Fonte quando o card estiver expandido
  width_card: string; //Largura do card
  min_height_card: string; //Altura mínima do card
  max_height_card: string; //Altura máxima do card
  border_radius?: string; //Arredondamento da borda do card
  sombraClara?: ShadowConfig; //Configuracao da Sombra Clara
  sombraEscura?: ShadowConfig; //Configuracao da Sombra Escura  
}

//Componente que cria uma lista de cards com efeito collapse/expanded do Frame Motion
const GroupCollapseCard: React.FC<GroupCollapseCardProps> = ({ 
  cards, icon, icon_expanded,
  background_color, background_color_expanded,
  color, color_expanded, width_card, 
  min_height_card, max_height_card, 
  border_radius = "0px",
  sombraClara = {offsetX:'0px', offsetY:'0px', blur:'0px', color:'transparent'},
  sombraEscura = {offsetX:'0px', offsetY:'0px', blur:'0px', color:'transparent'}, 
}) => {
  
  const [activeCard, setActiveCard] = useState<number | null>(null)  

  const border_width = (sombraClara.blur == '0px') ? '0px' : '3px';

  return (
    <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
      {cards.map(({ id, title, description, list_description }) => {
        
        const isActive = activeCard === id;
        const IconToRender = isActive ? icon_expanded : icon; 

        return (
          <motion.div
            key={id}
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            onClick={() => setActiveCard(activeCard === id ? null : id)}            
            style={{ cursor: 'pointer', width: width_card }}
          >
            <StyledCard 
                background_color={isActive ? background_color_expanded : background_color}
                color={isActive ? color_expanded : color} 
                width_card='100%'
                min_height_card={ isActive ? max_height_card : min_height_card }
                border_radius={border_radius}
                border_width={border_width}
                sombraClara={sombraClara}
                sombraEscura={sombraEscura}                                
            >
              <CustomCardContent>                
                <DivTitle>                    
                    <Typography variant="h6" component="div" align="left" flex={1}>
                        {title}
                    </Typography>
                    <Box fontSize={32}>
                      <IconToRender/>
                    </Box>
                </DivTitle>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Typography variant="body1" align="left" mt={2}>
                        {description}
                      </Typography>

                      {list_description?.length && (
                        <ContainerList>
                          {list_description?.map((item, index) => (
                            <Typography key={index} variant="body1" align="left">
                              {item}
                            </Typography>
                          ))}
                        </ContainerList>
                      )}

                    </motion.div>
                  )}
                </AnimatePresence>
              </CustomCardContent>
            </StyledCard>
          </motion.div>
        )
      })}
    </Box>
  )
};

export default GroupCollapseCard;