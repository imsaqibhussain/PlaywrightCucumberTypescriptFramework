Feature: UI Automation

    # TC01- Scenario A - Verify user can enter new data into the table
    # ➔ Go to url https://demoqa.com/
    # ➔ Navigate to “Elements”
    # ➔ Click on “Web Tables”
    # ➔ Click on “Add” button
    # ➔ Enter below input fields and Hit submit
    # ◆ First Name: “Alden”
    # ◆ Last Name: “Cantrell”
    # ◆ Age: 30
    # ◆ Email: test@test.com
    # ◆ Salary: 12345
    # ◆ Department: QA
    # ➔ Put your assertions

    Scenario: Scenario A - Verify user can enter new data into the table
        Given Go to the url '<URL>'
        When Enter the data into table using these values '<firstname>' '<lastname>' '<age>' '<email>' '<salary>' '<department>' 
        Then Validate the newly created record
        Examples:
            | URL                 | firstname | lastname | age | email         | salary | department |
            | https://demoqa.com/ | Alden     | Cantrell | 30  | test@test.com | 12345  | QA         |