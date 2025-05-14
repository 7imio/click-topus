import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ErrorState } from '../../interfaces/error/ErrorState';

const useErrorState = () => {
    const location = useLocation();
    const [ errorStatus, setErrorStatus ] = useState<number>(404);
    const [ errorMessage, setErrorMessage ] = useState<string>(
        'Page non trouvée. Veuillez vérifier l\'URL.'
    );

    useEffect(() => {
        const state = location.state as ErrorState | undefined;
        if (state?.errorStatus && state?.errorMessage) {
            setErrorStatus(state.errorStatus);
            setErrorMessage(state.errorMessage);
        }
    }, [location]);

    return { errorStatus, errorMessage };
};

export default useErrorState;