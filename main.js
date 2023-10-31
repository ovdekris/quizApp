const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];
//Search elements
const headerContainer=document.querySelector('#header');
const listContainer=document.querySelector('#list');
let submitButton = document.querySelector('#submit');



//Game variebls
let score=0;
let questionIndex=0;

clearPage();
showQuestions();
submitButton.addEventListener('click',checkAnswer);

 //Clear
function clearPage(){
	headerContainer.innerHTML="";
	listContainer.innerHTML="";
}
function showQuestions(){
	console.log('showQuestions');
	//Question

	const headerTemplate =`<h2 class="title">%title%</h2>`;
const title=headerTemplate.replace('%title%',questions[questionIndex]['question']);
	headerContainer.innerHTML=title;

	//Options answers
	let answerNumber=1;
	for(item of questions[questionIndex]['answers']){
		let questionTamplete=
				`<li>
    <label>
	    <input type="radio" value="%number%" class="answer" name="answer" />
	    <span>%answer%</span>
	</label>
	</li>`
		const answers=questionTamplete
			.replace('%answer%',item)
			.replace('%number%',answerNumber);
		listContainer.innerHTML+=answers;
		answerNumber++;
	}

}
function checkAnswer(){
const checkRadio = listContainer.querySelector('input[type="radio"]:checked');
//If user doesnt take an answers we are finished a function

if (!checkRadio){
		submitButton.blur();
		return
	}
	const userAnswer=parseInt(checkRadio.value);
	if (userAnswer===questions[questionIndex]['correct']){
		score++;
	}
	if(questionIndex!==questions.length-1){
		console.log("it's a not the last questions");
		questionIndex++;
		clearPage();
		showQuestions();
		return;
	}else{
		console.log("It's a last questions");
		clearPage();
		showResults();
	}

}
function showResults(){
	console.log('showResults started');
	console.log(score);
	const resultsTemplate=`
      <h2 class="title">%title%</h2>
      <h3 class="summary">%message%</h3>
      <p class="result">%result%</p>`;
	let title,message;
	if (score===questions.length){
		title='Gratulation!🔥';
		message='You answered all the questions corectly😀';
	}else if(score*100/questions.length>=50){
		title='A good result';
		message='You answered for more than half of the questions';
	}else{
		title='A good result';
		message='You answered for more than half of the questions';
	}
	let result=`${score} of ${questions.length}`;
	const finalMessage=resultsTemplate
		.replace('%title%',title)
		.replace('%message%',message)
		.replace('%result%',result);
	headerContainer.innerHTML=finalMessage;
	submitButton.blur();
	submitButton.innerText='Start over';
	submitButton.onclick=()=>{
		history.go();
	}
}