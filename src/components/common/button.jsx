import classNames from 'classnames';

const Button = ({
  children,
  size,
  rightIcon,
  leftIcon,
  variant,
  type,
  onClick,
  colorScheme,
}) => {
  // Generic
  const defaultStyles = 'flex items-center justify-center gap-2 rounded-lg p-1';

  // Size
  const small = 'text-[.5rem]';
  const medium = 'text-[1rem] py-2 px-3';
  const large = 'text-[1.5rem]';

  //   ColorScheme
  const primary = `${
    variant === 'fill'
      ? 'bg-primary-100 text-white'
      : 'border border-primary-100 text-primary-100 hover:bg-primary-100 hover:text-white'
  }`;
  const secondary = '';
  const danger = '';
  const success = '';
  const dark = `${
    variant === 'fill'
      ? 'bg-black text-white'
      : 'border border-black text-black hover:bg-black hover:text-white'
  }`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(defaultStyles, {
        [small]: size === 'sm',
        [medium]: size === 'md',
        [large]: size === 'lg',

        [primary]: colorScheme === 'primary',
        [secondary]: colorScheme === 'secondary',
        [danger]: colorScheme === 'danger',
        [success]: colorScheme === 'success',
        [dark]: colorScheme === 'dark',
      })}
    >
      <span>{leftIcon}</span>
      {children}
      <span>{rightIcon}</span>
    </button>
  );
};

export default Button;
