import { FC, useEffect } from 'react';
import { ErrorState } from '../../interfaces/error/ErrorState';
import { useNavigate } from 'react-router-dom';

const RedirectToError: FC<ErrorState> = ({
    errorStatus,
    errorMessage
}) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('*', {
            replace: true,
            state: { errorStatus, errorMessage }
        });
    }, [navigate, errorStatus, errorMessage]);

    return null;
};

export default RedirectToError;