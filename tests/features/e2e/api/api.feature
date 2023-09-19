Feature: API Automation

    Scenario: Scenario A - Verify user can enter new data into the table
        Given create user using api call
        When Add a list of Book against the user
        Then Remove one of added Book 

    Scenario: Scenario B- Unhappy flow
        Given generate token with wrong credentials