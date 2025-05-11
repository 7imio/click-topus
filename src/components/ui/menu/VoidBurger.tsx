import { FC } from 'react';
import '../../../styles/VoidBurger.css';

export interface VoidBurgerProps {
  isOpen: boolean;
}

const VoidBurger: FC<VoidBurgerProps> = ({ isOpen }) => {
  return (
    <div className="burger-container">
      <>
        <div className={`bar bar-upper ${isOpen && 'bar-transform'}`}></div>
        <div className={`bar bar-middle ${isOpen && 'bar-transform'}`}></div>
        <div className={`bar bar-lower ${isOpen && 'bar-transform'}`}></div>
      </>

      <div className="void-container spin">
        <div className={`void-body ${isOpen && 'active'}`}></div>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`void-wave ${isOpen && 'active'}`}
            style={{
              transform: isOpen
                ? `rotate(${i * 45}deg) translate(15px) scale(1,1)`
                : 'rotate(0) scale(0)',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};
export default VoidBurger;
