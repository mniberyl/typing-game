import './styles/index.scss';
import axios from 'axios';

function GamePlay() {
  let wordEl;
  let inputEl;
  let timeEl;
  let scoreEl;
  let toggleEl;

  let words = [];
  let score = words.length;
  let time = 0;
  let timer = -1;
  let isPlaying = false;

  function setScore(value) {
    score = value;
    scoreEl.innerText = value;
  }

  function setTime(value) {
    time = value;
    timeEl.innerText = value;
  }

  function setWord(value) {
    wordEl.innerText = value;
  }

  function setPlaying(value) {
    isPlaying = value;
    toggleEl.innerText = value ? '초기화' : '시작';
  }

  async function fetchWords() {
    const response = await axios.get('https://my-json-server.typicode.com/kakaopay-fe/resources/words');
    words = response.data;
  }

  function resetGame() {
    setPlaying(false);
    clearInterval(timer);
    setWord('');
    setTime(0);
    setScore(0);
  }

  // @todo 모든 게임이 완료되면 완료 화면으로 이동
  function endGame() {
    // 점수랑 평균 답변 시간을 가져오고
    resetGame();
    // 페이지 이동하고
  }

  let clonedWords;

  function displayGame() {
    setScore(clonedWords.length + 1);

    function callback() {
      if ((time - 1) > 0) {
        setTime(time - 1);
      } else {
        if (clonedWords.length === 0) {
          return endGame();
        }
        const [{ text, second }] = clonedWords.splice(Math.floor(Math.random() * clonedWords.length), 1);
        setWord(text);
        setTime(second);
        setScore(score - 1);
      }
      return clonedWords;
    }

    callback();
    timer = setInterval(callback, 1000);
  }

  function startGame() {
    clonedWords = [...words];
    setPlaying(true);
    inputEl.focus();
    displayGame();
  }

  function toggle() {
    if (isPlaying) {
      resetGame();
    } else {
      startGame();
    }
  }

  // @todo 평균 답변 시간 저장(second 대신 Timestamp 사용)
  function submit(e) {
    if (e.keyCode === 13) {
      if (inputEl.value.toLowerCase() !== wordEl.innerText.toLowerCase()) {
        inputEl.value = '';
      } else {
        const [{ text, second }] = clonedWords.splice(Math.floor(Math.random() * clonedWords.length), 1);
        setWord(text);
        setTime(second);
      }
      inputEl.value = '';
    }
    return clonedWords;
  }

  function beforeMount() {
    fetchWords();
  }

  function mounted() {
    toggleEl.addEventListener('click', toggle);
    inputEl.addEventListener('keydown', submit);
  }

  function render() {
    beforeMount();

    // @todo 마운트 위치 수정
    document.getElementById('app').innerHTML = `
<div class="game container">
  <div class="game-container">
    <h1 class="game-heading heading1">Typing Game</h1>
    <div class="game-form">
      <div class="game-form__info">
        <div class="game-form__time">남은 시간 : <span class="game-form__time-number">0</span>초</div>
        <div class="game-form__score">점수 : <span class="game-form__score-number">0</span>점</div>
      </div>
      <div class="game-form__word"></div>
      <input type="text" class="game-form__input" placeholder=" 단어 입력" />
      <button class="button game-form__toggle">시작</button>
    </div>
  </div>
</div>
`;

    wordEl = document.querySelector('.game-form__word');
    inputEl = document.querySelector('.game-form__input');
    timeEl = document.querySelector('.game-form__time-number');
    scoreEl = document.querySelector('.game-form__score-number');
    toggleEl = document.querySelector('.game-form__toggle');

    mounted();
  }

  render();
}

GamePlay();
