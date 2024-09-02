import styled from "styled-components";
import "./Spinner.css";

const DivEstilizadaParaSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`

function Loader({ $login=false }) {
  return (
    <DivEstilizadaParaSpinner>
      <div className={$login ? "dot-spinner-2" : "dot-spinner"}>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
      </div>
    </DivEstilizadaParaSpinner>
  )
}


export default Loader;