Feature: UI Automation

    # Scenario: Scenario A - Verify user can enter new data into the table
    #     Given Go to the url '<URL>'
    #     When Enter the data into table using detailsJSON values
    #     Then Validate the newly created record
    #     Examples:
    #         | URL                 |
    #         | https://demoqa.com/ |

    # Scenario: TC01- Scenario B - Verify user can edit the row in a table
    #     Given Go to the url '<URL>'
    #     When Update the user record from webtable
    #     Then Validate the updated record
    #     Examples:
    #         | URL                 |
    #         | https://demoqa.com/ |


    # 3. TC02 - Verify broken image
    # ➔ Go to url https://demoqa.com/
    # ➔ Navigate to “Elements”>>“Broken Links-Images”
    # ➔ Put your assertions for the first broken image

    Scenario: TC02 - Verify broken image
        Given Go to the url '<URL>'
        When Naigate to the broken image section
        Then Validate the broken image
        Examples:
            | URL                 |
            | https://demoqa.com/ |
