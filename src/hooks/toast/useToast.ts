import { useAppDispatch } from '../../store/hooks';
import { showToast, ToastState } from '../../store/slices/toast/toastSlice';

const useToast = () => {
    const dispatch = useAppDispatch();

    return (toastData: ToastState) => {
        dispatch(showToast(toastData));
    };
};

export default useToast;