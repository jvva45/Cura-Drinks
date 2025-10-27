import styles from '@/componentes/Botao/Botao.module.css'

interface ButtonProps {
  children: React.ReactNode;
  isSmall?: boolean;
  className?: string; // permite passar classes customizadas
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ children, isSmall = false, className = '', onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${isSmall ? styles['button-small'] : ''} ${className}`}
    >
      {children}
    </button>
  )
}
