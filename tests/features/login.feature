Feature: Login to the portal
    Scenario: Property market Portal - Domain.com
        Given I can successfully access the propery market portal using '<URL>'
        # When I can login using credentails '<username>' and '<password>'
        # Then I can successfully logout
        Examples:
            | URL                        | username           | password |
            | https://www.domain.com.au/ | mel@mailinator.com | Aa12345@ |