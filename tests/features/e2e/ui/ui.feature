Feature: UI Automation

  Scenario: Scenario A - Verify user can enter new data into the table and update user information
        Given Go to the url '<URL>'
        When Enter the data into table using detailsJSON values
        Then Validate the newly created record
        When Update the user record from webtable
        Then Validate the updated record
        Examples:
            | URL                 |
            | https://demoqa.com/ |

    Scenario: TC02- Scenario C - Verify broken image
        Given Go to the url '<URL>'
        When Naigate to the broken image section
        Then Validate the broken image
        Examples:
            | URL                 |
            | https://demoqa.com/ |

    Scenario: TC03- Scenario D - Verify user can submit the form
        Given Go to the url '<URL>'
        When Naigate to the practice form and submit with filled details
        Then Validate the entered data from popup
        Examples:
            | URL                 |
            | https://demoqa.com/ |

    Scenario: TC04- Scenario E - Verify the progress bar
        Given Go to the url '<URL>'
        When Naigate to the widget and start the progress bar
        Then Validate the progress bar
        Examples:
            | URL                 |
            | https://demoqa.com/ |

    Scenario: TC05- Scenario F - Verify the tooltip
        Given Go to the url '<URL>'
        When Navigate to the widget tooltip and hover the button
        Then Validate the tooltip
        Examples:
            | URL                 |
            | https://demoqa.com/ |

    Scenario: TC06- Scenario G - Verify user can drag and drop
        Given Go to the url '<URL>'
        When Navigate to the interactions droppable perform drag and drop
        Then Validate the drag and drop
        Examples:
            | URL                 |
            | https://demoqa.com/ |