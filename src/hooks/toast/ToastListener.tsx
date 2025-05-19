import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { toast, ToastContainer } from 'react-toastify';
import { clearToast } from '../../store/slices/toast/toastSlice';

const ToastListener = () => {
    const toastState = useAppSelector(state => state.toast);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!toastState?.message || toastState.message.trim() === '') return;

        toast(toastState.message, {
            type: toastState.type ?? 'default',
            position: toastState.position ?? 'top-right',
            ...toastState.options,
        });

        dispatch(clearToast());
    }, [toastState, dispatch]);

    const toastClassName = toastState.options?.toastClassName ?? '';

    return (
        <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastClassName={`${toastClassName} !important`}
        />
    );
};

export default ToastListener;