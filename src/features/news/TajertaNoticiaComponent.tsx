import {
    TarjetaNoticia,
    ImagenTarjetaNoticia,
    TituloTarjetaNoticia,
    FechaTarjetaNoticia,
    DescripcionTarjetaNoticia,
    BotonLectura,
  } from "./styled";
  import { INoticiasNormalizadas } from "./types";
  
  interface Props {
    noticia: INoticiasNormalizadas;
    verMas: (noticia: INoticiasNormalizadas) => void;
  }
  
  const TarjetaNoticiaComponent: React.FC<Props> = ({ noticia, verMas }) => {
    return (
      <TarjetaNoticia>
        <ImagenTarjetaNoticia src={noticia.imagen} />
        <TituloTarjetaNoticia>{noticia.titulo}</TituloTarjetaNoticia>
        <FechaTarjetaNoticia>{noticia.fecha}</FechaTarjetaNoticia>
        <DescripcionTarjetaNoticia>
          {noticia.descripcionCorta}
        </DescripcionTarjetaNoticia>
        <BotonLectura onClick={() => verMas(noticia)}>Ver más</BotonLectura>
      </TarjetaNoticia>
    );
  };
  
  export default TarjetaNoticiaComponent;
  