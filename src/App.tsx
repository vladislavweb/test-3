import { FC, useCallback, useState } from "react";
import { v4 } from "uuid";
import CustomElement from "./CustomElement";
import { checkBrackets } from "./checkBrackets";
import "./App.css";

const brackets = ["(()){[]}", "({[[]{}]})", "([{}]{}(){[]})", "({}{[]}{(]}[])"];

brackets.forEach((str) => console.log(str, checkBrackets(str)));

const App: FC = () => {
  const [idsList, setIdsList] = useState<string[]>([]);

  const addElement = () => {
    setIdsList((prevValue) => [...prevValue, v4()]);
  };

  const removeId = useCallback(
    (id: string) => {
      const index = idsList.findIndex((el) => el === id);

      if (index >= 0) {
        setIdsList((prevValue) => [...prevValue.slice(0, index), ...prevValue.slice(index + 1)]);
      }
    },
    [idsList],
  );

  return (
    <div className="app">
      <div className="app__button">
        <button type="button" onClick={addElement}>
          Добавить элемент
        </button>
      </div>

      <div className="app__list">
        {idsList.map((id) => (
          <CustomElement className="app__element" key={id} id={id} onWillOnmount={removeId} />
        ))}
      </div>
    </div>
  );
};

export default App;
