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

    # Scenario: Scenario A - Verify user can enter new data into the table
    #     Given Go to the url '<URL>'
    #     When Enter the data into table using detailsJSON values
    #     Then Validate the newly created record
    #     Examples:
    #         | URL                 |
    #         | https://demoqa.com/ |


    # 2. TC01- Scenario B - Verify user can edit the row in a table
    # ➔ Click on edit icon in the second row of the table that contains firstname “Aldren”
    # ➔ Edit the First Name to “Gerimedica” and Last Name to “BV” and Hit save.
    # ➔ Put your assertions

    Scenario: TC01- Scenario B - Verify user can edit the row in a table
        Given Go to the url '<URL>'
        When Update the user record from webtable
        Then Validate the updated record
        Examples:
            | URL                 |
            | https://demoqa.com/ |