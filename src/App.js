import { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import { generateRandomGrid, markGrid } from './utils';

const Square = styled.div`
  background-color: ${props => props.backgroundColor};
  color: #fff;
  font-size: ${props => props.size <= 20 ? '100%' : '50%'};
  transition: .4s;

  :hover {
    cursor: ${props => props.isEmpty ? 'default' : 'pointer'}
  }
`;

const initialGridSize = 5;
const emptyColor = '#eee';
const initialHoverColor = '#ff6670';
const initialBackgroundColor = '#ffd000';
const initialHoverData = {
  rowIndex: null,
  colIndex: null,
  count: null,
  grid: null
};

function App() {
  const [gridSize, setGripSize] = useState(initialGridSize);
  const [hoverColor, setHoverColor] = useState(initialHoverColor);
  const [backgroundColor, setBackgroundColor] = useState(initialBackgroundColor);
  const [grid, setGrid] = useState([]);
  const [hoverData, setHoverData] = useState(initialHoverData);
  const [clickData, setClickData] = useState(initialHoverData);

  useEffect(() => {
    if (gridSize > 0) {
      setGrid(generateRandomGrid(gridSize, gridSize));
      setHoverData(initialHoverData);
      setClickData(initialHoverData);
    }
  }, [gridSize]);

  const onGridSizeChange = e => {
    if (!e.target.value || e.target.value === gridSize) return;
    setGripSize(e.target.value);
  };

  const onHoverColorChange = e => {
    if (!e.target.value || e.target.value === hoverColor) return;
    setHoverColor(e.target.value);
  };

  const onBackgroundColorChange = e => {
    if (!e.target.value || e.target.value === backgroundColor) return;
    setBackgroundColor(e.target.value);
  };

  const onSquareClick = (rowIndex, colIndex) => {
    setClickData({
      ...hoverData,
      rowIndex,
      colIndex
    })
  };

  const onMouseEnter = (rowIndex, colIndex) => {
    if (hoverData.grid && hoverData.grid[rowIndex][colIndex] === -1) return;
    const result = markGrid(grid, rowIndex, colIndex);
    setHoverData(result);
  };

  const onMouseLeave = (rowIndex, colIndex) => {
    if (hoverData.grid && hoverData.grid[rowIndex][colIndex] !== -1) {
      setHoverData(initialHoverData);
    }
  };

  const renderGrid = grid => {
    if (!grid || !grid[0]) return null;
    return (
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((col, colIndex) => (
              <Square
                key={colIndex}
                className="col"
                size={grid.length}
                backgroundColor={grid[rowIndex][colIndex] === 0 ? emptyColor : grid[rowIndex][colIndex] === -1 ? hoverColor : backgroundColor}
                isEmpty={grid[rowIndex][colIndex] === 0}
                onClick={() => grid[rowIndex][colIndex] !== 0 && onSquareClick(rowIndex, colIndex)}
                onMouseEnter={() => grid[rowIndex][colIndex] !== 0 && onMouseEnter(rowIndex, colIndex)}
                onMouseLeave={() => grid[rowIndex][colIndex] !== 0 && onMouseLeave(rowIndex, colIndex)}
              >
                {clickData.rowIndex === rowIndex && clickData.colIndex === colIndex
                  ? clickData.count : null
                }
              </Square>
            ))}
          </div>
        ))}
      </div>
    )
  };

  return (
    <div className="wrap">
      <div className="container">
        <header className="header">
          <h1>Grid App</h1>
        </header>
        <main className="main">
          <div className="sidenav">
            <div className="control-panel">
              <div className="control-item">
                <input type="range" id="grid-size" name="grid-size" min={1} max={50} value={gridSize} onChange={onGridSizeChange} />
                <label htmlFor="grid-size">Grid Size (<b>{gridSize} X {gridSize}</b>)</label>
              </div>
              <div className="control-item">
                <input type="color" id="hover-color" name="hover-color" value={hoverColor} onChange={onHoverColorChange} />
                <label htmlFor="hover-color">Hover Color (<b>{hoverColor}</b>)</label>
              </div>
              <div className="control-item">
                <input type="color" id="background-color" name="background-color" value={backgroundColor} onChange={onBackgroundColorChange} />
                <label htmlFor="background-color">Background Color (<b>{backgroundColor}</b>)</label>
              </div>
            </div>
          </div>

          {renderGrid(hoverData.grid ? hoverData.grid : grid)}
        </main>
      </div>
    </div>
  );
}

export default App;
