import React from 'react';
import CollapseIcon from '../assets/icons/navbar collapser.png'

interface toolbarProps {
    onButtonClick: () => void;
}

const Toolbar: React.FC<toolbarProps> = ({ onButtonClick }) => {
  return (
    <>
        <div data-testid="Toolbar" className="absolute bg-sapp-green rounded-xl inline-block overflow-auto float-left">
            <img data-testid="Collapser" className="w-1/12" src={CollapseIcon} onClick={onButtonClick}/>
        </div>
    </>
  );
};

export default Toolbar;