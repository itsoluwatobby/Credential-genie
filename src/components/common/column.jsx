import classNames from 'classnames';

const Column = ({ col, items, justify, gap, children }) => {
  const column = `grid-cols-1 md:grid-cols-${col} items-${items} justify-${justify}`;

  return (
    <section
      className={classNames('grid', {
        [column]: true,
        'gap-5': gap === 5,
        'gap-10': gap === 10,
      })}
    >
      {children}
    </section>
  );
};

export default Column;
