
import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useLocation } from "react-router-dom";

interface TransitionLayoutProps {
  children: React.ReactNode;
}

const TransitionLayout: React.FC<TransitionLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <TransitionGroup className="w-full min-h-screen">
      <CSSTransition
        key={location.key}
        timeout={400}
        classNames="page-transition"
        unmountOnExit
      >
        <div className="page-transition w-full min-h-screen">
          {children}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default TransitionLayout;
