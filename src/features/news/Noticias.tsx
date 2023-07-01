import { useState, useEffect } from "react";
import TarjetaNoticiaComponent from "./TajertaNoticiaComponent";
import { obtenerNoticias } from "./fakeRest";
import { INoticiasNormalizadas } from "./types";
import ModalComponent from "./Modal";
import { ContenedorNoticias, ListaNoticias, TituloNoticias } from "./styled";

//Se aplicó el principio SOLID de responsabilidad única: dividiendo el componente en varios para permitir una mejor interpretación de las funcionalidades

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await obtenerNoticias();

      const data = respuesta.map((n) => {
        const titulo = n.titulo
          .split(" ")
          .map((str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
          })
          .join(" ");

        const ahora = new Date();
        const minutosTranscurridos = Math.floor(
          (ahora.getTime() - n.fecha.getTime()) / 60000
        );

        return {
          id: n.id,
          titulo,
          descripcion: n.descripcion,
          fecha: `Hace ${minutosTranscurridos} minutos`,
          esPremium: n.esPremium,
          imagen: n.imagen,
          descripcionCorta: n.descripcion.substring(0, 100),
        };
      });

      setNoticias(data);
    };

    obtenerInformacion();
  }, []);

  const handleVerMas = (noticia: INoticiasNormalizadas) => {
    setModal(noticia);
  };

  const handleCloseModal = () => {
    setModal(null);
  };

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((n) => (
          <TarjetaNoticiaComponent
            key={n.id}
            noticia={n}
            verMas={handleVerMas}
          />
        ))}
        {modal && <ModalComponent noticia={modal} onClose={handleCloseModal} />}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;
