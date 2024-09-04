import styled from 'styled-components';
import { Calendar as BigCalendar } from 'react-big-calendar';

const CustomCalendar = styled(BigCalendar)`
  .rbc-today {
    background-color: ${props => props.$modoDark ? "rgba(0,0,0,0.2)" : "#fafafa"}
  }
`;
import { momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import { useEffect, useState } from 'react';
import PlanejadorService from "../../services/PlanejadorService";
import useAlertContext from '../../Hooks/useAlertContext';
import useUserContext from '../../Hooks/useUserContext';

const allViews = Object.keys(Views).map((k) => Views[k]);
const localizer = momentLocalizer(moment);

const Calendario = ({ openModal, setFormEventos, setListaDePlanejadores, listaDePlanejadores }) => {
  const planejadorService = new PlanejadorService();
  const [windowSize, setWindowSize] = useState(1800);
  const tamanhoDoCalendario = windowSize - 300;
  const { setAlertaError, setAlertaSuccess } = useAlertContext();
  const { usuarioPrefereModoDark } = useUserContext();

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
      window.removeEventListener('resize', () => {});
    };
  }, [window.innerWidth]);

  useEffect(() => {
    try {
      planejadorService.buscarTodosOsPlanejadores().then((r) => {
        if (r.length > 0) {
          let listaPlanejadores = r.map(planejador => {
            return {
              id: planejador.id,
              idMateria: planejador.idMateria,
              idProva: planejador.idProva,
              start: new Date(planejador.dataInicio),
              end: new Date(planejador.dataTermino),
              title: planejador.nomeAssunto,
              color: planejador.cor,
            };
          });

          setListaDePlanejadores(listaPlanejadores);
          setAlertaSuccess("Planejamentos carregados com sucesso!");
        }
      });
    } catch (error) {
      setAlertaError(error.response.data);
    }
  }, []);

  const eventStyle = (e) => ({
    style: {
      backgroundColor: e.color,
      padding: "5px",
      color: "white"
    }
  });

  return (
    <div style={{ position: 'relative', zIndex: 0 }}>
      <CustomCalendar
        $modoDark={usuarioPrefereModoDark}
        localizer={localizer}
        events={listaDePlanejadores}
        startAccessor="start"
        endAccessor="end"
        defaultView='week'
        style={{ height: 700, width: (window.innerWidth > 1200 ? tamanhoDoCalendario : window.innerWidth), zIndex: -1 }}
        selectable
        resizable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyle}
        showMultiDayTimes
        views={allViews}
        components={{
          toolbar: CustomTollbar,
        }}
      />
    </div>
  );
};

const CustomTollbar = ({ label, onView, onNavigate }) => {
  const { usuarioPrefereModoDark } = useUserContext();
  const corDoTexto = usuarioPrefereModoDark ? "white" : "black";

  return (
    <div className='rbc-toolbar'>
      <span className='rbc-btn-group'>
        <button onClick={() => onNavigate('TODAY')} style={{color: corDoTexto}}>
          Hoje
        </button>
        <button onClick={() => onNavigate('PREV')} style={{color: corDoTexto}}>
          Voltar
        </button>
        <button onClick={() => onNavigate('NEXT')} style={{color: corDoTexto}}>
          Avançar
        </button>
      </span>
      <span className='rbc-toolbar-label'>{label}</span>
      <span className='rbc-btn-group' >
        <button onClick={() => onView(Views.MONTH)} style={{color: corDoTexto}}>Mês</button>
        <button onClick={() => onView(Views.WEEK)} style={{color: corDoTexto}}>Semana</button>
        <button onClick={() => onView(Views.WORK_WEEK)} style={{color: corDoTexto}}>Dias úteis</button>
        <button onClick={() => onView(Views.DAY)} style={{color: corDoTexto}}>Dia</button>
        <button onClick={() => onView(Views.AGENDA)} style={{color: corDoTexto}}>Agenda</button>
      </span>
    </div>
  );
};

export default Calendario;
