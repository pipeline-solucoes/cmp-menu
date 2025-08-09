import { useState, useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';

const ContentCard = styled('div', {
  shouldForwardProp: (prop) =>
    !['width', 'height', 'background_color', 'color', 'border_radius'].includes(prop as string),
})<{
  width?: string;
  height?: string;
  border_radius?: string;
  background_color?: string;
}>(({ width = '340px', height = '460px', border_radius='0', background_color = 'transparent'  }) => ({
  
  width: width,
  minWidth: width,
  minHeight: height,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  position: 'relative',
  marginBottom: '16px',
  borderRadius: border_radius,
  backgroundColor: background_color,
  flexDirection: 'column',
  boxSizing: 'border-box',
  padding: '20px',
  gap: '16px',
}));

const AreaTexto = styled('div')({
  width: '100%',
  height: 'auto',
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  gap: '16px',
  boxSizing: 'border-box',
});

const TextDestaque = styled('div', {
  shouldForwardProp: (prop) =>
    !['color'].includes(prop as string),
})<{
  color: string;
}>(({ color, theme  }) => ({

  color: color,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.body2?.fontWeight,
  fontStyle: theme.typography.body2?.fontStyle,
  lineHeight: theme.typography.body2?.lineHeight,
  letterSpacing: theme.typography.body2?.letterSpacing,
  fontSize: theme.typography.body2?.fontSize,
  margin: theme.typography.body2?.margin,  
  padding: 0,
}));

const DescricaoContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{
  expanded: boolean;
}>(({ expanded }) => ({
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: expanded ? 'unset' : 6,
  WebkitBoxOrient: 'vertical',
  textOverflow: 'ellipsis',
}));

const Description = styled('div', {
  shouldForwardProp: (prop) =>
    !['color'].includes(prop as string),
})<{
  color: string;
}>(({ color, theme  }) => ({
  margin: '0 0 8px',
  color: color,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.body1?.fontWeight,
  fontStyle: theme.typography.body1?.fontStyle,
  lineHeight: theme.typography.body1?.lineHeight,
  letterSpacing: theme.typography.body1?.letterSpacing,
  fontSize: theme.typography.body1?.fontSize, 
}));

const LerMais = styled('button', {
  shouldForwardProp: (prop) =>
    !['color'].includes(prop as string),
})<{
  color: string;
}>(({ color, theme  }) => ({
  background: 'none',
  border: 'none',
  color: color,
  cursor: 'pointer',
  padding: 0,
  textAlign: 'left',
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.caption?.fontWeight,
  fontStyle: theme.typography.caption?.fontStyle,
  lineHeight: theme.typography.caption?.lineHeight,
  letterSpacing: theme.typography.caption?.letterSpacing,
  fontSize: theme.typography.caption?.fontSize,
  margin: theme.typography.caption?.margin, 

  '&:hover': {
    textDecoration: 'underline',
  },
}));

const ImageTag = styled('img')(({ theme }) => ({
  padding: '8px',
  height: '40px',
  width: '40px',
  [theme.breakpoints.down('sm')]: {
    height: '32px',
    width: '32px',
  },
}));

interface CardLerMaisProps {
  text_footer?: string;
  description: string[];
  expand?: boolean;
  icon: string; 
  background_color?: string;
  color_text_description: string;
  color_text_footer: string;
  color_text_lermais: string;
  border_radius?: string; 
  width?: string; 
  height?: string; 
}

const CardLerMais: React.FC<CardLerMaisProps> = ({
  text_footer, 
  description, 
  icon, 
  background_color = 'transparent', 
  color_text_footer,
  color_text_description,
  color_text_lermais,
  border_radius = '0', 
  expand = false,  
  width = "100%",
  height = "100%"
}) => {

  const [expanded, setExpanded] = useState(false);
  const [exibeBotao, setExibeBotao] = useState(false);
  const descricaoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descricaoRef.current) {
      const lineHeight = parseFloat(getComputedStyle(descricaoRef.current).lineHeight);
      const height = descricaoRef.current.scrollHeight;
      const maxLines = 6;
      const maxHeight = lineHeight * maxLines;
      setExibeBotao(height > maxHeight);
      setExpanded(expand);
    }
  }, [description, expand]);

  return (
    <ContentCard width={width} height={height} background_color={background_color} border_radius={border_radius}>
      { icon && <ImageTag src={icon} alt="icone card" /> }
      <AreaTexto>
        <DescricaoContainer ref={descricaoRef} expanded={expanded}>
          {description.map((item, index) => (
            <Description key={index} color={color_text_description}>{item}</Description>
          ))}
        </DescricaoContainer>

        {exibeBotao && (
          <LerMais color={color_text_lermais} onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Ler menos' : 'Ler mais'}
          </LerMais>
        )}

        {text_footer && <TextDestaque color={color_text_footer}>{text_footer}</TextDestaque> }
      </AreaTexto>
    </ContentCard>
  );
};

export default CardLerMais;