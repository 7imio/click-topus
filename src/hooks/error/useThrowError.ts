import { useNavigate } from 'react-router-dom';
import { ErrorState } from '../../interfaces/error/ErrorState';

const useThrowError = () => {
    const navigate = useNavigate();

    return ({ errorStatus, errorMessage }: ErrorState) => {
        navigate('*', {
            replace: true,
            state: { errorStatus, errorMessage }
        });
    };
};

export default useThrowError;