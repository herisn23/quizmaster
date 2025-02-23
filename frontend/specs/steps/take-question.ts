import { type DataTable } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

import { expectTextToBe, expectTextToContain } from './common.ts'
import { Then, When } from './fixture.ts'
import type { QuizmasterWorld } from './world/world.ts'

When('I take question {string}', async function (this: QuizmasterWorld, bookmark: string) {
    await this.page.goto(this.bookmarks[bookmark].url)
    this.activeBookmark = bookmark
})

Then('I see the question and the answers', async function (this: QuizmasterWorld) {
    await expectTextToBe(this.takeQuestionPage.questionLocator(), this.activeQuestion.question)
    const answers = this.activeQuestion.answers
    const answerLocators = this.takeQuestionPage.answersLocator()

    expect(await answerLocators.count()).toBe(answers.length)

    for (const [index, { answer }] of answers.entries()) {
        const answerLocator = answerLocators.nth(index)
        await expectTextToBe(answerLocator, answer)
    }
})

When('I answer {string}', async function (this: QuizmasterWorld, answerList: string) {
    const answers = answerList.split(',').map(answer => answer.trim())
    for (const answer of answers) {
        await this.takeQuestionPage.selectAnswer(answer)
    }
    await this.takeQuestionPage.submit()
})

Then('I see feedback {string}', async function (this: QuizmasterWorld, feedback) {
    await expectTextToBe(this.takeQuestionPage.feedbackLocator(), `The answer is:\u00A0${feedback}`)
})

Then('I see the answer explanation {string}', async function (this: QuizmasterWorld, answerExplanation) {
    await expectTextToBe(this.takeQuestionPage.answerExplanationLocator(), answerExplanation)
})

Then('I see the question explanation', async function (this: QuizmasterWorld) {
    await expectTextToBe(this.takeQuestionPage.questionExplanationLocator(), this.activeQuestion.explanation)
})

Then(/^I see the answer explanations for answers$/, async function (this: QuizmasterWorld, data: DataTable) {
    for (const row of data.rows()) {
        const [answer, expectedExplanation] = row
        const answerExplanationLocator = this.takeQuestionPage.answerExplanationLocatorForAnswer(answer)

        await expectTextToBe(answerExplanationLocator, expectedExplanation)
    }
})

Then('I see the {string} question for the quiz', async function (this: QuizmasterWorld, questionName: string) {
    await expectTextToContain(this.takeQuestionPage.questionLocator(), questionName)
})
