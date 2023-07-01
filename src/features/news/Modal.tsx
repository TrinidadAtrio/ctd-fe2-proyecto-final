import {
    CloseButton,
    TarjetaModal,
    ContenedorModal,
    DescripcionModal,
    ImagenModal,
    TituloModal,
    BotonSuscribir,
    CotenedorTexto,
  } from "./styled";
  import { CloseButton as Close } from "../../assets";
  import { INoticiasNormalizadas } from "./types";
  
  interface Props {
    noticia: INoticiasNormalizadas;
    onClose: () => void;
  }
  
  const ModalComponent: React.FC<Props> = ({ noticia, onClose }) => {
    return (
      <ContenedorModal>
        <TarjetaModal>
          <CloseButton onClick={onClose}>
            <img src={Close} alt="close-button" />
          </CloseButton>
          <ImagenModal src={noticia.imagen} alt="news-image" />
          <CotenedorTexto>
            {noticia.esPremium ? (
              <>
                <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
                <DescripcionModal>
                  Suscríbete a nuestro newsletter y recibe noticias de nuestros
                  personajes favoritos.
                </DescripcionModal>
                <BotonSuscribir
                  onClick={() =>
                    setTimeout(() => {
                      alert("Suscripto!");
                      onClose();
                    }, 1000)
                  }
                >
                  Suscríbete
                </BotonSuscribir>
              </>
            ) : (
              <>
                <TituloModal>{noticia.titulo}</TituloModal>
                <DescripcionModal>{noticia.descripcion}</DescripcionModal>
              </>
            )}
          </CotenedorTexto>
        </TarjetaModal>
      </ContenedorModal>
    );
  };
  
  export default ModalComponent;