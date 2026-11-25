import { generateProblem } from './problems.js';
import { parseAnswer } from './parse.js';

const state = {
  grade: 'mixed',
  problem: null,
  solved: false,
  revealed: false,
};

const gradePicker = document.getElementById('grade-picker');
const promptEl = document.getElementById('prompt');
const form = document.getElementById('answer-form');
const inputEl = document.getElementById('answer');
const feedbackEl = document.getElementById('feedback');
const stepsEl = document.getElementById('steps');
const nextBtn = document.getElementById('next');
const showBtn = document.getElementById('show');

gradePicker.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-grade]');
  if (!btn) return;
  state.grade = btn.dataset.grade === 'mixed' ? 'mixed' : Number(btn.dataset.grade);
  [...gradePicker.children].forEach((b) => b.classList.toggle('active', b === btn));
  newProblem();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!state.solved) submitAnswer();
});

showBtn.addEventListener('click', () => {
  if (state.solved) return;
  state.solved = true;
  state.revealed = true;
  render();
});

nextBtn.addEventListener('click', newProblem);

function newProblem() {
  state.problem = generateProblem(state.grade);
  state.solved = false;
  state.revealed = false;
  inputEl.value = '';
  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';
  render();
}

function submitAnswer() {
  const parsed = parseAnswer(inputEl.value);
  if (!parsed) {
    setFeedback('Type a number (12), fraction (3/4), or decimal (0.75).', 'warn');
    return;
  }
  if (parsed.equals(state.problem.answer)) {
    state.solved = true;
    state.revealed = false;
    render();
  } else {
    setFeedback('Not quite — try again, or show the solution.', 'wrong');
    inputEl.select();
  }
}

function setFeedback(msg, cls = '') {
  feedbackEl.textContent = msg;
  feedbackEl.className = 'feedback ' + cls;
}

function render() {
  const p = state.problem;
  promptEl.textContent = p.prompt;
  promptEl.classList.toggle('words', p.prompt.length > 20);
  inputEl.placeholder = p.hint || 'Your answer';
  inputEl.setAttribute('inputmode', p.answer.d === 1 ? 'numeric' : 'text');

  form.hidden = state.solved;
  showBtn.hidden = state.solved;
  nextBtn.hidden = !state.solved;

  if (state.solved) {
    setFeedback(state.revealed ? `Answer: ${p.answer}` : 'Correct!', state.revealed ? 'revealed' : 'correct');
    stepsEl.innerHTML = '';
    p.steps.forEach((s) => {
      const li = document.createElement('li');
      li.textContent = s;
      stepsEl.appendChild(li);
    });
    stepsEl.hidden = false;
    nextBtn.focus();
  } else {
    stepsEl.hidden = true;
    stepsEl.innerHTML = '';
    inputEl.focus();
  }
}

newProblem();
