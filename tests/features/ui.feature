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

    # Scenario: TC02 - Verify broken image
    #     Given Go to the url '<URL>'
    #     When Naigate to the broken image section
    #     Then Validate the broken image
    #     Examples:
    #         | URL                 |
    #         | https://demoqa.com/ |

# TC03 - Verify user can submit the form.
# ➔ Go to url https://demoqa.com/
# ➔ Navigate to Forms>>Practice Form
# ➔ Enter all the input fields including picture and hit Submit
# ◆ First Name: Gerimedica
# ◆ Last Name : BV
# ◆ Email: test@test.com
# ◆ Gender : Male
# ◆ Mobile: 0123456789
# ◆ Date of Birth: 15th January 1990
# ◆ Subjects: Playwright Assignment
# ◆ Hobbies: Reading
# ◆ Select any picture
# ◆ Current Address: Netherlands
# ◆ State and City : NCR, Delhi
# ➔ Put your assertions

   Scenario: TC03 - Verify user can submit the form
        Given Go to the url '<URL>'
        When Naigate to the practice form and submit with filled details
        Then Validate the entered data from popup
        Examples:
            | URL                 |
            | https://demoqa.com/ |