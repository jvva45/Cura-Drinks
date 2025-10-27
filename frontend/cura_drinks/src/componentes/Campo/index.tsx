// Em /components/Field/index.tsx

import React from 'react';
import styles from './Campo.module.css';

// 1. Estenda a interface para incluir todas as props de um input HTML.
//    React.InputHTMLAttributes<HTMLInputElement> contém todas as props
//    padrão como onKeyDown, placeholder, autoFocus, disabled, etc.
interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
   label?: string; 
    // As props 'value' e 'onChange' já estão incluídas no tipo estendido,
    // mas podemos mantê-las aqui para clareza, se quisermos.
}

// 2. Na assinatura da função, separe as props conhecidas das restantes.
export default function Field({ label, type = 'text', ...rest }: FieldProps) {
    return (
        <div className={styles.fieldContainer}>
            <label>{label}</label>
            <input
                type={type}
                // 3. Espalhe todas as props restantes diretamente no input.
                //    Isso aplicará value, onChange, onKeyDown, autoFocus, etc.
                {...rest}
                // Você pode adicionar uma classe padrão e permitir que ela seja sobrescrita
                className={`${styles.inputDefault} ${rest.className || ''}`}
            />
        </div>
    );
}
