import NoticeCategoryItem from '../NoticeCategoryItem/NoticeCategoryItem';
import PlusIcon from 'icons/PlusIcon';

import css from './notices-categories-list.module.css';

const NoticesCategoriesList = ({ data }) => {

  const noticesItem = data.map(({ id, ...props }) => (

    <NoticeCategoryItem key={id} {...props} />
  ));

  return (
    <>
      {document.documentElement.clientWidth < 768 && (
        <button
          className={css.addPetBtn}
          SVGComponent={() => (
            <PlusIcon className={css.addPetBtnIcon} color="#FFFFFF" />
          )}
        >
          Add Pet
        </button>
      )}
      <ul className={css.noticeList}>{noticesItem}</ul>
    </>
  );
};
export default NoticesCategoriesList;
