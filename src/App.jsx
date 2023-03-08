import { useEffect, useRef, useState } from 'react';
import Cell from './components/Cell';
import DifficultyLevelModal from './components/DifficultyLevelModal';
import WinModal from './components/WinModal';

function App() {
  const cellVariations = [
    {
      src: 'https://cdn-icons-png.flaticon.com/128/5308/5308417.png',
      isTurned: false
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/128/5308/5308395.png',
      isTurned: false
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/128/5308/5308405.png',
      isTurned: false
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/128/5308/5308449.png',
      isTurned: false
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/128/5308/5308426.png',
      isTurned: false
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/128/5308/5308469.png',
      isTurned: false
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/128/5308/5308494.png',
      isTurned: false
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/128/5308/5308459.png',
      isTurned: false
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/128/5308/5308508.png',
      isTurned: false
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/128/5308/5308522.png',
      isTurned: false
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/128/5308/5308612.png',
      isTurned: false
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/128/5308/5308554.png',
      isTurned: false
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/128/5308/5308587.png',
      isTurned: false
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/128/5308/5308601.png',
      isTurned: false
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/128/5308/5308622.png',
      isTurned: false
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/128/5308/5308641.png',
      isTurned: false
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/128/5308/5308658.png',
      isTurned: false
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/128/5308/5308675.png',
      isTurned: false
    }
  ];
  const fieldRef = useRef();
  const [cells, setCells] = useState([]);
  const [firstPick, setFirstPick] = useState(null);
  const [secondPick, setSecondPick] = useState(null);
  const [turnsCounter, setTurnsCounter] = useState(0);
  const [fieldIsActive, setFieldIsActive] = useState(true);
  const [isWin, setIsWin] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState(null);

  useEffect(() => {
    reshuffleCells();
  }, [difficultyLevel]);

  const reshuffleCells = () => {
    const difficultyLevelCellVariations = cellVariations.slice(
      Math.pow(difficultyLevel ?? 2, 2) / -2
    );
    fieldRef.current.style.gridTemplateColumns = `repeat(${
      difficultyLevel ?? 2
    },1fr)`;
    const c = [
      ...structuredClone(difficultyLevelCellVariations),
      ...structuredClone(difficultyLevelCellVariations)
    ];
    setCells(c.sort(() => Math.random() - 0.5));
  };

  const restartHandler = () => {
    setDifficultyLevel(null);
    setIsWin(false);
    setTurnsCounter(0);
    reshuffleCells();
  };

  const resetPicks = isMatch => {
    setTurnsCounter(prev => prev + 1);
    setCells(prev => {
      const n = [...prev];
      n[firstPick].isTurned = isMatch;
      n[secondPick].isTurned = isMatch;
      return n;
    });
    setFirstPick(null);
    setSecondPick(null);
    if (!cells.find(c => !c.isTurned)) {
      setIsWin(true);
    }
  };

  useEffect(() => {
    if (firstPick && secondPick) {
      fieldRef.current.style.pointerEvents = 'none';
      setTimeout(() => {
        resetPicks(
          cells[firstPick].src === cells[secondPick].src ? true : false
        );
        fieldRef.current.style.pointerEvents = 'all';
      }, 600);
    }
  }, [firstPick, secondPick]);

  const turnHandler = id => {
    if (cells[id].isTurned) {
      return;
    }
    firstPick ? setSecondPick(id) : setFirstPick(id);
    setCells(prev => {
      const n = [...prev];
      n[id].isTurned = true;
      return n;
    });
  };

  return (
    <>
      {isWin && <WinModal onClick={restartHandler} />}
      {difficultyLevel ? (
        ''
      ) : (
        <DifficultyLevelModal onChoose={level => setDifficultyLevel(level)} />
      )}
      <div className="mx-auto mt-14 w-[95vw] sm:w-[50vh]">
        <div className="mb-10 flex justify-around text-4xl sm:text-6xl">
          <img
            className="h-[1em]"
            src="https://cdn-icons-png.flaticon.com/128/5308/5308426.png"
          />
          <h1 className="text-orange-700">Match pairs</h1>
          <img
            className="h-[1em]"
            src="https://cdn-icons-png.flaticon.com/128/5308/5308459.png"
          />
        </div>
        <div className="mb-10 flex items-center justify-between rounded-lg  bg-orange-300 py-2 px-4 text-2xl text-orange-500">
          <h1>Turns: {turnsCounter}</h1>
          <button onClick={restartHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="h-[1em] w-[1em]"
              fill="currentColor"
            >
              <path d="M447.5 224H456c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L397.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L311 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H447.5z" />
            </svg>
          </button>
        </div>
        <div
          ref={fieldRef}
          className="grid h-[95vw] gap-2 rounded-lg bg-orange-300 p-2 sm:h-[50vh]"
        >
          {cells.map((c, idx) => (
            <Cell
              id={idx.toString()}
              src={c.src}
              isTurned={c.isTurned}
              onTurn={turnHandler}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
