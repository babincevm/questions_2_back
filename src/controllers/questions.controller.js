const {Questions: questions} = require('../models/')
const fs = require("fs");

module.exports = {
    async getAll(req, res) {
        await res.status(200).json({
            body: questions.shuffle().map(({id, question, multiple_answer = false, answers, pre = null}) => {
                // let shuffled_answers = answers?.shuffle();
                return {
                    id,
                    question,
                    multiple_answer,
                    answers,
                    pre
                }
            })
        });
    },

    async checkAnswers({body}, res) {
        let correct_amount = 0,
            current_question,
            correct_answers,
            body_answer,
            is_correct,
            is_array_equals = (a, b) => a.reduce((acc, val) => acc && b.includes(val.toString()), true); // сравнение массивов


        let answers = await Object.keys(body).reduce((acc, question_id, index) => {
            question_id = Number(question_id);
            current_question = questions.find(q => q.id === question_id);
            body_answer = body[question_id];
            if (current_question.answers) {
                is_correct = is_array_equals(current_question.correct_answer, body_answer);

                correct_answers = current_question.correct_answer.reduce((acc, val) => {
                    return acc + current_question.answers[val.toString()] + `\n`;
                }, '');
            } else {
                is_correct = current_question.correct_answer === body_answer[0].toString();
                correct_answers = current_question.correct_answer
            }

            is_correct && correct_amount++;

            return acc += `вопрос № ${index + 1}:
${current_question.pre ? current_question.question + '\n' + current_question.pre : current_question.question}
Отвечено ${is_correct ? 'верно' : 'не верно'}
Верный ответ: ${correct_answers + '\n'}
\n\n`}, ``);

        let statistic = `Всего вопросов ${questions.length}
Вы ответили на ${Object.keys(body).length} вопросов, из них правильно ${correct_amount}
Вы ответили верно на ${correct_amount / questions.length * 100}%
`
        fs.writeFile("./files/answers.txt", answers + `\n\n\n\n` + statistic, e => {
            if (e) {
                console.log(e);
                return res.sendStatus(500);
            }
            res.status(200).send('answers.txt');
        });
    }
}