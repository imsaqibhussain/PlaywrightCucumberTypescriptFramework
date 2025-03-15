Feature: UI Automation

    Scenario: TC02- Scenario C - Verify broken image
        Given Go to the url '<URL>'
        When Naigate to the broken image section
        Then Validate the broken image
        Examples:
            | URL                 |
            | https://demoqa.com/ |