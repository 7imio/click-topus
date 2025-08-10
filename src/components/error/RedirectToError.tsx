import { FC, useEffect } from 'react';
import { ErrorState } from '../../interfaces/error/ErrorState';
import { useNavigate } from 'react-router-dom';

const RedirectToError: FC<ErrorState> = ({
    errorStatus,
    errorMessage
}) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/error', {
            replace: true,
            state: { errorStatus, errorMessage }
        });
    }, [errorStatus, errorMessage]);

    return (<>
        <h1 className='text-5xl text-red-500 p-4'>{errorStatus}</h1>
        <p className='text-xl text-neutral-200'>{errorMessage}</p>
    </>
    );
};

export default RedirectToError;