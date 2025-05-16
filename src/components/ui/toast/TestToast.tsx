import { FC } from 'react';
import useToast from '../../../hooks/toast/useToast';

const TestToast: FC = () => {
    const showToast = useToast();

    const handleClick = () => {
        showToast({
            // type string only
            message: 'je suis spécial !',

            // type: type de toast ('info', 'success', 'warning', 'error', 'default')
            type: 'success',

            // position: position du toast
            // 'top-left', 'top-right', 'top-center', 
            // 'bottom-left', 'bottom-right', 'bottom-center', 
            position: 'top-center',

            // autoClose: durée avant fermeture auto (en ms) ou false pour désactiver
            // hideProgressBar: masque ou affiche la barre de progression
            // closeOnClick: ferme le toast au clic
            // pauseOnFocusLoss: pause le timer quand la fenêtre perd le focus
            // pauseOnHover: pause le timer au survol de la souris
            // draggable: active le déplacement du toast à la souris
            // draggablePercent: % de déplacement requis pour drag le toast (ex: 80)
            // newestOnTop: affiche les nouveaux toasts au-dessus
            // theme: thème du toast ('light', 'dark', 'colored')
            // className: classe CSS personnalisée pour le toast (! avec les classes tailwind si la propriété n'est pas prise en compte)
            // bodyClassName: classe CSS personnalisée pour le contenu du toast
            // progressClassName: classe CSS personnalisée pour la barre de progression
            // closeButton: composant React personnalisé pour le bouton de fermeture
            // onClose: callback appelé à la fermeture du toast
            // onOpen: callback appelé à l'ouverture du toast
            // toastId: identifiant unique du toast (évite les doublons)
            // role: attribut ARIA (accessibilité), ex: 'alert'
            // transition: animation du toast (Slide, Bounce, Flip, Zoom)
            // delay: délai avant l’apparition du toast (en ms)
            // icon: icône personnalisée ou false pour la cacher
            // rtl: active le mode "right-to-left" (utile pour langues arabes/hébreu)
            // containerId: permet de cibler un ToastContainer spécifique
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