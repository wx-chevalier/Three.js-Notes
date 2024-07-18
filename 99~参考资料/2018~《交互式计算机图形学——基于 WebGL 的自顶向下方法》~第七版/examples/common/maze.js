// 生成一个 row x col 的迷宫

function initMazeBlocks(row, col) {
  // 用0b1111表示一个格子 -> 左下右上
  const ret = [];
  for(let i = 0; i < row; i++) {
    ret[i] = [];
    for(let j = 0; j < col; j++) {
      ret[i][j] = 0b1111;
    }
  }

  return ret;
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getNeighbors(pos, row, col) {
  const [x, y] = pos;

  const neighbors = [];
  if(x - 1 >= 0) neighbors.push([x - 1, y]);
  if(x + 1 < row) neighbors.push([x + 1, y]);
  if(y - 1 >= 0) neighbors.push([x, y - 1]);
  if(y + 1 < col) neighbors.push([x, y + 1]);

  return neighbors;
}

function connect(maze, n, picked) {
  const [x1, y1] = picked;
  const [x2, y2] = n;

  if(x1 === x2) { // 同一行
    if(y1 < y2) { // 新区域在右边
      maze[x1][y1] &= 0b1101;
      maze[x2][y2] &= 0b0111;
    } else { // 左边
      maze[x1][y1] &= 0b0111;
      maze[x2][y2] &= 0b1101;
    }
  } else if(y1 === y2) {
    if(x1 < x2) { // 下边
      maze[x1][y1] &= 0b1011;
      maze[x2][y2] &= 0b1110;
    } else { // 上边
      maze[x1][y1] &= 0b1110;
      maze[x2][y2] &= 0b1011;
    }
  }
}

export default function generateMaze(row, col) {
  const maze = initMazeBlocks(row, col);

  // console.log(maze);
  const connected = {'0,0': [0, 0]}; // 存储已经通的区域
  const shouldConnected = {
    '0,1': [0, 1],
    '1,0': [1, 0],
  }; // 相邻的即将联通的区域

  for(let i = 1; i < row * col; i++) {
    const picked = pickRandom(Object.values(shouldConnected));
    const neighbors = getNeighbors(picked, row, col);
    neighbors.forEach((neighbor) => {
      if(!connected[neighbor] && !shouldConnected[neighbor]) {
        shouldConnected[neighbor] = neighbor;
      }
    });
    const n = pickRandom(neighbors.filter(neighbor => !!connected[neighbor]));
    connect(maze, n, picked);
    delete shouldConnected[picked];
    connected[picked] = picked;
  }
  // console.log(maze);
  const entryIndex = Math.floor(Math.random() * row);
  const exitIndex = Math.floor(Math.random() * row);
  maze[entryIndex][0] &= 0b0111;
  maze[exitIndex][col - 1] &= 0b1101;
  return maze;
}
