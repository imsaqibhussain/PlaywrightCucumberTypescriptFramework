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

#    Scenario: TC03 - Verify user can submit the form
#         Given Go to the url '<URL>'
#         When Naigate to the practice form and submit with filled details
#         Then Validate the entered data from popup
#         Examples:
#             | URL                 |
#             | https://demoqa.com/ |

# ➔ Go to url https://demoqa.com/
# ➔ Navigate to Widget >> Progress Bar
# ➔ Click on start the progress bar
# ➔ Put your assertions

   Scenario: TC04 - Verify the progress bar
        Given Go to the url '<URL>'
        When Naigate to the widget and start the progress bar
        Then Validate the progress bar
        Examples:
            | URL                 |
            | https://demoqa.com/ |