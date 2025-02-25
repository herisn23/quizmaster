Feature: Take a quiz

   Background:
    Given a question "What is the standard colour of sky?"
    * with answers:
      | Red       |   |
      | Blue      | * |
      | Green     |   |
      | Black     |   |
    * saved and bookmarked as "Sky"
    Given a question "What is capital of France?"
    * with answers:
      | Marseille |   |
      | Lyon      |   |
      | Paris     | * |
      | Toulouse  |   |
    * saved and bookmarked as "France"
    # Given a quiz containing questions "Sky" and "France"

  Scenario: Quiz page is available
    Given I visit the quiz page
    Then I should see heading "Quiz"

  Scenario: Quiz question is displayed
    Given I visit the quiz page
    Then I see the first question

  Scenario: Quiz question is answered
    Given I visit the quiz page
    When I answer "Green"
    Then I should see the next button

  Scenario: Quiz question is answered and the next button is clicked
    Given I visit the quiz page
    When I answer "Green"
    And I click the next button
    Then I should see the next question

@skip
  Scenario: User can go back to previous question
    Given I visit the quiz page
    When I answer "Green"
    And I click the next button
    Then I should see the next question
    When I answer "Paris"
    Then I should see evaluate button


