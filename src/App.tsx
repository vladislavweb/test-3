import { FC, useEffect, useState } from "react";
import { v4 } from "uuid";
import { checkBrackets } from "./checkBrackets";
import "./App.css";

["(()){[]}", "({[[]{}]})", "([{}]{}(){[]})", "({}{[]}{(]}[])"].forEach((str) =>
  console.log(str, checkBrackets(str)),
);

interface Element {
  id: string;
  timeToDelete: number;
}

const getRandomNumber = () => Math.floor(Math.random() * (30 - 10 - 1) + 10);

const App: FC = () => {
  const [elements, setElements] = useState<Element[]>([]);

  const addElement = () => {
    setElements((prevValue) => [...prevValue, { id: v4(), timeToDelete: getRandomNumber() }]);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const updatedElements: Element[] = [];

      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        if (element.timeToDelete - 1 > 0) {
          updatedElements.push({
            ...element,
            timeToDelete: element.timeToDelete - 1,
          });
        }
      }

      setElements(updatedElements);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [elements]);

  return (
    <div className="app">
      <div className="app__button">
        <button type="button" onClick={addElement}>
          Добавить элемент
        </button>
      </div>

      <div className="app__list">
        {elements.map((element) => (
          <div className="app__element" key={element.id}>
            Исчезнет через {element.timeToDelete}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
