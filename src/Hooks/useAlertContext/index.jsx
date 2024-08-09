import { useContext } from "react";
import { AlertContext } from "../../Context/AlertProvider";

export default function useAlertContext() {
    const { dadosAlerta, setDadosAlerta } = useContext(AlertContext);

    function setAlertaSuccess(msg) {
        setDadosAlerta({ success: true, error: false, message: msg })
        setTimeout(() => {
            setDadosAlerta({ success: false, error: false, message: "" });
        }, 5000);
    }
    function setAlertaError(msg) {
        setDadosAlerta({ success: false, error: true, message: msg })
        setTimeout(() => {
            setDadosAlerta({ success: false, error: false, message: "" });
        }, 5000);
    }

    return {
        setAlertaError,
        setAlertaSuccess,
        dadosAlerta
    }
}