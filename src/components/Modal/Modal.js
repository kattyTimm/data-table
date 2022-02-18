import React from 'react';
import s from './modal.module.css';


const Modal = props => {  

    return ( 
          <React.Fragment>
           <div className={s.modal} >   
              <div className={s.modalBody}>
                <h2>Уведомление</h2>      
                <p>Сотрудников с такими датами рождения не найдено, выбирете другие даты </p>  
                <button className={s.closeModal} onClick={() => props.close()}>Закрыть</button>
              </div>    
            </div>
          </React.Fragment> 
    ); 
}

export default Modal;
