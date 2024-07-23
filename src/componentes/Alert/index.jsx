import { useEffect } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';

export default function Alert({ dados }) {
    const { success, error, message } = dados;

    useEffect(() => {
        if (error) {
            toast.error(message);
        } else if (success) {
            toast.success(message);
        }
    }, [error, success, message]);

    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="colored"
            transition={Bounce}
        />
    );
}
