import { FC, HTMLProps, useEffect, useState } from "react";

interface Props extends HTMLProps<HTMLDivElement> {
  onWillOnmount: (id: string) => void;
  id: string;
}

const getRandomNumber = () => Math.floor(Math.random() * (30 - 10 - 1) + 10);

const CustomElement: FC<Props> = ({ onWillOnmount, id, ...restProps }) => {
  const [timeToDelete, setTimeToDelete] = useState(() => getRandomNumber());

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimeToDelete((prevValue) => prevValue - 1);
    }, 1000);

    if (timeToDelete <= 0) {
      onWillOnmount(id);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [timeToDelete]);

  return <div {...restProps}>Исчезнет через {timeToDelete}</div>;
};

export default CustomElement;
