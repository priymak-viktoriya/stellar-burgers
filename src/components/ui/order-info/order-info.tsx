import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';

import type { OrderInfoUIProps } from './type';
import styles from './order-info.module.css';

export const OrderInfoUI = ({ orderInfo }: OrderInfoUIProps): React.JSX.Element => {
  // Определяем текст статуса
  let statusText = 'Создан';
  if (orderInfo.status === 'done') statusText = 'Выполнен';
  if (orderInfo.status === 'pending') statusText = 'Готовится';

  return (
    <div className={styles.wrap}>
      {/* Убрали класс, теперь номер будет слева, как на макете */}
      <p className="text text_type_digits-default mb-10">
        #{String(orderInfo.number).padStart(6, '0')}
      </p>

      <h3 className="text text_type_main-medium mb-3">{orderInfo.name}</h3>
      
      <p className={`text text_type_main-default mb-15 ${orderInfo.status === 'done' ? 'text_color_success' : ''}`}>
        {statusText}
      </p>

      <h3 className="text text_type_main-medium mb-6">Состав:</h3>
      
      <ul className={styles.list}>
        {Object.values(orderInfo.ingredientsInfo).map((item: any, index: number) => (
          <li className={styles.item} key={index}>
            <div className={styles.img_wrap}>
              <div className={styles.border}>
                <img src={item.image_mobile} alt={item.name} className={styles.img} />
              </div>
            </div>
            <p className="text text_type_main-default ml-4 mr-4">{item.name}</p>
            <div className={styles.quantity}>
              <span className="text text_type_digits-default mr-2">
                {item.count} x {item.price}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.bottom}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={orderInfo.date} />
        </p>
        <div className={styles.total}>
          <span className="text text_type_digits-default mr-2">{orderInfo.total}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};