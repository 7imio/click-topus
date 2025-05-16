import { FC } from 'react';
import useToast from '../../../hooks/toast/useToast';

const TestToast: FC = () => {
    const showToast = useToast();

    const handleClick = () => {
        showToast({
            message: 'je suis spécial !',
            type: 'success',
            position: 'top-left',
            options: {
                autoClose: 4000,
                className: 'text-white font-semibold text-md p-3',
                progressClassName: '!bg-green-500',
            },
        });
    };

    return(
        <button onClick={handleClick} className="btn-primary">
            💡 Toast Test
        </button>
    );
};

export default TestToast;