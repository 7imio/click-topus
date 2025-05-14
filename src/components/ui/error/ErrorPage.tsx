import { FC } from 'react';
import { Link } from 'react-router-dom';
import useErrorState from '../../../hooks/error/useErrorState';

const ErrorPage: FC = () => {
    const { errorStatus, errorMessage } = useErrorState();

    return(
        <main className='flex flex-col h-full min-h-screen'>
            {/* Error Section */}
            <section className='flex flex-col items-center justify-center flex-grow p-6 text-center'>
                <div>
                    <h1 className='text-shadow text-4xl font-bold text-red-400 uppercase font-kony' role='text'>Erreur {errorStatus}</h1>
                    <p className='text-shadow mt-4 text-xl text-neutral-200 font-roboto'>{errorMessage}</p>
                </div>
                <div className='mt-4'>
                    <Link to='/' role='button' aria-label="Bouton de retour a l'acceuil">
                        <div className='flex justify-end px-8 md:justify-start md:px-0'>
                            <p className='bg-neutral-500 px-3 py-2 text-white uppercase w-fit md:text-2xl font-kony rounded-xl bg-mediumseagreen'>
                                Retour à l'accueil
                            </p>
                        </div>
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default ErrorPage;