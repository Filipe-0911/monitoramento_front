import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useEffect, useState } from 'react';
import PlanejadorService from "../../services/PlanejadorService";

const localizer = momentLocalizer(moment);

const Calendario = ({ closeModal, openModal, setFormEventos, setListaDePlanejadores, listaDePlanejadores }) => {
  const planejadorService = new PlanejadorService();
  const [windowSize, setWindowSize] = useState(1800);
  const tamanhoDoCalendario = windowSize - 700;

  const handleSelectSlot = ({ start, end, title }) => {
    setFormEventos(prevFormEventos => ({
      ...prevFormEventos,
      start: start,  
      end: end,      
    }));
  
    openModal();
  
    if (title) {
      setListaDePlanejadores(prevState => [
        ...prevState,
        {
          id: 0,
          start: start,  
          end: end,      
          title,
        },
      ]);
    }
  };
  

  const handleSelectEvent = (event) => {
    setFormEventos(event);
    openModal();
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (windowSize.innerWidth < 1200) {
        setWindowSize(1200);
      } else {
        setWindowSize(window.innerWidth);
      }
    });

    return () => {
      window.removeEventListener('resize', () => { });
    };
  }, [window.innerWidth])

  useEffect(() => {
    try {
      planejadorService.buscarTodosOsPlanejadores().then((r) => {
        if (r.length > 0) {
          let listaPlanejadores = r.map(planejador => {
            return {
              id:planejador.id,
              idMateria: planejador.idMateria,
              idProva: planejador.idProva,
              start: new Date(planejador.dataInicio),
              end: new Date(planejador.dataTermino),
              title: planejador.nomeAssunto,
            };
          });

          setListaDePlanejadores(listaPlanejadores);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div style={{position:'relative', zIndex:0}}>
      <Calendar
        localizer={localizer}
        events={listaDePlanejadores}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, width: (window.innerWidth > 1200 ? tamanhoDoCalendario : window.innerWidth), zIndex: -1 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
};

export default Calendario;
